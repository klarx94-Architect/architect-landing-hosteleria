/**
 * src/lib/meta-api.ts
 * Comunicación modular con Meta Cloud API
 * Protocolo: Encapsulación de I/O externo.
 */

export async function sendWhatsAppMessage(phoneNumberId: string, to: string, text: string) {
  const token = process.env.WHATSAPP_TOKEN;
  const url = `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`;

  if (!token) {
    console.error('[Meta API] Error: WHATSAPP_TOKEN no configurado.');
    return;
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: to,
        type: 'text',
        text: { body: text },
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('[Meta API] Error en respuesta:', data);
      throw new Error(`Meta API error: ${response.status}`);
    }

    console.log('[Meta API] Mensaje enviado con éxito a:', to);
    return data;
  } catch (error) {
    console.error('[Meta API] Excepción al enviar mensaje:', error);
    throw error;
  }
}
