import React from 'react';
import { supabase } from '@/lib/supabase';
import MetricsCards from '@/components/dashboard/MetricsCards';
import LiveMonitor from '@/components/dashboard/LiveMonitor';

// FORCE NEXT.JS TO RENDER AT RUNTIME ONLY (PREVENTS VERCEL BUILD FAILURES)
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function AdminCRM() {
  let leads: Record<string, any[]> = {};
  let errorMsg = null;

  try {
    const { data: chats, error } = await supabase
      .from('chats')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (chats) {
      leads = chats.reduce((acc: Record<string, any[]>, chat: any) => {
        if (!acc[chat.phone]) acc[chat.phone] = [];
        acc[chat.phone].push(chat);
        return acc;
      }, {});
    }
  } catch (err: any) {
    console.error("Supabase connection error:", err);
    errorMsg = err.message || "Error al conectar con la base de datos.";
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900 selection:bg-[#FF4500] selection:text-white">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 border-b border-gray-200 pb-8">
          <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-2">Sala de Análisis <span className="text-[#FF4500]">Visual</span></h1>
          <p className="text-gray-500 font-medium">Monitorización en tiempo real de operaciones IA B2B.</p>
        </header>
        
        {errorMsg && (
          <div className="bg-red-50 text-red-700 p-6 rounded-2xl mb-8 border border-red-100 shadow-sm flex items-center">
            <span className="text-2xl mr-4">⚠️</span>
            <div>
              <strong className="block text-lg mb-1">Error Crítico de Conexión</strong>
              <span>{errorMsg}</span>
            </div>
          </div>
        )}

        {/* Módulo 1: Data Analytics */}
        {!errorMsg && <MetricsCards chats={chats || []} />}

        {/* Módulo 2: Operaciones IA en Vivo */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-black flex items-center">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-3"></span>
            Logs del Motor Comercial
          </h2>
        </div>
        
        {!errorMsg && <LiveMonitor leads={leads} />}
        
      </div>
    </div>
  );
}
