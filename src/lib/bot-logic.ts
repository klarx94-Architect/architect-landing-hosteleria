/**
 * src/lib/bot-logic.ts
 * Lógica de negocio y personalidad del Bot (Gemini 1.5 Flash)
 * Protocolo: Anti-Monolito (Lógica fragmentada).
 */

import { model } from './gemini';

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
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json"
      }
    });
    const textRes = await result.response.text();
    
    let parsed;
    try {
      parsed = JSON.parse(textRes);
    } catch {
       return {
         text: "Entiendo. Estamos optimizando nuestros fogones digitales. ¿Podemos agendar una auditoría gratuita? 🚀",
         intent: "lead",
         sentiment: "neutro"
       };
    }
    
    return {
      text: parsed.response || "Hubo un error de procesamiento. Escríbenos de nuevo.",
      intent: parsed.intent || "lead",
      sentiment: parsed.sentiment || "neutro"
    };

  } catch (error) {
    console.error('[Bot Logic] Error en generación IA:', error);
    return {
      text: "La conexión a la central está bloqueada. ¿Te atiendo por aquí en un momento? ✅",
      intent: "lead",
      sentiment: "neutro"
    };
  }
}
