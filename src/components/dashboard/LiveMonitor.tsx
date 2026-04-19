'use client';

import React, { useEffect, useState } from 'react';
import { supabaseClient } from '@/lib/supabase-client';

export default function LiveMonitor() {
  const [chats, setChats] = useState<any[]>([]);
  const [botSettings, setBotSettings] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const toggleBot = async (phone: string, currentState: boolean) => {
    if (!supabaseClient) return;
    const newState = !currentState;
    
    // Optimismo: Actualizar UI local inmediatamente
    setBotSettings(prev => ({ ...prev, [phone]: newState }));

    const { error } = await supabaseClient
      .from('bot_settings')
      .upsert({ phone, enabled: newState }, { onConflict: 'phone' });

    if (error) {
      console.error("Error al pausar el bot:", error);
      setBotSettings(prev => ({ ...prev, [phone]: currentState }));
      
      if (error.code === '42P01') {
        alert("CRÍTICO: La tabla 'bot_settings' no existe en Supabase. Debes ejecutar el script SQL para que este botón funcione.");
      } else {
        alert("Error de Conexión: " + error.message);
      }
    }
  };

  useEffect(() => {
    let mounted = true;

    const fetchInitialData = async () => {
      if (!supabaseClient) {
        setErrorMsg("Supabase no esta configurado correctamente.");
        return;
      }
      
      const { data: chatData, error: chatError } = await supabaseClient
        .from('chats')
        .select('*')
        .order('created_at', { ascending: false });
      
      const { data: settingsData } = await supabaseClient
        .from('bot_settings')
        .select('*');

      if (mounted) {
        if (chatError) {
          setErrorMsg(chatError.message);
        } else {
          setChats(chatData || []);
          const settingsMap = settingsData?.reduce((acc: any, s: any) => ({ ...acc, [s.phone]: s.enabled }), {}) || {};
          setBotSettings(settingsMap);
        }
        setLoading(false);
      }
    };

    fetchInitialData();

    const channel = supabaseClient.channel('realtime-dashboard')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'chats' }, () => fetchInitialData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bot_settings' }, () => fetchInitialData())
      .subscribe();

    return () => {
      mounted = false;
      supabaseClient.removeChannel(channel);
    };
  }, []);

  if (errorMsg) return <div className="p-8 text-red-600 bg-white rounded-xl border border-red-100 shadow-sm">Error de Red: {errorMsg}</div>;
  if (loading) return <div className="p-12 text-center text-zinc-400 animate-pulse font-bold uppercase tracking-widest text-[10px]">Sincronizando flujos de Meta...</div>;

  const leadsObj = chats.reduce((acc: any, chat: any) => {
      if (!acc[chat.phone]) acc[chat.phone] = [];
      acc[chat.phone].push(chat);
      return acc;
  }, {});

  const phones = Object.keys(leadsObj);

  if (phones.length === 0) {
    return <div className="p-12 text-center text-zinc-400 border border-zinc-100 rounded-[2rem] bg-white italic">Esperando primer mensaje entrante...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-zinc-50 rounded-[2.5rem]">
      {phones.map((phone) => {
        const conversation = leadsObj[phone];
        const isEnabled = botSettings[phone] !== false;
        
        return (
          <div key={phone} className="bg-white border border-zinc-100 rounded-[2rem] overflow-hidden shadow-sm flex flex-col h-[500px] transition-all hover:shadow-xl hover:shadow-zinc-200/50">
            <div className="p-5 border-b border-zinc-50 bg-white flex justify-between items-center">
              <div>
                <h3 className="font-bold text-zinc-800">{phone}</h3>
                <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-black">Canal Directo</span>
              </div>
              <button 
                onClick={() => toggleBot(phone, isEnabled)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all shadow-sm ${
                  isEnabled 
                  ? 'bg-zinc-100 text-zinc-400 hover:bg-zinc-200' 
                  : 'bg-orange-500 text-white hover:bg-orange-600 shadow-orange-500/20 shadow-lg'
                }`}
              >
                {isEnabled ? 'Bot On' : 'Bot Paused'}
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-zinc-50/30 flex flex-col-reverse">
              {conversation.map((msg: any) => (
                <div key={msg.id} className={`p-4 rounded-2xl max-w-[85%] text-sm leading-relaxed shadow-sm ${
                  msg.role === 'assistant' 
                  ? 'bg-white text-zinc-600 self-start border border-zinc-100' 
                  : 'bg-orange-600 text-white self-end font-medium'
                }`}>
                  <p>{msg.content}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
