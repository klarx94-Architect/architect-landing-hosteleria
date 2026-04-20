'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseClient } from '@/lib/supabase-client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Si ya hay una sesión, redirigir al dashboard
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabaseClient.auth.getSession();
      if (session) {
        router.push('/admin-architect');
      }
    };
    checkUser();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Credenciales inválidas o error de conexión.');
      setLoading(false);
    } else {
      router.push('/admin-architect');
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] flex items-center justify-center p-6 font-sans">
      {/* BACKGROUND DECOR */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      
      <div className="w-full max-w-md relative">
        {/* LOGO AREA */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center font-black text-3xl text-white shadow-2xl shadow-orange-500/30 mb-4 transform -rotate-3">
            A
          </div>
          <h1 className="text-2xl font-black tracking-tighter text-zinc-900">Architect.Sys</h1>
          <p className="text-zinc-400 text-[10px] uppercase tracking-[0.2em] font-bold">Command Center Login</p>
        </div>

        <div className="bg-white border border-zinc-100 p-10 rounded-[2.5rem] shadow-2xl shadow-zinc-200/50 relative overflow-hidden">
          {/* DECORATIVE LINE */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-20"></div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-zinc-400 ml-1">E-mail Operativo</label>
              <input
                type="email"
                required
                className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-medium"
                placeholder="operaciones@architect.sys"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-zinc-400 ml-1">Clave de Acceso</label>
              <input
                type="password"
                required
                className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-medium"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                <p className="text-xs font-bold text-red-600 uppercase tracking-tighter">{error}</p>
              </div>
            )}

            <button
              disabled={loading}
              className="w-full bg-zinc-900 text-white font-black uppercase text-xs tracking-[0.2em] py-5 rounded-2xl hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-900/10 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
            >
              <span className="relative z-10">{loading ? 'Validando Puente...' : 'Iniciar Sesión'}</span>
              <div className="absolute inset-0 bg-orange-500 transform translate-y-full group-hover:translate-y-[90%] transition-transform opacity-10"></div>
            </button>
          </form>
        </div>

        <footer className="mt-12 text-center">
          <p className="text-[10px] text-zinc-300 font-bold uppercase tracking-widest leading-loose">
            Project Sovereign Node <br/>
            Sincronización de Canal Encriptada
          </p>
        </footer>
      </div>
    </div>
  );
}
