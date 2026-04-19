import { NextResponse } from 'next/server';
import { generateGeminiContent } from '@/lib/gemini';

export const dynamic = 'force-dynamic';

export async function GET() {
  const diagnostics = {
    timestamp: new Date().toISOString(),
    env: {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'PRESENT' : 'MISSING',
      SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY ? 'PRESENT' : 'MISSING',
      GEMINI_API_KEY: process.env.GEMINI_API_KEY ? 'PRESENT' : 'MISSING',
      WHATSAPP_TOKEN: process.env.WHATSAPP_TOKEN ? 'PRESENT' : 'MISSING',
    },
    gemini_test: 'PENDING'
  };

  try {
    const testPrompt = "Responde 'OK' si recibes este mensaje.";
    const res = await generateGeminiContent(testPrompt);
    diagnostics.gemini_test = res.includes('OK') ? 'SUCCESS' : 'UNEXPECTED_RESPONSE';
  } catch (error: any) {
    diagnostics.gemini_test = `FAILED: ${error.message}`;
  }

  return NextResponse.json(diagnostics);
}
