import { NextResponse } from 'next/server';
import { generateGeminiContent } from '@/lib/gemini';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { mode, selectedUseCase, messages, leadContext } = body || {};

    if (!mode) return NextResponse.json({ status: 'error', message: 'missing mode' }, { status: 400 });

    // Build system instruction based on mode
    let systemInstruction = '';

    if (mode === 'CONSULTING') {
      systemInstruction = `Eres un consultor experto de Architect.Sys especializado en digitalización de restaurantes y agentes IA. Tu objetivo es hacer un diagnóstico práctico y captar interés para una demo privada. Haz preguntas concretas para obtener: tipo de negocio, tipo de menú, capacidad/pedidos diarios, ubicación/horarios, nombre y teléfono. Mantén un tono profesional y cercano, enfócate en recoger información y en explicar beneficios claros.`;
    } else if (mode === 'BOOKING_DEMO') {
      systemInstruction = `Eres un agente operativo de reservas/pedidos que simula en tiempo real la interacción con clientes. Usa la información disponible en leadContext y selectedUseCase para personalizar respuestas. Simula confirmaciones, peticiones de fecha/hora/nº de personas o detalles del pedido según el caso. Mantén respuestas prácticas y orientadas a la acción.`;
    } else if (mode === 'CLOSING') {
      systemInstruction = `Eres un agente comercial. Resume los beneficios concretos de implantar el sistema, usa datos realistas y propone una oferta comercial: precio habitual 1500–3000€, oferta 650€ + 120€/mes el primer año. Finaliza proponiendo agendar una llamada con enlace (puede ser placeholder). Mantén tono persuasivo y profesional.`;
    } else {
      systemInstruction = `Eres un asistente de Architect.Sys.`;
    }

    // Compose context: include last user/assistant messages for the model
    const historyText = Array.isArray(messages) ? messages.map((m: any) => `${m.role === 'user' ? 'Usuario' : 'Asistente'}: ${m.content}`).join('\n') : '';

    const leadText = leadContext ? `LeadContext:\n${JSON.stringify(leadContext)}` : '';
    const useCaseText = selectedUseCase ? `SelectedUseCase: ${selectedUseCase}` : '';

    const prompt = `${systemInstruction}\n${useCaseText}\n${leadText}\nConversación previa:\n${historyText}\n
Responder de forma clara y breve.`;

    const text = await generateGeminiContent(prompt, false);
    return NextResponse.json({ status: 'ok', text });
  } catch (err: any) {
    console.error('[demo/respond] error', err);
    return NextResponse.json({ status: 'error', message: String(err) }, { status: 500 });
  }
}
