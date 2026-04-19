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
        alert("CRÍTICO: La tabla 'bot_settings' no existe en Supabase. Debes ejecutar el script SQL que te envié para que este botón funcione.");
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

  if (errorMsg) return <div className="p-8 text-red-400 bg-zinc-900 rounded-xl border border-red-500/20">Error de Red: {errorMsg}</div>;
  if (loading) return <div className="p-12 text-center text-zinc-500 animate-pulse">Sincronizando flujos de Meta...</div>;

  const leadsObj = chats.reduce((acc: any, chat: any) => {
      if (!acc[chat.phone]) acc[chat.phone] = [];
      acc[chat.phone].push(chat);
      return acc;
  }, {});

  const phones = Object.keys(leadsObj);

  if (phones.length === 0) {
    return <div className="p-12 text-center text-zinc-500 border border-zinc-800 rounded-2xl bg-zinc-950">Esperando primer mensaje...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {phones.map((phone) => {
        const conversation = leadsObj[phone];
        const isEnabled = botSettings[phone] !== false;
        
        return (
          <div key={phone} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[500px]">
            <div className="p-4 border-b border-zinc-800 bg-zinc-950 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-white">{phone}</h3>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Canal Directo</span>
              </div>
              <button 
                onClick={() => toggleBot(phone, isEnabled)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${
                  isEnabled 
                  ? 'bg-green-500/10 text-green-500 border border-green-500/20 hover:bg-green-500' 
                  : 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white'
                }`}
              >
                {isEnabled ? 'Bot On' : 'Bot Paused'}
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-zinc-900/50 flex flex-col-reverse">
              {conversation.map((msg: any) => (
                <div key={msg.id} className={`p-3 rounded-xl max-w-[85%] ${
                  msg.role === 'assistant' 
                  ? 'bg-zinc-800 text-zinc-300 self-start border border-zinc-700/50' 
                  : 'bg-blue-600/10 text-blue-400 self-end border border-blue-500/20'
                }`}>
                  <p className="text-xs leading-relaxed">{msg.content}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
