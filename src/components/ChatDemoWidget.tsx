'use client';

import React, { useEffect, useState, useRef } from 'react';
import { supabaseClient } from '@/lib/supabase-client';

type Message = { from: 'bot'|'user', text: string };

export default function ChatDemoWidget({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [step, setStep] = useState<string>('welcome');
  const [choice, setChoice] = useState<string | null>(null);
  const [buffer, setBuffer] = useState<Record<string,string>>({});
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const sessionId = typeof window !== 'undefined' && (localStorage.getItem('architect_session_id') || (() => { const id = (crypto as any)?.randomUUID ? (crypto as any).randomUUID() : Math.random().toString(36).slice(2); localStorage.setItem('architect_session_id', id); return id; })());

  useEffect(() => {
    // initial welcome
    const welcome = 'Hola, soy el asistente de Architect.Sys. En 2 minutos te enseño cómo tu restaurante puede automatizar reservas y pedidos.';
    setMessages([ { from: 'bot', text: welcome } ]);
    // analytics: demo_start
    sendAnalytic('demo_start');
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const push = (m: Message) => setMessages(prev => [...prev, m]);

  const options = [
    { key: 'reservas', label: 'Reservas en restaurante' },
    { key: 'pedidos', label: 'Pedidos a domicilio' },
    { key: 'carta', label: 'Ver carta de bar' },
    { key: 'otro', label: 'Otro caso de uso' },
  ];

  const sendAnalytic = async (action: string, meta: any = {}) => {
    try {
      if (!supabaseClient) return;
      await supabaseClient.from('web_analytics').insert([{ session_id: sessionId, path: '/demo-widget', action, metadata: meta, timestamp: new Date().toISOString() }]);
    } catch (err) {
      console.warn('analytics failed', err);
    }
  };

  const handleChoice = async (key: string) => {
    setChoice(key);
    push({ from: 'user', text: options.find(o=>o.key===key)!.label });
    setLoading(true);
    sendAnalytic('demo_choice', { choice: key });

    // ask Gemini for a short explanation of the chosen flow
    try {
      const res = await fetch('/api/demo/respond', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ choice: key, session_id: sessionId }) });
      const json = await res.json();
      const text = json?.text || 'Así funcionaría: ...';
      push({ from: 'bot', text });
    } catch (err) {
      push({ from: 'bot', text: 'Así funcionaría en la vida real: el agente confirma fecha, hora y número de personas, y guarda la reserva en el CRM.' });
    }

    setLoading(false);
    // move to guided mini-sim
    setTimeout(() => setStep('mini'), 400);
  };

  const handleMiniSubmit = (answer: string) => {
    push({ from: 'user', text: answer });
  };

  const askNext = () => {
    if (choice === 'reservas') {
      if (!buffer['people']) { push({ from: 'bot', text: '¿Para cuántas personas?' }); setStep('ask_people'); return; }
      if (!buffer['date']) { push({ from: 'bot', text: '¿Qué día te gustaría?' }); setStep('ask_date'); return; }
      if (!buffer['time']) { push({ from: 'bot', text: '¿Hora aproximada?' }); setStep('ask_time'); return; }
      // finished mini-sim
      push({ from: 'bot', text: 'Perfecto — reserva simulada creada en el panel. ¿Quieres que te preparemos una demo privada para tu negocio?' });
      sendAnalytic('demo_complete', { type: 'reservas' });
      setStep('ask_demo');
    } else if (choice === 'pedidos') {
      if (!buffer['order']) { push({ from: 'bot', text: '¿Qué te gustaría pedir?' }); setStep('ask_order'); return; }
      if (!buffer['deliver_time']) { push({ from: 'bot', text: '¿Para qué hora?' }); setStep('ask_deliver_time'); return; }
      push({ from: 'bot', text: 'Perfecto — pedido simulado. ¿Quieres que te preparemos una demo privada para tu negocio?' });
      sendAnalytic('demo_complete', { type: 'pedidos' });
      setStep('ask_demo');
    } else if (choice === 'carta') {
      push({ from: 'bot', text: 'Mostrando categoría: Bebidas. Ítem: Cóctel de verano — 8€.' });
      setTimeout(() => { push({ from: 'bot', text: '¿Quieres que te preparemos una demo privada para tu negocio?' }); setStep('ask_demo'); }, 400);
      sendAnalytic('demo_complete', { type: 'carta' });
    } else {
      push({ from: 'bot', text: 'Entendido. Podemos adaptar la demo a tu caso. ¿Quieres que te preparemos una demo privada para tu negocio?' });
      setStep('ask_demo');
      sendAnalytic('demo_complete', { type: 'otro' });
    }
  };

  const handleSubmitInput = async () => {
    const val = input.trim();
    if (!val) return;
    setInput('');

    // route according to step
    if (step === 'ask_people') {
      setBuffer(b => ({ ...b, people: val }));
      handleMiniSubmit(val);
      setTimeout(askNext, 200);
      return;
    }
    if (step === 'ask_date') {
      setBuffer(b => ({ ...b, date: val }));
      handleMiniSubmit(val);
      setTimeout(askNext, 200);
      return;
    }
    if (step === 'ask_time') {
      setBuffer(b => ({ ...b, time: val }));
      handleMiniSubmit(val);
      setTimeout(askNext, 200);
      return;
    }
    if (step === 'ask_order') {
      setBuffer(b => ({ ...b, order: val }));
      handleMiniSubmit(val);
      setTimeout(askNext, 200);
      return;
    }
    if (step === 'ask_deliver_time') {
      setBuffer(b => ({ ...b, deliver_time: val }));
      handleMiniSubmit(val);
      setTimeout(askNext, 200);
      return;
    }

    if (step === 'ask_name') {
      setBuffer(b => ({ ...b, name: val }));
      handleMiniSubmit(val);
      setStep('ask_phone');
      push({ from: 'bot', text: 'Perfecto. ¿Número de teléfono (preferido para WhatsApp)?' });
      return;
    }

    if (step === 'ask_phone') {
      setBuffer(b => ({ ...b, phone: val }));
      handleMiniSubmit(val);
      setStep('ask_email');
      push({ from: 'bot', text: '¿Email? (opcional)' });
      return;
    }

    if (step === 'ask_email') {
      setBuffer(b => ({ ...b, email: val }));
      handleMiniSubmit(val);
      // now we have name+phone at least
      setTimeout(submitLead, 200);
      return;
    }

    // default: free text
    push({ from: 'user', text: val });
  };

  const submitLead = async () => {
    const name = buffer.name || '';
    const phone = buffer.phone || '';
    const email = buffer.email || '';
    const message = `Demo request: ${choice} — ${JSON.stringify(buffer)}`;

    if (!name || !phone) {
      push({ from: 'bot', text: 'Necesito al menos nombre y teléfono para registrar una demo privada.' });
      setStep('ask_name');
      return;
    }

    push({ from: 'bot', text: 'Enviando tus datos...' });
    setLoading(true);
    sendAnalytic('lead_submit_attempt', { choice, name: name.slice(0,20) });

    try {
      const res = await fetch('https://hosteleria.architectsys.com/api/leads/from-assistant', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email: email || '', message, session_id: sessionId })
      });
      const json = await res.json();
      if (json?.status === 'ok') {
        push({ from: 'bot', text: 'Listo, he registrado tu demo. En breve te contactaré por WhatsApp o email con una demo adaptada a tu negocio.' });
        sendAnalytic('lead_submit_success', { id: json?.id || null });
      } else {
        push({ from: 'bot', text: 'He tenido un problema técnico registrando tus datos, pero no los perderé; si no recibes noticias, puedes escribirnos desde el formulario de la web.' });
        sendAnalytic('lead_submit_partial', { response: json });
      }
    } catch (err) {
      push({ from: 'bot', text: 'He tenido un problema técnico registrando tus datos, pero no los perderé; si no recibes noticias, puedes escribirnos desde el formulario de la web.' });
      sendAnalytic('lead_submit_error', { error: String(err) });
    }

    setLoading(false);
    setStep('done');
  };

  const startDemoFlow = () => {
    // show options
    push({ from: 'bot', text: 'Elige una opción:' });
    setStep('choose');
  };

  const handleSelectUseCase = (useCase: string) => {
    setChoice(useCase);
    setStep('responses');
    const responses: Record<string, string> = {
      reservas: '👋 Hola, soy el agente de Architect.Sys. En menos de 2 minutos te enseño cómo automatizar reservas y pedidos de tu restaurante.',
      pedidos: '👋 Hola, soy el agente de Architect.Sys. En menos de 2 minutos te enseño cómo automatizar pedidos a domicilio.',
      carta: '👋 Aquí puedes ver la carta interactiva — selecciona categorías y te muestro precios y tiempos de preparación.',
      otro: '👋 Entendido. Podemos armar una demo personalizada para tu caso de uso específico.',
    };
    push({ from: 'bot', text: responses[useCase]! });
    sendAnalytic('demo_choice', { choice: useCase });
    setTimeout(() => setStep('mini'), 600);
  };

  return (
    <div className="fixed inset-0 z-60 flex items-end justify-end p-6 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="font-bold">Demo IA — Architect.Sys</div>
          <div className="flex items-center gap-2">
            <button onClick={() => { sendAnalytic('demo_closed'); onClose(); }} className="text-sm text-gray-500">Cerrar</button>
          </div>
        </div>

        {/* Welcome state with visible content */}
        {step === 'welcome' && (
          <div className="flex-1 flex flex-col px-4 py-3 overflow-y-auto space-y-3">
            <header className="px-1 pb-2 border-b border-black/5">
              <p className="font-semibold text-gray-900 text-sm">
                Demo en vivo Architect.Sys
              </p>
              <p className="text-xs text-gray-500 pt-1">
                Prueba en 2 minutos cómo tu agente de IA atiende reservas y pedidos.
              </p>
            </header>

            <main className="flex-1 space-y-3">
              <div className="rounded-lg bg-orange-50 px-3 py-2 text-xs text-gray-800">
                👋 Hola, soy el asistente de Architect.Sys. En menos de 2 minutos te enseño cómo automatizar reservas y pedidos.
              </div>

              <div>
                <p className="text-xs font-medium text-gray-600 mb-2">
                  ¿Qué quieres ver en la demo?
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleSelectUseCase('reservas')}
                    className="rounded-full bg-white px-3 py-1 text-xs border border-gray-200 hover:border-[#FF4500] hover:text-[#FF4500] transition-colors"
                  >
                    Reservas automáticas
                  </button>
                  <button
                    onClick={() => handleSelectUseCase('pedidos')}
                    className="rounded-full bg-white px-3 py-1 text-xs border border-gray-200 hover:border-[#FF4500] hover:text-[#FF4500] transition-colors"
                  >
                    Pedidos para llevar
                  </button>
                  <button
                    onClick={() => handleSelectUseCase('carta')}
                    className="rounded-full bg-white px-3 py-1 text-xs border border-gray-200 hover:border-[#FF4500] hover:text-[#FF4500] transition-colors"
                  >
                    Carta interactiva
                  </button>
                </div>
              </div>
            </main>

            <footer className="px-1 pt-2 border-t border-black/5">
              <button
                className="w-full rounded-lg bg-[#ff5400] text-white text-sm font-semibold py-2"
                onClick={() => handleSelectUseCase('reservas')}
              >
                Comenzar demo
              </button>
            </footer>
          </div>
        )}

        {/* Chat states */}
        <div ref={scrollRef as any} className="flex-1 p-4 h-80 overflow-y-auto space-y-3 bg-gray-50">
          {messages.map((m, i) => (
            <div key={i} className={`p-2 rounded-lg ${m.from === 'bot' ? 'bg-white self-start' : 'bg-[#DCF8C6] self-end'}`}>
              {m.text}
            </div>
          ))}

          {(step === 'choose' || step.startsWith('ask_') || step === 'ask_demo') && (
            <div className="space-y-2">
              {step === 'choose' && options.map(o => (
                <button key={o.key} onClick={() => handleChoice(o.key)} className="text-left bg-white py-2 px-3 rounded-lg border text-sm">{o.label}</button>
              ))}
            </div>
          )}
        </div>

        <div className="p-3 border-t bg-white">
          {(step.startsWith('ask_') || step === 'ask_name' || step === 'ask_phone' || step === 'ask_email') && (
            <div className="flex gap-2">
              <input value={input} onChange={e => setInput(e.target.value)} className="flex-1 border rounded-lg px-3 py-2" placeholder="Escribe tu respuesta..." />
              <button onClick={handleSubmitInput} className="bg-[#FF4500] text-white px-4 py-2 rounded-lg">{loading ? '...' : 'Enviar'}</button>
            </div>
          )}

          {step === 'done' && (
            <div className="text-sm text-gray-500 text-center py-2">
              Gracias. Puedes cerrar esta ventana.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
