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
    
    // Extracción de datos según la estructura de Meta v19.0+
    const messageEntry = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    const metadata = body.entry?.[0]?.changes?.[0]?.value?.metadata;

    if (!messageEntry) {
      return NextResponse.json({ status: 'Ignored', reason: 'No message content' });
    }

    // 1. RESPUESTA INMEDIATA A META (Evita bloqueos y reintentos)
    const fastResponse = NextResponse.json({ status: 'ok' });

    // 2. PROCESAMIENTO ASÍNCRONO (Background Task)
    // No usamos await aquí para retornar fastResponse de inmediato.
    (async () => {
      const phone = messageEntry.from;
      const userMessage = messageEntry.text?.body;
      const phoneNumberId = metadata?.phone_number_id;

      if (!phone || !userMessage || !phoneNumberId) return;

      try {
        console.log(`[Webhook POST] Procesando mensaje de ${phone}: "${userMessage}"`);

        // Registro en Supabase (User) - Asumimos neutro/lead inicial para mantener consistencia
        await supabase.from('chats').insert([{ 
          phone, 
          role: 'user', 
          content: userMessage,
          intent: 'lead',
          sentiment: 'neutro'
        }]);

        // Generación de respuesta IA modular y estructurada
        const { text: aiResponse, intent, sentiment } = await generateBotResponse(phone, userMessage);

        // Registro en Supabase (Assistant) con Metadatos
        await supabase.from('chats').insert([{ 
          phone, 
          role: 'assistant', 
          content: aiResponse,
          intent: intent,
          sentiment: sentiment
        }]);

        // Envío vía Meta API
        await sendWhatsAppMessage(phoneNumberId, phone, aiResponse);

      } catch (innerError) {
        console.error('[Webhook Background Process Error]', innerError);
      }
    })();

    return fastResponse; 
  } catch (error: any) {
    console.error('[Webhook POST Error]', error);
    return NextResponse.json({ 
      error: 'Internal Error', 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined 
    }, { status: 500 });
  }
}
