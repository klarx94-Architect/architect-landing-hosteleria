import { NextResponse } from 'next/server';
import { generateBotResponse } from '@/lib/bot-logic';

export const dynamic = 'force-dynamic';

export async function GET() {
  const diagnostics: any = {
    timestamp: new Date().toISOString(),
    env: {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'PRESENT' : 'MISSING',
      SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY ? 'PRESENT' : 'MISSING',
      GEMINI_API_KEY: process.env.GEMINI_API_KEY ? 'PRESENT' : 'MISSING',
    },
    full_logic_test: 'PENDING',
    error_details: null
  };

  try {
    const testPhone = 'DIAGNOSTIC_TEST';
    const testMessage = 'Hola, ¿qué servicios ofreces?';
    
    const res = await generateBotResponse(testPhone, testMessage);
    
    diagnostics.full_logic_test = 'SUCCESS';
    diagnostics.bot_output = res;
  } catch (error: any) {
    diagnostics.full_logic_test = 'FAILED';
    diagnostics.error_details = {
      message: error.message,
      stack: error.stack,
      raw: error
    };
  }

  return NextResponse.json(diagnostics);
}
