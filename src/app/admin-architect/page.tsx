'use client';

import React, { useEffect, useState } from 'react';
import LiveMonitor from '@/components/dashboard/LiveMonitor';
import Link from 'next/link';
import { supabaseClient } from '@/lib/supabase-client';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    conversations: 0,
    closingRate: 0,
    rejectionRate: 0,
    topTopic: 'Analizando...',
    actionStage: 0,
    sentiment: 'Neutro'
  });

  useEffect(() => {
    const fetchStats = async () => {
      if (!supabaseClient) return;

      const { data: chats } = await supabaseClient
        .from('chats')
        .select('intent, sentiment, topic, closing_stage, phone')
        .or('status.eq.active,status.is.null');

      if (chats) {
        const total = chats.length;
        const sales = chats.filter(c => c.intent === 'venta').length;
        const rejections = chats.filter(c => c.intent === 'rechazo').length;
        const positive = chats.filter(c => c.sentiment === 'positivo').length;
        const actionLeads = chats.filter(c => c.closing_stage === 'accion').length;

        // Calcular Top Topic
        const topics = chats.map(c => c.topic).filter(Boolean);
        const topTopic = topics.length > 0 
          ? topics.sort((a,b) => topics.filter(v => v===a).length - topics.filter(v => v===b).length).pop()
          : 'Ninguno';
        
        const rate = total > 0 ? Math.round((sales / total) * 100) : 0;
        const rejectRate = total > 0 ? Math.round((rejections / total) * 100) : 0;
        
        let avgSent = 'Neutro';
        if (positive > total / 2) avgSent = 'Positivo';
        else if (total > 0 && positive < total / 4) avgSent = 'Alerta';

        setStats({
          conversations: total,
          closingRate: rate,
          rejectionRate: rejectRate,
          topTopic: topTopic || 'Chat',
          actionStage: actionLeads,
          sentiment: avgSent
        });
      }
    };

    fetchStats();
    
    const channel = supabaseClient?.channel('stats-sync-heavy')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'chats' }, () => fetchStats())
      .subscribe();

    return () => {
      if (channel) supabaseClient?.removeChannel(channel);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-zinc-900 font-sans selection:bg-orange-500/30">
      <header className="border-b border-zinc-100 bg-white/70 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center font-black text-white shadow-lg shadow-orange-500/20">
              A
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-zinc-900">Architect.Sys Console</h1>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">Node Live - Production</span>
              </div>
            </div>
          </div>
          
          <nav className="flex items-center gap-4">
            <Link href="/onboarding" className="text-xs font-bold text-zinc-500 hover:text-orange-600 transition-colors">
              Onboarding
            </Link>
            <Link href="/api/diagnostic" target="_blank" className="text-xs font-bold text-zinc-500 hover:text-orange-600 transition-colors">
              Diagnostics
            </Link>
            <div className="h-4 w-px bg-zinc-200 mx-2"></div>
            <button className="bg-zinc-900 text-white text-[10px] font-black uppercase px-4 py-2 rounded-lg hover:bg-zinc-800 transition-all">
              Export Audit
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto p-6 space-y-8">
        {/* GRID DE KPIs DE ALTA DENSIDAD */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: 'Conversaciones', value: stats.conversations, color: 'text-orange-600', trend: 'Live' },
            { label: 'IA Sentiment', value: stats.sentiment, color: 'text-green-600', trend: 'Análisis' },
            { label: 'Tasa de Cierre', value: `${stats.closingRate}%`, color: 'text-zinc-600', trend: 'ROI' },
            { label: 'Tasa de Rechazo', value: `${stats.rejectionRate}%`, color: 'text-red-500', trend: 'Filtro' },
            { label: 'Hot Topic', value: stats.topTopic, color: 'text-blue-600', trend: 'Tendencia' },
            { label: 'Conversiones', value: stats.actionStage, color: 'text-orange-600', trend: 'Acción' },
          ].map((m, i) => (
            <div key={i} className="bg-white border border-zinc-100 p-4 rounded-3xl shadow-sm transition-all hover:shadow-xl hover:shadow-zinc-200/50">
              <div className="flex justify-between items-start mb-2">
                <p className="text-[9px] uppercase tracking-widest text-zinc-300 font-black">{m.label}</p>
                <span className="text-[8px] px-1.5 py-0.5 bg-zinc-50 text-zinc-400 rounded-md font-bold">{m.trend}</span>
              </div>
              <p className={`text-xl font-black tracking-tighter ${m.color}`}>{m.value}</p>
            </div>
          ))}
        </section>

        <section>
          <div className="mb-6 flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-black tracking-tighter text-zinc-900">Live Conversation Stream</h2>
              <p className="text-zinc-400 text-sm">Auditoría en tiempo real y control de respuesta manual.</p>
            </div>
          </div>
          
          <div className="bg-white border border-zinc-100 p-1 rounded-[2.5rem] shadow-xl shadow-zinc-200/20">
            <LiveMonitor />
          </div>
        </section>
      </main>
    </div>
  );
}
