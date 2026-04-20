import { NextResponse } from 'next/server';
import { generateBotResponse } from '@/lib/bot-logic';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const testMessage = searchParams.get('message') || 'Hola, ¿qué servicios ofreces?';
  const testPhone = searchParams.get('phone') || 'DIAGNOSTIC_TEST';

  const diagnostics: any = {
    timestamp: new Date().toISOString(),
    audit_params: { phone: testPhone, message: testMessage },
    env: {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'PRESENT' : 'MISSING',
      SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY ? 'PRESENT' : 'MISSING',
      GEMINI_API_KEY: process.env.GEMINI_API_KEY ? 'PRESENT' : 'MISSING',
    },
    full_logic_test: 'PENDING',
    error_details: null
  };

  try {
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
