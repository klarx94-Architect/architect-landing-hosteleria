/**
 * src/lib/bot-logic.ts
 * Lógica de negocio y personalidad del Bot (Gemini 1.5 Flash)
 * Protocolo: Anti-Monolito (Lógica fragmentada).
 */

import { generateGeminiContent } from './gemini';

export async function generateBotResponse(phone: string, userMessage: string): Promise<{ text: string, intent: string, sentiment: string }> {
  // Configuración de personalidad: Director Comercial Senior IA de Architect.Sys
  const systemInstruction = `
    Eres el Director Comercial Senior de Architect.Sys. Eres un experto en rentabilidad hostelera y tecnología B2B. No eres un simple asistente.
    
    Tu misión es doble:
    1. Atender dudas operativas brevemente si el que escribe es un cliente final.
    2. Si detectas que es un hostelero/propietario, aplicar persuasión comercial basada en el ROI.

    Precios Oficiales:
    - Carta Interactiva QR: 250€ (Pago único).
    - Ecosistema IA (Tú mismo): 650€ (Setup) + 49€/mes mantenimiento.
    - Gestión Ads: 400€/mes.

    Oferta Gancho ("Bono Salvavidas"):
    - Si el cliente muestra genuino interés pero tiene fricción por el precio o duda del retorno, TIENES AUTORIDAD para ofrecer un "Bono de 50€ en Ads" para su primera campaña de Meta, asumiéndolo nosotros para garantizar su ROI inmediato.

    Estructura OBLIGATORIA de tu respuesta:
    Debes responder ÚNICAMENTE con un objeto JSON válido. No uses markdown de código (\`\`\`).
    {
      "response": "Tu respuesta persuasiva o de atención en texto aquí.",
      "intent": "venta" | "lead" | "rechazo",
      "sentiment": "positivo" | "negativo" | "neutro"
    }

    Criterio de 'intent':
    - "venta": Muestra intención de contratar, pregunta por métodos de pago o pasos a seguir.
    - "lead": Hace preguntas exploratorias, duda, le parece interesante pero no cierra.
    - "rechazo": No está de acuerdo, quejas, falta de interés total o spam.
  `;

  const prompt = `${systemInstruction}\n\nMensaje del usuario (${phone}): "${userMessage}"\n\nRespuesta JSON:`;

  try {
    const textRes = await generateGeminiContent(prompt, true);
    
    let parsed;
    try {
      // Limpieza de posibles artefactos de markdown que Gemini a veces añade por error
      const cleanJson = textRes.replace(/```json|```/g, '').trim();
      parsed = JSON.parse(cleanJson);
    } catch {
       console.error('[Bot Logic] JSON Parse Error. Raw:', textRes);
       return {
         text: "Entiendo perfectamente. Estamos analizando cómo optimizar tu rentabilidad ahora mismo. ¿Te gustaría agendar una breve llamada de 5 min para ver el ROI exacto? 🚀",
         intent: "lead",
         sentiment: "positivo"
       };
    }
    
    return {
      text: parsed.response || "Hola. Estoy analizando tu consulta para darte la mejor solución técnica. Dame un momento o dime si prefieres que te llame un consultor. ✅",
      intent: parsed.intent || "lead",
      sentiment: parsed.sentiment || "neutro"
    };

  } catch (error) {
    console.error('[Bot Logic] Error en generación IA:', error);
    return {
      text: "Hola. Estamos recibiendo muchas consultas en este momento. Por favor, deja tu duda aquí y te responderé personalmente en unos minutos. ¡Gracias por tu paciencia! 🙏",
      intent: "lead",
      sentiment: "neutro"
    };
  }
}
