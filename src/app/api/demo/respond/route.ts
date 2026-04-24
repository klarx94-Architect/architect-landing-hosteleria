import { NextResponse } from 'next/server';
import { generateGeminiContent } from '@/lib/gemini';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { choice, session_id } = body || {};
    if (!choice) return NextResponse.json({ status: 'error', message: 'missing choice' }, { status: 400 });

    const systemInstruction = `
      Eres el Asistente de demo de Architect.Sys para hostelería. Responde de forma breve (1-2 frases) explicando cómo funcionaría el flujo elegido en la vida real.
      Opciones: reservas, pedidos, carta, otro. Mantén tono profesional y cercano. No pidas datos personales en esta respuesta.
    `;

    const prompt = `${systemInstruction}\nFlujo elegido: ${choice}`;

    const text = await generateGeminiContent(prompt, false);
    return NextResponse.json({ status: 'ok', text });
  } catch (err: any) {
    console.error('[demo/respond] error', err);
    return NextResponse.json({ status: 'error', message: String(err) }, { status: 500 });
  }
}
