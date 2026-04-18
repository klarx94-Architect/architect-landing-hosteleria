import { NextResponse } from 'next/server';
import { generateGeminiContent } from '@/lib/gemini';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Verificamos presencia de llave (sin mostrarla)
    const key = process.env.GEMINI_API_KEY;
    const keyStatus = key ? `Presente (Largo: ${key.length}, Inicio: ${key.substring(0, 5)})` : 'AUSENTE';

    console.log('[Diagnostic] Iniciando prueba de Gemini...');
    const aiRes = await generateGeminiContent('Responde solo con la palabra: CONEXION_EXITOSA', false);

    return NextResponse.json({ 
      status: 'success', 
      gemini_response: aiRes,
      key_status: keyStatus
    });
  } catch (error: any) {
    return NextResponse.json({ 
      status: 'error', 
      error_message: error.message,
      key_present: !!process.env.GEMINI_API_KEY
    }, { status: 500 });
  }
}
