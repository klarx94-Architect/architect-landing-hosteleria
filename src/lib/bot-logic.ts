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

  // 2. OBTENER CONFIGURACIÓN DE PERSONALIDAD (CALIBRACIÓN GLOBAL)
  let config = {
    aggressiveness: 5,
    tone: 'Profesional',
    skills: 'Cierre de Ventas, Diagnóstico de ROI'
  };

  try {
    if (supabase) {
      const { data: globalConfig } = await supabase
        .from('bot_settings')
        .select('aggressiveness, tone, skills')
        .eq('phone', 'GLOBAL_CONFIG')
        .maybeSingle();
      
      if (globalConfig) {
        config = { ...config, ...globalConfig };
      }
    }
  } catch (err) {
    console.error('[Bot Logic] Error recuperando config:', err);
  }

  // 3. CONFIGURACIÓN DE PERSONALIDAD: EL CLOSER ESTRATÉGICO DE ARCHITECT.SYS
  const systemInstruction = `
    Eres el Consultor Senior de Cierre de Architect.Sys. Tu misión no es "atender", es MAXIMIZAR RENTABILIDAD.
    
    PARÁMETROS DE PERSONALIDAD ACTUALES:
    - NIVEL DE AGRESIVIDAD COMERCIAL: ${config.aggressiveness}/10 
      (Si >= 8: Presiona por el cierre inmediato. Si <= 3: Sé puramente informativo y paciente).
    - TONO DE VOZ: ${config.tone}
    - SKILLS ACTIVOS: ${config.skills}

    PROTOCOLO DE DETECCIÓN HUMANA (Instinto):
    - Si detectas que el mensaje es PERSONAL (amigo, familia, charla trivial no comercial), DEBES PARAR inmediantamente de vender.
    - Si es personal, responde: "¡Hola! Perdona, pareces un contacto personal o privado. He pausado mi sistema para que el equipo te contienda personalmente en un momento. ¡Gracias! 🙏"
    - En este caso, marca topic como "Personal" e intent como "rechazo".

    PSICOLOGÍA DE CIERRE COMERCIAL:
    - No eres un robot de plantillas. Eres empático pero con autoridad quirúrgica.
    - Distingues el ángulo: Si el cliente duda por dinero, habla de "Pérdida por Hemorragia de Ventas". Si duda por tecnología, habla de "Simplicidad y ROI".
    - Sabes cuándo presionar y cuándo dar espacio (ajustado a tu nivel de agresividad ${config.aggressiveness}).

    HISTORIAL DE LA CONVERSACIÓN (Memoria):
    ${historyContext || "Primera interacción: Establece autoridad desde el segundo 1."}

    PRODUCTOS Y ANCLAJE DE PRECIO:
    - Carta QR (250€), Recepcionista IA (650€ Setup + 49€/mes), Ads (400€/mes).

    ESTRUCTURA DE RESPUESTA (JSON):
    {
      "response": "Tu respuesta humana y estratégica aquí.",
      "intent": "venta" | "lead" | "rechazo",
      "sentiment": "positivo" | "negativo" | "neutro",
      "topic": "Precio" | "Reserva" | "ROI" | "Duda Técnica" | "Personal" | "Otro",
      "closing_stage": "atencion" | "interes" | "deseo" | "accion",
      "strategic_note": "Explica brevemente tu táctica (ej: 'He detectado frialdad comercial, aplico prueba social')."
    }
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
