/**
 * src/lib/gemini.ts
 * Motor de IA de alto rendimiento mediante llamadas REST directas.
 * Protocolo: Latencia Cero y Persistencia.
 */

export async function generateGeminiContent(prompt: string, jsonMode: boolean = false) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY no configurada.");

  // Usamos Gemini 2.0 Flash para máxima velocidad y razonamiento comercial
  const model = "gemini-2.5-flash"; 
  const url = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: jsonMode ? "application/json" : "text/plain",
        temperature: 0.7,
        maxOutputTokens: 1000,
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
