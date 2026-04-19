import React from 'react';
import LiveMonitor from '@/components/dashboard/LiveMonitor';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#FDFCF8] text-zinc-900 font-sans selection:bg-orange-500/30">
      {/* Header Estilo Centro de Comando Espacial (Clarity) */}
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
        {/* Sección de Métricas Rápidas (Estilo SaaS Premium) */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Conversaciones', value: 'Active', color: 'text-orange-600' },
            { label: 'IA Sentiment', value: 'Positive', color: 'text-green-600' },
            { label: 'Cloud API', value: 'Connected', color: 'text-zinc-600' },
            { label: 'Latencia Máx', value: '8s (Limited)', color: 'text-amber-600' },
          ].map((m, i) => (
            <div key={i} className="bg-white border border-zinc-100 p-4 rounded-2xl shadow-sm">
              <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-1">{m.label}</p>
              <p className={`text-xl font-black ${m.color}`}>{m.value}</p>
            </div>
          ))}
        </section>

        {/* El Monitor Analítico */}
        <section>
          <div className="mb-6 flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-black tracking-tighter text-zinc-900">Live Conversation Stream</h2>
              <p className="text-zinc-400 text-sm">Auditoría en tiempo real y control de respuesta manual.</p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-white border border-zinc-100 rounded-full text-[10px] text-zinc-400 font-bold">
                Auto-learning Active
              </span>
            </div>
          </div>
          
          {/* Se carga el monitor (que ya internamente maneja el fondo blanco/zinc) */}
          <div className="bg-white border border-zinc-100 p-1 rounded-[2.5rem] shadow-xl shadow-zinc-200/20">
            <LiveMonitor />
          </div>
        </section>
      </main>

      <footer className="max-w-[1600px] mx-auto px-6 py-12 border-t border-zinc-100 text-[10px] text-zinc-400 font-bold uppercase tracking-widest flex justify-between">
        <span>© 2026 Architect Aeterium Core</span>
        <div className="flex gap-6">
          <span>Security Protocol 4.1</span>
          <span>Sovereign Deployment</span>
        </div>
      </footer>
    </div>
  );
}
