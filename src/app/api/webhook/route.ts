import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { model } from '@/lib/gemini';

// ─── META CLOUD API: GET VERIFICATION HANDSHAKE ──────────────────────────────
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const mode      = searchParams.get('hub.mode');
  const token     = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    // Return the challenge as plain text — Meta requires this exact format
    return new Response(challenge ?? '', { status: 200 });
  }

  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

// ─── META CLOUD API: POST MESSAGE HANDLER ────────────────────────────────────
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Ignore non-message events (status updates, etc.)
    const messageEntry = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    if (!messageEntry) return NextResponse.json({ status: 'Ignored' });

    const phone         = messageEntry.from;                     // Sender's number
    const userMessage   = messageEntry.text?.body;               // Text content
    const phoneNumberId = body.entry?.[0]?.changes?.[0]?.value?.metadata?.phone_number_id;

    if (!phone || !userMessage || !phoneNumberId) {
      return NextResponse.json({ status: 'Ignored' });
    }

    // 1. Persist incoming message
    await supabase.from('chats').insert([{ phone, role: 'user', content: userMessage }]);

    // 2. Fetch conversation history (last 10 turns)
    const { data: history } = await supabase
      .from('chats')
      .select('*')
      .eq('phone', phone)
      .order('created_at', { ascending: true })
      .limit(10);

    // 3. Build prompt for Gemini
    let chatContext = `Eres el Director Comercial de Architect.Sys, una agencia española que vende:
- Carta Digital interactiva con QR: 150€ (pago único)
- Recepcionista IA 24/7 en WhatsApp + Motor de Reservas: 350€
- Motor de Tráfico (Meta Ads + Influencers): 400€/mes
Tu objetivo es agendar una auditoría gratuita o cerrar la venta. Sé directo, empático y usa lenguaje de hostelero, no de informático.

Historial de conversación:\n`;
    history?.forEach(msg => { chatContext += `${msg.role}: ${msg.content}\n`; });
    chatContext += `user: ${userMessage}\nassistant:`;

    // 4. Generate reply with Gemini
    const result    = await model.generateContent(chatContext);
    const aiResponse = result.response.text().trim();

    // 5. Persist AI reply
    await supabase.from('chats').insert([{ phone, role: 'assistant', content: aiResponse }]);

    // 6. Send reply back via Meta Cloud API
    const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
    if (WHATSAPP_TOKEN && phoneNumberId) {
      await fetch(`https://graph.facebook.com/v19.0/${phoneNumberId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: phone,
          type: 'text',
          text: { body: aiResponse },
        }),
      });
    }

    // Meta requires a 200 OK acknowledgement
    return NextResponse.json({ status: 'ok' }, { status: 200 });

  } catch (error) {
    console.error('[Webhook Error]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
