"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Zap, Check } from "lucide-react";

interface HeroProps {
  onWhatsAppClick: (msg: string) => void;
}

export default function Hero({ onWhatsAppClick }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-brand-bone pt-40 pb-20 px-6 overflow-hidden">
      
      {/* 🏛️ ARCHITECTURAL ACCENTS (Sutiles — Estilo Vora/Gallo) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] right-[-10%] w-[800px] h-[800px] bg-brand-green/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[-15%] w-[700px] h-[700px] bg-brand-amber/5 rounded-full blur-[140px]" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10 text-center">
        
        {/* 🏺 ELITE LABEL (Standard 30k) */}
        <motion.div 
           initial={{ opacity: 0, y: 15 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="label-senior mb-12"
        >
          <Zap size={14} className="text-brand-amber fill-brand-amber" />
          Protocolo Arquitecto Nuclear // Granada 2026
        </motion.div>

        {/* 🏛️ TITULAR DE AUTORIDAD (Gallo Scaling) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-14 space-y-8"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-brand-noir leading-[1.05] tracking-tight">
             Reservas Directas. <br />
             <span className="text-brand-green italic">Soberanía Total.</span>
          </h1>
          <p className="text-lg md:text-xl text-brand-noir/50 max-w-2xl mx-auto font-light leading-relaxed tracking-wide">
            Digitalizamos la hostelería de Granada con infraestructuras de alto rendimiento. <br /> 
            <span className="text-brand-noir font-semibold">Sin comisiones. Sin intermediarios. Solo ingeniería de ventas.</span>
          </p>
        </motion.div>

        {/* 💎 CTA INDUSTRIAL */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col items-center gap-12"
        >
          <button 
            onClick={() => onWhatsAppClick("SOLICITAR AUDITORÍA ARQUITECTO V6.0.")}
            className="btn-nuclear shadow-2xl hover:shadow-brand-amber/20 active:scale-95"
          >
            Activar mi Estructura
          </button>
          
          <div className="flex flex-wrap justify-center gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-brand-green/60">
            <span className="flex items-center gap-2"><Check size={14} className="text-brand-amber" /> ROI Auditado</span>
            <span className="flex items-center gap-2"><Check size={14} className="text-brand-amber" /> Código Propietario</span>
            <span className="flex items-center gap-2"><Check size={14} className="text-brand-amber" /> Soporte Senior</span>
          </div>
        </motion.div>

        {/* 🖼️ HERO ASSET (Clean Inset — Standard Vora) */}
        <motion.div 
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 relative h-[350px] md:h-[550px] w-full max-w-4xl mx-auto overflow-hidden rounded-[2.5rem] shadow-elite group"
        >
          <Image 
            src="/hero-andalucia.png" 
            alt="Arquitectura Hostelería Granada" 
            fill
            className="object-cover transition-transform duration-2000 group-hover:scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bone/60 via-transparent to-transparent opacity-40" />
        </motion.div>
      </div>

    </section>
  );
}
