import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { model } from '@/lib/gemini';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // YCloud or generic incoming format extraction
    const entry = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0] || body;
    const phone = entry.from || body.phone;
    const userMessage = entry.text?.body || body.message;

    if (!phone || !userMessage) return NextResponse.json({ status: 'Ignored' });

    // 1. Save user message to Supabase
    await supabase.from('chats').insert([{ phone, role: 'user', content: userMessage }]);

    // 2. Fetch history
    const { data: history } = await supabase
      .from('chats')
      .select('*')
      .eq('phone', phone)
      .order('created_at', { ascending: true })
      .limit(10);

    let chatContext = "Eres el Director Comercial de Architect.Sys, una agencia que vende webs interactivas (150€), sistemas de IA para WhatsApp (350€) y Meta Ads (400€/mes) a restaurantes. Sé directo, persuasivo y amigable.\n\nHistorial:\n";
    if (history) {
      history.forEach(msg => { chatContext += `${msg.role}: ${msg.content}\n`; });
    }
    chatContext += `user: ${userMessage}\nassistant:`;

    // 3. Generate AI Response
    const result = await model.generateContent(chatContext);
    const aiResponse = result.response.text();

    // 4. Save AI response to DB
    await supabase.from('chats').insert([{ phone, role: 'assistant', content: aiResponse }]);

    // 5. TODO: Trigger outgoing API call to YCloud to send the message back to WhatsApp
    console.log("To send to WhatsApp:", aiResponse);

    return NextResponse.json({ success: true, reply: aiResponse });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
