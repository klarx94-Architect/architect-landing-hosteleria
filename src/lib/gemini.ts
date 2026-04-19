/**
 * src/lib/gemini.ts
 * Motor de IA de alto rendimiento mediante llamadas REST directas.
 * Protocolo: Latencia Cero y Persistencia (Modelo Gemini 2.5 Flash).
 */

export async function generateGeminiContent(prompt: string, jsonMode: boolean = false) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY no configurada.");

  // Modelo Gemini 1.5 Flash (Latest Stable)
  const model = "gemini-1.5-flash-latest"; 
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  // Implementación de Timeout de 8 segundos para evitar bloqueos en Vercel
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          response_mime_type: jsonMode ? "application/json" : "text/plain",
          temperature: 0.7,
          max_output_tokens: 1000,
        }
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(`Google AI Error: ${response.status} - ${JSON.stringify(errorBody)}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error("TIMEOUT");
    }
    throw error;
  }
}
