/**
 * src/lib/bot-logic.ts
 * Lógica de negocio y personalidad del Bot (Gemini 1.5 Flash)
 * Protocolo: Anti-Monolito (Lógica fragmentada).
 */

import { model } from './gemini';

export async function generateBotResponse(phone: string, userMessage: string): Promise<string> {
  // Configuración de personalidad: Comercial de Hostelería Senior en Architect.Sys
  const systemInstruction = `
    Eres el Recepcionista Virtual IA de Architect.Sys para el sector hostelería. 
    Tu misión es doble: 
    1. Atender al cliente del restaurante (reservas, dudas de la carta).
    2. Si detectas que es un dueño de restaurante (hostelero), actuar como Comercial de Architect.Sys.
    
    Personalidad:
    - Autoritario pero servicial.
    - Estrategia comercial agresiva: Enfócate en el ROI y el ahorro de tiempo.
    - Empatía con el estrés del hostelero (teléfonos que no se cogen, comisiones de apps).
    
    Precios de Referencia:
    - Carta Interactiva: 250€ (Pago único).
    - Recepcionista 24/7 (tú): 650€ + 49€/mes mantenimiento de IA.
    
    Reglas de Oro:
    - Respuestas cortas, directas y potentes.
    - Orientado a la conversión (cerrar reserva o solicitar auditoría).
    - Usa emojis de forma profesional (🍽️, ✅, 💰).
  `;

  const prompt = `${systemInstruction}\n\nMensaje reciente del usuario (${phone}): "${userMessage}"\n\nRespuesta del Recepcionista:`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    
    return text || "¡Hola! He recibido tu mensaje. Estamos ajustando los fogones digitales. ¿En qué puedo ayudarte ahora mismo? 🍽️";
  } catch (error) {
    console.error('[Bot Logic] Error en generación IA:', error);
    return "Lo siento, mi conexión a la central está saturada. ¿Te atiendo por aquí en un momento? ✅";
  }
}
