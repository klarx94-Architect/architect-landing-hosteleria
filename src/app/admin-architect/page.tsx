import React from 'react';
import Link from 'next/link';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-4xl mx-auto border border-zinc-800 rounded-2xl p-12 bg-zinc-950/50 backdrop-blur-xl">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
            Control Center
          </h1>
          <p className="text-zinc-500 mt-2 text-lg">Architect.Sys Management & Monitoring</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/onboarding" className="group p-6 border border-zinc-800 rounded-xl hover:bg-zinc-900 transition-all duration-300">
            <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">Onboarding Portal</h2>
            <p className="text-zinc-500 text-sm">Gestiona la conexión de WhatsApp y configuraciones iniciales.</p>
          </Link>

          <Link href="/api/diagnostic" className="group p-6 border border-zinc-800 rounded-xl hover:bg-zinc-900 transition-all duration-300">
            <h2 className="text-xl font-semibold mb-2 group-hover:text-green-400 transition-colors">System Diagnostics</h2>
            <p className="text-zinc-500 text-sm">Verifica el estado de Gemini y las conexiones de red.</p>
          </Link>
        </div>

        <footer className="mt-12 pt-8 border-t border-zinc-900 flex justify-between items-center text-xs text-zinc-600">
          <div>Architect.Sys Production Node v2.0</div>
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Engine Active
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
