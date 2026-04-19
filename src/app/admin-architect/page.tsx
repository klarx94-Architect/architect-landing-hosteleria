import React from 'react';
import LiveMonitor from '@/components/dashboard/LiveMonitor';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30">
      {/* Header Estilo Centro de Comando */}
      <header className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black text-white shadow-lg shadow-blue-600/20">
              A
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Architect.Sys Console</h1>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Node Live - Production</span>
              </div>
            </div>
          </div>
          
          <nav className="flex items-center gap-4">
            <Link href="/onboarding" className="text-xs font-bold text-zinc-400 hover:text-white transition-colors">
              Onboarding
            </Link>
            <Link href="/api/diagnostic" target="_blank" className="text-xs font-bold text-zinc-400 hover:text-white transition-colors">
              Diagnostics
            </Link>
            <div className="h-4 w-px bg-zinc-800 mx-2"></div>
            <button className="bg-white text-black text-[10px] font-black uppercase px-4 py-2 rounded-lg hover:bg-zinc-200 transition-all">
              Export Audit
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto p-6 space-y-8">
        {/* Sección de Métricas Rápidas */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Conversaciones', value: 'Active', color: 'text-blue-500' },
            { label: 'IA Sentiment', value: 'Positive', color: 'text-green-500' },
            { label: 'Cloud API', value: 'Connected', color: 'text-zinc-400' },
            { label: 'Latencia Máx', value: '8s (Limited)', color: 'text-yellow-500' },
          ].map((m, i) => (
            <div key={i} className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-2xl">
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">{m.label}</p>
              <p className={`text-xl font-black ${m.color}`}>{m.value}</p>
            </div>
          ))}
        </section>

        {/* El Monitor Analítico */}
        <section>
          <div className="mb-6 flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-black tracking-tighter">Live Conversation Stream</h2>
              <p className="text-zinc-500 text-sm">Auditoría en tiempo real y control de respuesta manual.</p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-[10px] text-zinc-500 font-bold">
                Auto-learning Active
              </span>
            </div>
          </div>
          
          <LiveMonitor />
        </section>
      </main>

      <footer className="max-w-[1600px] mx-auto px-6 py-12 border-t border-zinc-900 text-[10px] text-zinc-600 font-bold uppercase tracking-widest flex justify-between">
        <span>© 2026 Architect Aeterium Core</span>
        <div className="flex gap-6">
          <span>Security Protocol 4.0</span>
          <span>Sovereign Deployment</span>
        </div>
      </footer>
    </div>
  );
}
