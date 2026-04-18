import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { generateGeminiContent } from './src/lib/gemini.js';

async function test() {
  console.log('--- DIAGNÓSTICO INTERNO: MOTOR GEMINI 2.5 ---');
  try {
    const res = await generateGeminiContent('Responde solo OK', false);
    console.log('RESULTADO:', res);
  } catch (e: any) {
    console.log('ERROR DETECTADO:', e.message);
  }
}

test();
