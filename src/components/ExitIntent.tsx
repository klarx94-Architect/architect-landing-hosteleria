'use client';

import React, { useState, useEffect } from 'react';

/**
 * src/components/ExitIntent.tsx
 * Componente de captura de leads por intención de salida.
 * Protocolo: Filosofía Comercial Agresiva y B2B.
 */

export default function ExitIntent() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || hasShown) return;

    // --- DETECCIÓN DESKTOP (Mouse Leave superior) ---
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    // --- DETECCIÓN MOBILE (Interacción / Inactividad) ---
    let inactivityTimer: NodeJS.Timeout;

    const resetInactivity = () => {
      clearTimeout(inactivityTimer);
      // Disparar tras 15 segundos de inactividad
      inactivityTimer = setTimeout(() => {
        setIsVisible(true);
        setHasShown(true);
      }, 15000);
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    // Reiniciar timer en cualquier toque/scroll en mobile
    window.addEventListener('touchstart', resetInactivity);
    window.addEventListener('scroll', resetInactivity);
    
    resetInactivity();

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchstart', resetInactivity);
      window.removeEventListener('scroll', resetInactivity);
      clearTimeout(inactivityTimer);
    };
  }, [hasShown]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 drop-shadow-2xl">
      {/* Overlay con desenfoque extremo */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xl transition-opacity duration-500"
        onClick={() => setIsVisible(false)}
      ></div>
      
      {/* Modal Card */}
      <div className="relative bg-[#FDFCF8] max-w-lg w-full rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 border border-white/20 shadow-[0_30px_100px_rgba(255,69,0,0.2)] animate-in fade-in zoom-in duration-500">
        
        {/* Close Button */}
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-6 right-8 text-gray-400 hover:text-gray-900 transition-all hover:rotate-90"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center flex flex-col items-center">
          <div className="w-20 h-20 bg-orange-100 text-[#FF4500] rounded-full flex items-center justify-center text-4xl mb-8 group animate-bounce">
            ✋
          </div>

          <h2 className="text-3xl sm:text-4xl font-black leading-tight text-gray-900 mb-6">
            ¿Seguro que quieres perder otras <span className="text-[#FF4500]">5 reservas</span> hoy?
          </h2>
          
          <div className="bg-white p-6 rounded-2xl border-2 border-orange-100 shadow-inner mb-8 w-full">
            <div className="text-[#FF4500] font-black text-xs uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span> Oferta de Retención
            </div>
            <p className="text-gray-600 font-medium leading-relaxed">
              Te regalamos <span className="font-black text-gray-900">50€ de bono</span> para tu primera campaña de Ads. Ponemos a prueba el sistema y tú solo ves cómo se llena el local.
            </p>
          </div>

          <a 
            href="https://wa.me/34611499674?text=He%20visto%20el%20bono%20de%2050€,%20quiero%20activarlo."
            className="block w-full bg-gray-900 text-white py-5 rounded-full font-black text-xl shadow-xl hover:bg-[#FF4500] hover:scale-105 transition-all duration-300"
          >
            Activar mi bono de 50€
          </a>
          
          <button 
            onClick={() => setIsVisible(false)}
            className="text-sm font-bold text-gray-400 hover:text-gray-600 underline decoration-2 underline-offset-4 mt-8 uppercase tracking-widest"
          >
            No me importa perder dinero hoy
          </button>
        </div>
      </div>
    </div>
  );
}
