/**
 * src/lib/bot-logic.ts
 * Lógica de negocio y personalidad del Bot (Gemini 1.5 Flash)
 * Protocolo: Anti-Monolito (Lógica fragmentada).
 */

import { generateGeminiContent } from './gemini';
import { supabase } from './supabase';

export async function generateBotResponse(phone: string, userMessage: string): Promise<{ text: string, intent: string, sentiment: string }> {
  // 1. OBTENER HISTORIAL DE CONVERSACIÓN (MEMORIA PERSISTENTE)
  let historyContext = "";
  try {
    if (supabase) {
      const { data: chatHistory } = await supabase
        .from('chats')
        .select('role, content')
        .eq('phone', phone)
        .order('created_at', { ascending: false })
        .limit(10);

      if (chatHistory && chatHistory.length > 0) {
        // Invertimos para que el contexto sea cronológico
        historyContext = chatHistory.reverse().map(m => 
          `${m.role === 'user' ? 'Cliente' : 'Consultor Senior'}: ${m.content}`
        ).join('\n');
      }
    }
  } catch (err) {
    console.error('[Bot Logic] Error recuperando memoria:', err);
  }

  // 2. CONFIGURACIÓN DE PERSONALIDAD: CLOSER SENIOR DE ARCHITECT.SYS
  const systemInstruction = `
    Eres el Consultor Comercial Senior de Architect.Sys. Tu misión es CERRAR ventas de soluciones de rentabilidad para hostelería.
    
    RASGOS DE PERSONALIDAD:
    - Sofisticado, directo y profesional. No pides permiso ni perdón por ser directo.
    - Hablas de ROI, aumento de facturación y ahorro de fugas de dinero (Hemorragia de local).
    - Tratas a cada cliente de forma EXCLUSIVA basándote en lo que habéis hablado antes.

    HISTORIAL DE LA CONVERSACIÓN (Contexto Crítico):
    ${historyContext || "Nueva conversación. Primera toma de contacto comercial."}

    PRODUCTOS DE ALTO IMPACTO:
    - Carta Interactiva QR (250€): Instalación inmediata.
    - Recepcionista IA (650€ setup + 49€/mes): Tú mismo eres la prueba del valor. Cierras reservas 24/7.
    - Gestión Ads (400€/mes): Llenamos el local de clientes nuevos cada noche.

    ESTRUCTURA DE RESPUESTA (JSON PURO):
    {
      "response": "Tu respuesta persuasiva aquí.",
      "intent": "venta" | "lead" | "rechazo",
      "sentiment": "positivo" | "negativo" | "neutro",
      "topic": "Precio" | "Reserva" | "ROI" | "Duda Técnica" | "Otro",
      "closing_stage": "atencion" | "interes" | "deseo" | "accion",
      "strategic_note": "Breve nota de por qué tomaste esta decisión comercial."
    }

    REGLA DE CLOSER: Si el cliente duda, usa el "Bono de 50€ en Ads" para cerrar el compromiso hoy.
  `;

  const prompt = `${systemInstruction}\n\nNueva consulta del cliente (${phone}): "${userMessage}"\n\nRespuesta JSON:`;

  try {
    const textRes = await generateGeminiContent(prompt, true);
    
    let parsed;
    try {
      const cleanJson = textRes.replace(/```json|```/g, '').trim();
      parsed = JSON.parse(cleanJson);
    } catch {
       return {
         text: "Entiendo perfectamente. Estamos analizando cómo optimizar tu rentabilidad ahora mismo. ¿Te gustaría agendar una breve llamada de 5 min para ver el ROI exacto? 🚀",
         intent: "lead",
         sentiment: "positivo",
         topic: "ROI",
         closing_stage: "interes"
       };
    }
    
    return {
      text: parsed.response || "Estoy analizando tu consulta...",
      intent: parsed.intent || "lead",
      sentiment: parsed.sentiment || "neutro",
      topic: parsed.topic || "Otro",
      closing_stage: parsed.closing_stage || "atencion",
      strategic_note: parsed.strategic_note || ""
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
