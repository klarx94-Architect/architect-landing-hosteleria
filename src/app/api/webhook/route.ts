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

      // 2. VERIFICAR SI EL BOT ESTÁ ACTIVADO PARA ESTE NÚMERO
      const { data: settings } = await supabase
        .from('bot_settings')
        .select('enabled')
        .eq('phone', phone)
        .maybeSingle();

      const isBotEnabled = settings?.enabled !== false; // Por defecto encendido

      if (!isBotEnabled) {
        console.log(`[Webhook] Bot pausado para: ${phone}. Registro completo sin respuesta IA.`);
        return NextResponse.json({ status: 'ok', detail: 'Bot Paused for this contact' });
      }

      // 3. GENERAR RESPUESTA IA
      const { text: aiResponse, intent, sentiment, topic, closing_stage, strategic_note } = await generateBotResponse(phone, userMessage);

      // 4. AUTO-PAUSA DE CRÉDITOS PARA CONTACTOS PERSONALES
      if (topic === 'Personal') {
        console.log(`[Webhook] Detección Humana: Contacto PERSONAL identificado (${phone}). Desactivando bot para ahorrar créditos.`);
        await supabase.from('bot_settings').upsert({ 
          phone, 
          enabled: false,
          updated_at: new Date().toISOString()
        });
      }

      // Registro en Supabase (Assistant)
      const { error: aiError } = await supabase.from('chats').insert([{ 
        phone, 
        role: 'assistant', 
        content: aiResponse,
        intent: intent,
        sentiment: sentiment,
        topic: topic,
        closing_stage: closing_stage,
        strategic_note: strategic_note
      }]);

      if (aiError) console.error(`[Webhook] Error en Insert (Assistant):`, aiError.message);

      // Envío vía Meta API
      if (topic !== 'Personal' && intent !== 'rechazo') {
        await sendWhatsAppMessage(phoneNumberId, phone, aiResponse);
      } else {
        console.log(`[Webhook] Respuesta omitida para contacto personal/rechazo.`);
      }

      return NextResponse.json({ status: 'ok', detail: 'Procesado con éxito', topic });

    } catch (innerError: any) {
      console.error('[Webhook Process Error - Resilient Redirect]', innerError);
      // RETORNAMOS 200 PARA EVITAR QUE MAKE SE DETENGA
      return NextResponse.json({ 
        status: 'error_controlled', 
        message: innerError.message
      }, { status: 200 });
    }
  } catch (error: any) {
    console.error('[Webhook POST Error - Critical Resilience]', error);
    return NextResponse.json({ 
      status: 'error_critical', 
      message: error.message
    }, { status: 200 });
  }
}
