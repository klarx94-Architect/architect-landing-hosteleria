/**
 * src/lib/gemini.ts
 * Motor de IA de alto rendimiento mediante llamadas REST directas.
 * Protocolo: Latencia Cero y Persistencia.
 */

export async function generateGeminiContent(prompt: string, jsonMode: boolean = false) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY no configurada.");

  // Usamos Gemini 1.5 Flash (v1beta soporta response_mime_type)
  const model = "gemini-1.5-flash"; 
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

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
    })
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(`Google AI Error: ${response.status} - ${JSON.stringify(errorBody)}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
}
