"use client";

import React, { useEffect, useState } from 'react';

type Props = { onClose: () => void };

type ChatMode = 'CONSULTING' | 'BOOKING_DEMO' | 'CLOSING';

const options = [
  { key: 'reservas', label: 'Reservas en restaurante' },
  { key: 'pedidos', label: 'Pedidos a domicilio' },
  { key: 'carta', label: 'Ver carta de bar' },
  { key: 'otro', label: 'Otro caso de uso' },
];

export default function ChatDemoWidget({ onClose }: Props) {
  const [mode, setMode] = useState<ChatMode>('CONSULTING');
  const [selectedUseCase, setSelectedUseCase] = useState<'reservas' | 'pedidos' | 'carta' | 'otro' | null>(null);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const welcomeText = 'Hola, soy el asistente de Architect.Sys. En 2 minutos te enseño cómo tu restaurante puede automatizar reservas y pedidos.';

  useEffect(() => {
    // Initialize with assistant welcome in consulting mode
    setMessages([{ role: 'assistant', content: welcomeText }]);
  }, []);

  const pushMessage = (m: { role: 'user' | 'assistant'; content: string }) => setMessages(prev => [...prev, m]);

  const handleSelectUseCase = (key: 'reservas' | 'pedidos' | 'carta' | 'otro') => {
    setSelectedUseCase(key);
    // Acknowledge interest without switching to demo
    pushMessage({ role: 'assistant', content: `Interesante, tomo nota de que quieres ver: ${options.find(o => o.key === key)?.label || key}.` });
  };

  const leadContext = {
    selectedUseCase: selectedUseCase || null,
    // For now we forward raw conversation as context; Gemini will ask and fill details.
    raw: messages.map(m => `${m.role === 'user' ? 'user' : 'assistant'}: ${m.content}`).join('\n'),
  };

  const callApi = async (payload: any) => {
    try {
      setLoading(true);
      const res = await fetch('/api/demo/respond', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const json = await res.json();
      setLoading(false);
      if (json?.status === 'ok' && json.text) {
        pushMessage({ role: 'assistant', content: json.text });
      } else {
        pushMessage({ role: 'assistant', content: json?.message || 'Error: no pude obtener respuesta del modelo.' });
      }
    } catch (err: any) {
      setLoading(false);
      pushMessage({ role: 'assistant', content: `Error: ${String(err)}` });
    }
  };

  const startBookingDemo = () => {
    const useCase = selectedUseCase || 'reservas';
    setSelectedUseCase(useCase as any);
    setMode('BOOKING_DEMO');
    // Add assistant intro messages for demo
    pushMessage({ role: 'assistant', content: `Perfecto — ahora actúo como agente del restaurante para la demo (${options.find(o => o.key === useCase)?.label}).` });
    pushMessage({ role: 'assistant', content: `Voy a simular cómo tu agente gestionaría una interacción real (fecha, hora, número de personas o detalles del pedido). Escribe una entrada para comenzar la simulación.` });
  };

  const sendInput = async () => {
    const val = inputValue.trim();
    if (!val) return;
    setInputValue('');
    pushMessage({ role: 'user', content: val });

    // Prepare payload
    const payload = {
      mode: mode,
      selectedUseCase: selectedUseCase,
      messages: [...messages, { role: 'user', content: val }],
      leadContext,
    };

    await callApi(payload);
  };

  const handleCloseAndReset = () => {
    onClose();
    // reset minimal state
    setMode('CONSULTING');
    setSelectedUseCase(null);
    setMessages([{ role: 'assistant', content: welcomeText }]);
    setInputValue('');
  };

  const triggerClosingFromButton = async (text: string) => {
    // Add user closing message, switch mode, call API
    pushMessage({ role: 'user', content: text });
    setMode('CLOSING');
    const payload = { mode: 'CLOSING', selectedUseCase, messages: [...messages, { role: 'user', content: text }], leadContext };
    await callApi(payload);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center bg-black/40">
      <div className="w-full max-w-[420px] sm:max-w-[480px] mx-4 sm:mx-0 rounded-3xl bg-white shadow-2xl overflow-hidden sm:rounded-3xl">
        <div className="max-h-[80vh] flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="font-bold">Demo IA — Architect.Sys</div>
            <div className="flex items-center gap-2">
              <button onClick={handleCloseAndReset} className="text-sm text-gray-500">Cerrar</button>
            </div>
          </div>

          {mode === 'CONSULTING' && (
            <div className="max-h-[80vh] flex flex-col">
              <header className="px-4 pt-3 pb-2 border-b border-black/5">
                <p className="font-semibold text-gray-900 text-sm">Demo en vivo Architect.Sys</p>
                <p className="text-xs text-gray-500 pt-1">Prueba en 2 minutos cómo tu agente de IA atiende reservas y pedidos.</p>
              </header>

              <main className="flex-1 overflow-y-auto px-4 pb-3 space-y-3">
                <div className="rounded-lg bg-orange-50 px-3 py-2 text-sm text-gray-800">{welcomeText}</div>

                <div>
                  <p className="text-xs font-medium text-gray-600 mb-2">¿Qué quieres ver en la demo?</p>
                  <div className="flex flex-wrap gap-2">
                    {options.map(o => (
                      <button key={o.key} onClick={() => handleSelectUseCase(o.key as any)} className="rounded-full border border-orange-500 px-4 py-2 text-sm font-medium text-orange-600 bg-white hover:bg-orange-50">{o.label}</button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  {messages.slice(-4).map((m, i) => (
                    <div key={i} className={`p-2 rounded-lg text-sm ${m.role === 'assistant' ? 'bg-slate-50 text-slate-800 self-start' : 'bg-[#DCF8C6] text-slate-800 self-end'}`}>{m.content}</div>
                  ))}
                </div>
              </main>

              <footer className="px-4 pb-3 pt-2 border-t border-black/5">
                <div className="mb-2">
                  <button className="w-full rounded-full bg-orange-500 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-orange-600" onClick={startBookingDemo}>Ver demo en vivo de reservas</button>
                </div>
                <div className="flex gap-2">
                  <input value={inputValue} onChange={e => setInputValue(e.target.value)} className="flex-1 border rounded-lg px-3 py-2" placeholder="Escribe aquí..." />
                  <button onClick={sendInput} className="bg-[#FF4500] text-white px-4 py-2 rounded-lg">{loading ? '...' : 'Enviar'}</button>
                </div>
              </footer>
            </div>
          )}

          {(mode === 'BOOKING_DEMO' || mode === 'CLOSING') && (
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50 min-h-[120px]">
              <div className="space-y-3">
                {messages.map((m, i) => (
                  <div key={i} className={`p-2 rounded-lg text-sm ${m.role === 'assistant' ? 'bg-slate-50 text-slate-800 self-start' : 'bg-[#DCF8C6] text-slate-800 self-end'}`}>{m.content}</div>
                ))}
              </div>

              {mode === 'BOOKING_DEMO' && (
                <div className="mt-2">
                  <p className="text-xs text-gray-600 mb-2">Acciones rápidas</p>
                  <div className="flex gap-2">
                    <button onClick={() => triggerClosingFromButton('Gracias, nos vemos esta noche')} className="flex-1 rounded-full border px-3 py-2 text-sm">Gracias, nos vemos esta noche</button>
                    <button onClick={() => triggerClosingFromButton('Reserva confirmada, gracias')} className="flex-1 rounded-full border px-3 py-2 text-sm">Reserva confirmada, gracias</button>
                  </div>
                </div>
              )}

              {mode === 'CLOSING' && (
                <div className="mt-2 p-2">
                  <p className="text-xs text-gray-600">El agente comercial propone la oferta y enlace para agendar.</p>
                </div>
              )}

              <div className="mt-3 flex gap-2">
                <input value={inputValue} onChange={e => setInputValue(e.target.value)} className="flex-1 border rounded-lg px-3 py-2" placeholder="Escribe aquí..." />
                <button onClick={sendInput} className="bg-[#FF4500] text-white px-4 py-2 rounded-lg">{loading ? '...' : 'Enviar'}</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
