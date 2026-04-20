/**
 * src/lib/bot-logic.ts
 * Lógica de negocio y personalidad del Bot (Gemini 1.5 Flash)
 * Protocolo: Anti-Monolito (Lógica fragmentada).
 */

import { generateGeminiContent } from './gemini';
import { supabase } from './supabase';

export async function generateBotResponse(phone: string, userMessage: string): Promise<{ 
  text: string, 
  intent: string, 
  sentiment: string,
  topic?: string,
  closing_stage?: string,
  strategic_note?: string,
  raw_ai_text?: string
}> {
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
    ESTÁS EN MODO: CONSULTOR DE CIERRE DE ALTO RENDIMIENTO (INSTINTO COMERCIAL).
    
    REGLA DE ORO #1 (SMOOTHING & MIRRORING): 
    No uses plantillas. Adapta tu tono EXACTAMENTE al del cliente. 
    - Si el cliente es breve, sé breve.
    - Si el cliente es informal, sé informal pero profesional.
    - PROHIBIDO empezar siempre con "¡Excelente pregunta!" o presentaciones largas robóticas.
    
    REGLA DE ORO #2 (ESCALADO DE TENSIÓN AGRESIVA):
    Tu agresividad es ${config.aggressiveness}/10. 
    - Inicio (Suave): Sé empático, genera confianza y diagnostica el problema.
    - Nudo (Tensión): Si detectas interés, muestra cómo están perdiendo dinero cada día que no usan la IA (Hemorragia de Ventas).
    - Cierre (Agresivo): Si la agresividad es alta, presiona por agendar una llamada o cierre inmediato.

    REGLA DE ORO #3 (EL PUENTE HUMANO - HAND-OFF):
    Eres el filtro experto, pero no eres el dueño del negocio.
    - Si el cliente pide DESCUENTOS, NEGOCIA PRECIOS o tiene dudas técnicas de extrema complejidad, di:
      "Es un punto muy válido. Precisamente ese tipo de detalles técnicos/comerciales los maneja mi Director de Operaciones personalmente. Le he pasado nota de tu consulta para que él mismo te desatasque esto en un momento. ¿Te parece bien?"
    - Esto te hace parecer exclusivo y profesional, no desesperado.

    PROTOCOLO DE DETECCIÓN HUMANA:
    - Si detectas que es un mensaje PERSONAL (chala trivial, amigos), sal de modo ventas inmediatamente.
    - Responde: "¡Ey! Perdona, te he respondido como bot de empresa. Pillo a los chicos para que te hablen ellos mismos ahora. ¡Hablamos pronto!"
    - Topic: "Personal", Intent: "rechazo".

    PSICOLOGÍA DE ARCHITECT.SYS:
    - Productos: Carta QR (250€), Recepcionista IA (650€ Setup + 49€/mes), Ads (400€/mes).
    - No vendas productos, vende SOLUCIONES a la falta de tiempo y dinero.

    ESTRUCTURA OBLIGATORIA (JSON):
    {
      "response": "Respuesta natural, fluida y sin rastro de robot.",
      "intent": "venta" | "lead" | "rechazo",
      "sentiment": "positivo" | "negativo" | "neutro",
      "topic": "Precio" | "Reserva" | "ROI" | "Duda Técnica" | "Personal" | "Otro",
      "closing_stage": "atencion" | "interes" | "deseo" | "accion",
      "strategic_note": "Explica tu táctica psicológica para esta respuesta específica."
    }
  `;

  const prompt = `${systemInstruction}\n\nNueva consulta del cliente (${phone}): "${userMessage}"`;

  try {
    const textRes = await generateGeminiContent(prompt, true);
    
    let parsed;
    try {
      // EXTRACTOR UNIVERSAL DE JSON (Regex Robusto)
      const jsonMatch = textRes.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No JSON found in response");
      
      parsed = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
       console.error('[Bot Logic] Fallo en el parseo JSON. RAW:', textRes);
       return {
         text: "Entiendo perfectamente. Estamos analizando cómo optimizar tu rentabilidad ahora mismo. ¿Te gustaría agendar una breve llamada de 5 min para ver el ROI exacto? 🚀",
         intent: "lead",
         sentiment: "positivo",
         topic: "ROI",
         closing_stage: "interes",
         raw_ai_text: textRes
       };
    }
    
    return {
      text: parsed.response || "Estoy analizando tu consulta...",
      intent: parsed.intent || "lead",
      sentiment: parsed.sentiment || "neutro",
      topic: parsed.topic || "Otro",
      closing_stage: parsed.closing_stage || "atencion",
      strategic_note: parsed.strategic_note || "",
      raw_ai_text: textRes // Añadimos esto para debug
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
