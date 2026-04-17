'use client';

import React, { useState } from 'react';
import MetricsCards from '@/components/dashboard/MetricsCards';
import LiveMonitor from '@/components/dashboard/LiveMonitor';
import AuthLayer from '@/components/dashboard/AuthLayer';

export default function AdminCRM() {
  const [chats, setChats] = useState<any[]>([]);

  return (
    <AuthLayer>
      <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900 selection:bg-[#FF4500] selection:text-white">
        <div className="max-w-7xl mx-auto">
          <header className="mb-12 border-b border-gray-200 pb-8 relative">
            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-2">Sala de Análisis <span className="text-[#FF4500]">Visual</span></h1>
            <p className="text-gray-500 font-medium flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></span>
              Conexión Cifrada Establecida. Monitorización en tiempo real activa.
            </p>
          </header>
          
          {/* Módulo 1: Data Analytics */}
          <MetricsCards chats={chats} />

          {/* Módulo 2: Operaciones IA en Vivo */}
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-black flex items-center">
              <span className="text-xl mr-3">⏱️</span>
              Logs del Motor Comercial
            </h2>
          </div>
          
          <LiveMonitor onDataUpdate={setChats} />
          
        </div>
      </div>
    </AuthLayer>
  );
}
