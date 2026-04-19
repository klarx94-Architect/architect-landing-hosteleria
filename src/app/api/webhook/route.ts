import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { generateBotResponse } from '@/lib/bot-logic'; 
import { sendWhatsAppMessage } from '@/lib/meta-api';

/**
 * src/app/api/webhook/route.ts
 * Orquestador de Webhook de Meta Cloud API
 * Protocolo: Anti-Monolito y Eficiencia (Respuesta Inmediata).
 */

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('[Webhook GET] Verificación exitosa.');
    return new Response(challenge, { status: 200 });
  }

  console.warn('[Webhook GET] Fallo en verificación.');
  return new Response('Forbidden', { status: 403 });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Extracción híbrida: Soporta entrada directa de Meta y reenvío desde Make
    const messageEntry = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0] || body.messages?.[0] || body;
    const metadata = body.entry?.[0]?.changes?.[0]?.value?.metadata || body.metadata;

    if (!messageEntry || (!messageEntry.text && !messageEntry.body && !messageEntry.content)) {
      return NextResponse.json({ status: 'Ignored', reason: 'No message content' });
    }

    // 1. RESPUESTA INMEDIATA A META (Evita bloqueos y reintentos)
    const fastResponse = NextResponse.json({ status: 'ok' });

    // 2. PROCESAMIENTO
    const phone = messageEntry.from || messageEntry.sender || messageEntry.phone;
    const userMessage = messageEntry.text?.body || messageEntry.body || messageEntry.content;
    const phoneNumberId = metadata?.phone_number_id || process.env.WHATSAPP_PHONE_NUMBER_ID;

    if (!phone || !userMessage || !phoneNumberId) {
      return NextResponse.json({ status: 'Ignored', reason: 'Missing data fields' });
    }

    try {
      if (!supabase) throw new Error("Cliente Supabase (Server) no inicializado. Revisa SUPABASE_SERVICE_KEY.");

      // Registro en Supabase (User)
      const { error: userError } = await supabase.from('chats').insert([{ 
        phone, 
        role: 'user', 
        content: userMessage,
        intent: 'lead',
        sentiment: 'neutro'
      }]);

      if (userError) throw new Error(`Error en Insert (User): ${userError.message}`);

      // Generación de respuesta IA
      const { text: aiResponse, intent, sentiment } = await generateBotResponse(phone, userMessage);

      // Registro en Supabase (Assistant)
      const { error: aiError } = await supabase.from('chats').insert([{ 
        phone, 
        role: 'assistant', 
        content: aiResponse,
        intent: intent,
        sentiment: sentiment
      }]);

      if (aiError) throw new Error(`Error en Insert (Assistant): ${aiError.message}`);

      // Envío vía Meta API
      await sendWhatsAppMessage(phoneNumberId, phone, aiResponse);

      return NextResponse.json({ status: 'ok', detail: 'Procesado con éxito' });

    } catch (innerError: any) {
      console.error('[Webhook Process Error]', innerError);
      return NextResponse.json({ 
        error: 'Process Error', 
        message: innerError.message,
        details: innerError
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error('[Webhook POST Error]', error);
    return NextResponse.json({ 
      error: 'Internal Error', 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined 
    }, { status: 500 });
  }
}
