'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabaseClient } from '@/lib/supabase-client';

export default function OnboardingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabaseClient.auth.getSession();
      if (!session) {
        router.push('/login');
      } else {
        setLoading(false);
      }
    };
    checkUser();
  }, [router]);

  if (loading) return (
    <div className="min-h-screen bg-[#FDFCF8] flex items-center justify-center font-black text-[10px] uppercase tracking-[0.3em] text-zinc-400">
      Autenticando Nodo...
    </div>
  );
  return (
    <div className="min-h-screen bg-[#FDFCF8] text-zinc-900 font-sans selection:bg-orange-500/30">
      {/* BACKGROUND DECORATION (SPACE OPS STYLE) */}
      <div className="fixed inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(#FF4500 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 lg:py-24">
        {/* HEADER */}
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Link href="/admin-architect" className="w-10 h-10 bg-white border border-zinc-200 rounded-xl flex items-center justify-center text-zinc-400 hover:text-orange-500 hover:border-orange-200 transition-all shadow-sm">
              ←
            </Link>
            <div className="h-px w-12 bg-zinc-200"></div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-black text-orange-500">Mission Initializing</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none mb-4">
            Onboarding <br/>
            <span className="text-zinc-400">Command Center.</span>
          </h1>
          <p className="text-lg text-zinc-500 max-w-xl font-medium leading-relaxed">
            Configura el ADN de tu Recepcionista IA. Estás a un paso de automatizar tu rentabilidad bajo el estándar Architect.Sys.
          </p>
        </header>

        {/* OPS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* STEP 1: CONNECTIVITY */}
          <section className="lg:col-span-2 space-y-8">
            <div className="bg-white/70 backdrop-blur-xl border border-zinc-200 rounded-[2.5rem] p-10 shadow-xl shadow-zinc-200/50">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-black tracking-tight mb-2">Conectividad Meta API</h2>
                  <p className="text-zinc-400 text-sm">Validación de puentes de comunicación en tiempo real.</p>
                </div>
                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-xl">📡</div>
              </div>

              <div className="space-y-6">
                {[
                  { label: 'Cloud API Token', status: 'Verificado', val: 'EAAG6...' },
                  { label: 'Phone Number ID', status: 'Activo', val: '106130...' },
                  { label: 'Business Account ID', status: 'Activo', val: '93132...' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider mb-1">{item.label}</p>
                      <p className="font-mono text-xs text-zinc-600">{item.val}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                      <span className="text-[10px] font-black uppercase text-green-600">{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-950 rounded-[2.5rem] p-10 text-white shadow-2xl overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-8 opacity-10 text-6xl transform group-hover:scale-125 transition-transform">🤖</div>
              <h2 className="text-2xl font-black mb-4 tracking-tight">Cerebro Closer Senior</h2>
              <p className="text-zinc-400 text-sm mb-8 max-w-sm">
                La IA ya está configurada con **Memoria Persistente**. Cada cliente será tratado de forma exclusiva basándose en su historial.
              </p>
              <button className="bg-orange-500 text-white text-[10px] font-black uppercase px-8 py-3 rounded-xl hover:bg-orange-600 transition-all tracking-[0.2em]">
                Calibrar Personalidad
              </button>
            </div>
          </section>

          {/* SIDEBAR: METRICS */}
          <aside className="space-y-4">
            <div className="bg-white border border-zinc-200 rounded-[2rem] p-8">
              <h3 className="text-zinc-400 text-[10px] uppercase font-black tracking-widest mb-6">Estado del Sistema</h3>
              <div className="space-y-6">
                {[
                  { label: 'Uptime', val: '99.9%' },
                  { label: 'Engine', val: 'Gemini 2.5' },
                  { label: 'Latency', val: '22ms' },
                ].map((s, i) => (
                  <div key={i}>
                    <p className="text-zinc-400 text-xs mb-1 font-medium">{s.label}</p>
                    <p className="text-lg font-black text-zinc-800 tracking-tighter">{s.val}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-orange-500 p-8 rounded-[2rem] text-white">
              <h3 className="text-white/60 text-[10px] uppercase font-black tracking-widest mb-4">Meta Status</h3>
              <p className="font-black text-2xl mb-2 tracking-tighter">Ready to Close.</p>
              <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white w-full animate-pulse"></div>
              </div>
            </div>
          </aside>
        </div>

        <footer className="mt-20 pt-8 border-t border-zinc-200 flex justify-between items-center">
          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest leading-loose">
            Architect.sys Admin <br/>
            Project Sovereign Node
          </p>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center grayscale hover:grayscale-0 transition-all">🍎</div>
            <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center grayscale hover:grayscale-0 transition-all">⚓</div>
          </div>
        </footer>
      </div>
    </div>
  );
}
