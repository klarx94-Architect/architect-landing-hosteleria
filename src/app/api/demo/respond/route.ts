import { NextResponse } from 'next/server';
import { generateGeminiContent } from '@/lib/gemini';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { mode, messages, leadContext } = body || {};

    if (!mode) return NextResponse.json({ status: 'error', message: 'missing mode' }, { status: 400 });

    // Build system instruction based on mode with Arqui persona
    let systemInstruction = `Eres Arqui, el asistente de Architect.Sys. Eres empático, útil y experto en hostelería. Tu propósito depende del modo:`;
    if (mode === 'CONSULTING') {
      systemInstruction += `\nMODO CONSULTING: Recopila datos básicos del negocio con preguntas claras y breves. Prioriza: nombre del contacto, nombre del negocio, tipo de negocio (restaurante, bar, delivery, hotel, dark_kitchen, otro), ubicación, modelo de servicio (solo_reservas, solo_delivery, mixto), capacidad aproximada y canales (web/social/whatsapp/deliveryApps). No ofrezcas la demo hasta tener los datos básicos; cuando los tengas, sugiere una demo personalizada. Mantén tono cercano, no repitas frases genéricas.`;
    } else if (mode === 'BOOKING_DEMO') {
      systemInstruction += `\nMODO BOOKING_DEMO: Actúa como agente operativo que simula una interacción real (reserva o pedido). Usa la información en leadContext para personalizar. Simula preguntas de confirmación, solicita fecha/hora/nº de personas o detalles del pedido, y realiza confirmaciones claras.`;
    } else if (mode === 'CLOSING') {
      systemInstruction += `\nMODO CLOSING: Actúa como agente comercial. Resume beneficios concretos, muestra la oferta especial: 650€ + 120€/mes. Invita a agendar una llamada con un enlace placeholder. Cierra la conversación con un CTA claro.`;
    }

    // Build conversation history for the prompt
    const historyText = Array.isArray(messages) ? messages.map((m: any) => `${m.role === 'user' ? 'Usuario' : 'Asistente'}: ${m.content}`).join('\n') : '';
    const leadText = leadContext ? `LeadContext: ${JSON.stringify(leadContext)}` : '';

    // Ask the model to respond in plain text. Also ask (optionally) to append a JSON object with detected leadContext when available.
    const prompt = `${systemInstruction}\n\n${leadText}\n\nConversación previa:\n${historyText}\n\nResponde como asistente. Si puedes extraer datos estructurados sobre el lead (leadName, businessName, businessType, location, serviceModel, capacity, channels), al final incluye un JSON válido con clave \"leadContext\" con los campos encontrados. Ejemplo al final de la respuesta:\n\n{ "leadContext": { ... } }\n\nDe lo contrario, devuelve solo texto natural. Sé breve y directo.`;

    const text = await generateGeminiContent(prompt, false);

    // Try to extract JSON leadContext from the model output
    let parsedLeadContext: any = undefined;
    try {
      const jsonStart = text.indexOf('{');
      if (jsonStart !== -1) {
        const possible = text.slice(jsonStart);
        // Try to find the last closing brace that balances
        let depth = 0;
        let endIdx = -1;
        for (let i = 0; i < possible.length; i++) {
          if (possible[i] === '{') depth++;
          else if (possible[i] === '}') {
            depth--;
            if (depth === 0) { endIdx = i; break; }
          }
        }
        if (endIdx !== -1) {
          const jsonStr = possible.slice(0, endIdx + 1);
          const maybe = JSON.parse(jsonStr);
          if (maybe && typeof maybe === 'object' && maybe.leadContext) {
            parsedLeadContext = maybe.leadContext;
          } else if (maybe && typeof maybe === 'object' && (maybe.leadName || maybe.businessName || maybe.businessType)) {
            // model might return directly the object
            parsedLeadContext = maybe;
          }
        }
      }
    } catch (err) {
      // ignore parse errors
      parsedLeadContext = undefined;
    }

    const response: any = { status: 'ok', text };
    if (parsedLeadContext) response.leadContext = parsedLeadContext;

    return NextResponse.json(response);
  } catch (err: any) {
    console.error('[demo/respond] error', err);
    return NextResponse.json({ status: 'error', message: String(err) }, { status: 500 });
  }
}
