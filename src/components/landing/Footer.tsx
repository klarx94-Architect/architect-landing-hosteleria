"use client";

import { MessageCircle, Globe, Shield, Star } from "lucide-react";

export default function Footer({ WHATSAPP_NUMBER }: { WHATSAPP_NUMBER: string }) {
  return (
    <footer className="py-32 bg-white border-t border-brand-green/5 overflow-hidden relative">
      <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-24 items-center mb-32">
          
          <div className="space-y-6">
            <h5 className="text-3xl font-serif text-brand-noir tracking-widest leading-none">Architect <span className="text-brand-amber font-light tracking-tighter italic">Sys.</span></h5>
            <div className="text-[10px] text-brand-green/40 uppercase tracking-[0.5em] font-black leading-relaxed">
              Infraestructura Digital Elite // Granada 2026.
              <br />  Senior Selective Standard 30k.
            </div>
          </div>

          <div className="flex justify-center gap-16">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="text-brand-green/20 hover:text-brand-noir transition-all transform hover:scale-125 hover:rotate-6"><MessageCircle size={30} /></a>
            <a href="#" className="text-brand-green/20 hover:text-brand-noir transition-all transform hover:scale-125 hover:rotate-6"><Globe size={30} /></a>
            <a href="#" className="text-brand-green/20 hover:text-brand-noir transition-all transform hover:scale-125 hover:rotate-6"><Shield size={30} /></a>
          </div>

          <div className="flex flex-col items-center md:items-end text-[10px] text-brand-green/30 font-bold uppercase tracking-[0.4em] space-y-3">
             <div className="flex items-center gap-2 tracking-tighter"><Star size={12} className="fill-brand-green" /> © 2026 Architect Sys · Granada, España</div>
             <div className="text-brand-amber/50 italic tracking-widest uppercase">High Performance Hostelry // Selective Project</div>
          </div>
        </div>
      </div>
      
      {/* 🏺 MARCA TÉCNICA REFINADA (Gallo Style Background Text) */}
      <div className="absolute left-1/2 bottom-0 text-[12vw] font-serif text-brand-green/[0.02] -z-10 leading-none select-none -translate-x-1/2 translate-y-1/2 uppercase tracking-tighter italic">
        ELITE PRECISION
      </div>
    </footer>
  );
}
