import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-brand selection:text-white">
      {/* NAVBAR LUMINOUS */}
      <nav className="w-full absolute top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="flex justify-between items-center py-4 px-8 max-w-7xl mx-auto">
          <div className="text-2xl font-black tracking-tighter text-gray-900">
            Architect<span className="text-[#FF4500]">.Sys</span>
          </div>
          <a href="https://wa.me/34611499674?text=Hola,%20quiero%20solicitar%20la%20Auditoría%20Gratuita." className="hidden md:inline-flex bg-gray-900 text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-[#FF4500] transition-colors shadow-sm">
            Auditoría Gratuita
          </a>
        </div>
      </nav>

      {/* HERO SECTION LUMINOUS & ALIVE */}
      <header className="relative w-full pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden flex flex-col items-center text-center px-8">
        {/* Background elements for life and brightness */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-green-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-[#FF4500] text-sm font-bold tracking-wide uppercase mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#FF4500] animate-pulse"></span>
            El fin de las mesas vacías
          </div>
          
          <h1 className="text-5xl lg:text-[5rem] font-black leading-[1.05] tracking-tight text-gray-900 mb-6">
            El Sistema que llena tus mesas <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4500] to-orange-400">mientras tú te enfocas en cocinar.</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium mb-10">
            Deja de perder reservas por no atender el teléfono. Implementamos un asistente virtual en tu WhatsApp que atiende a tus clientes 24/7 y te llena el local en automático.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://wa.me/34611499674?text=Hola,%20quiero%20ver%20cómo%20funciona%20el%20sistema." className="flex items-center justify-center gap-3 bg-[#FF4500] text-white px-10 py-5 rounded-full text-xl font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
              Ver cómo funciona en WhatsApp
            </a>
            <a href="#video-demo" className="flex items-center justify-center gap-3 bg-white text-gray-900 border-2 border-gray-200 px-10 py-5 rounded-full text-xl font-bold hover:bg-gray-50 transition-all duration-300">
              <svg className="w-6 h-6 text-[#FF4500]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
              Ver Vídeo de 2 min
            </a>
          </div>
        </div>

        {/* VIDEO PLACEHOLDER / AI IMAGE */}
        <div id="video-demo" className="relative z-10 w-full max-w-6xl mx-auto mt-20 rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white bg-gray-100 aspect-video">
          {/* This image will be replaced by the CEO's AI Video later. For now, it uses the generated image */}
          <img src="/hero-placeholder.jpg" alt="Restaurante Lleno" className="w-full h-full object-cover" />
          
          <div className="absolute inset-0 bg-gray-900/20 flex items-center justify-center group cursor-pointer">
             <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                <svg className="w-10 h-10 text-[#FF4500] ml-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
             </div>
          </div>
        </div>
      </header>

      {/* TEMPORARY PLACEHOLDER FOR NEXT PHASES */}
      <div className="py-20 text-center text-gray-400 font-medium">
        [Las siguientes secciones (Dolor, Solución, Precios) serán inyectadas en los próximos pasos]
      </div>
    </div>
  );
}
