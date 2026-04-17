'use client';

import React, { useEffect, useState } from 'react';
import { supabaseClient } from '@/lib/supabase-client';

function getIntentBadge(intent: string) {
  switch(intent) {
    case 'venta': return <span className="bg-green-100 text-green-800 text-[10px] uppercase font-bold px-2 py-1 rounded-full ml-2">Venta Cierta</span>;
    case 'rechazo': return <span className="bg-red-100 text-red-800 text-[10px] uppercase font-bold px-2 py-1 rounded-full ml-2">Rechazo</span>;
    case 'lead': 
    default: return <span className="bg-yellow-100 text-yellow-800 text-[10px] uppercase font-bold px-2 py-1 rounded-full ml-2">Explorando</span>;
  }
}

export default function LiveMonitor({ onDataUpdate }: { onDataUpdate?: (chats: any[]) => void }) {
  const [chats, setChats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // 1. Fetch data inicial
    const fetchChats = async () => {
      const { data, error } = await supabaseClient
        .from('chats')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) console.error("Error fetching chats:", error);
      if (mounted && data) {
        setChats(data);
        if (onDataUpdate) onDataUpdate(data);
        setLoading(false);
      }
    };

    fetchChats();

    // 2. Suscripción a Realtime
    const channel = supabaseClient.channel('realtime:public:chats')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chats' }, (payload) => {
        if (!mounted) return;
        console.log('Realtime INSERT received!', payload.new);
        setChats((current) => {
          const updated = [payload.new, ...current];
          if (onDataUpdate) onDataUpdate(updated);
          return updated;
        });
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'chats' }, (payload) => {
        if (!mounted) return;
        console.log('Realtime UPDATE received!', payload.new);
        setChats((current) => {
          const updated = current.map(c => c.id === payload.new.id ? payload.new : c);
          if (onDataUpdate) onDataUpdate(updated);
          return updated;
        });
      })
      .subscribe();

    return () => {
      mounted = false;
      supabaseClient.removeChannel(channel);
    };
  }, [onDataUpdate]);

  if (loading) {
     return <div className="p-8 text-center text-gray-500 font-bold animate-pulse">Sincronizando con la red neuronal de Meta...</div>;
  }

  // Agrupar chats por número de teléfono
  const leadsObj = chats.reduce((acc: any, chat: any) => {
      if (!acc[chat.phone]) acc[chat.phone] = [];
      acc[chat.phone].push(chat);
      return acc;
  }, {});

  const phones = Object.keys(leadsObj);
  
  if (phones.length === 0) {
    return (
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm text-center">
        <div className="text-4xl mb-4">📡</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Monitor a la Espera</h3>
        <p className="text-gray-500 italic">No hay conversaciones registradas aún. El webhook está activo.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {phones.map((phone) => {
        // Encontrar el último intent valioso en esta conversación
        const conversation = leadsObj[phone];
        const lastIntentStr = conversation.find((m: any) => m.intent)?.intent || 'lead';
        
        return (
          <div key={phone} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col max-h-[600px] hover:border-gray-300 transition-colors">
            <div className="flex justify-between items-center border-b pb-4 mb-4 sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold flex items-center">
                <span className="text-gray-400 text-sm mr-2">📱</span>
                {phone.replace('34', '+34 ')}
              </h2>
              {getIntentBadge(lastIntentStr)}
            </div>
            
            <div className="space-y-4 overflow-y-auto pr-2 flex-1 flex flex-col-reverse">
              {conversation.map((msg: any) => (
                <div key={msg.id} className={`p-4 rounded-xl text-sm ${msg.role === 'user' ? 'bg-gray-50 text-gray-700 mr-4 border border-gray-100' : 'bg-[#FDFCF8] text-gray-900 ml-4 border border-orange-100 shadow-sm'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-extrabold uppercase text-[10px] tracking-wider opacity-60">
                      {msg.role === 'user' ? 'Prospecto' : 'IA Comercial'}
                    </span>
                    {msg.sentiment && msg.sentiment !== 'neutro' && (
                      <span className={`text-[10px] uppercase font-bold ${msg.sentiment === 'positivo' ? 'text-green-500' : 'text-red-500'}`}>
                        {msg.sentiment}
                      </span>
                    )}
                  </div>
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
