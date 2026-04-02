"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function CTA({ onWhatsAppClick }: { onWhatsAppClick: (msg: string) => void }) {
  return (
    <section className="py-48 bg-brand-bone overflow-hidden relative border-t border-brand-green/5">
      
      {/* 🖼️ FONDO GEOMÉTRICO (Sutil / Gallo Style) */}
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] border-[1px] border-brand-green rounded-full" />
        <div className="absolute bottom-[-10%] left-[-20%] w-[600px] h-[600px] border-[1px] border-brand-green rounded-full" />
      </div>

      <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-12"
        >
          <h2 className="label-senior mb-12">
            <ShieldCheck size={14} className="fill-brand-green" /> Admisión Selectiva
          </h2>
          
          <h3 className="text-6xl md:text-8xl font-serif text-brand-noir tracking-tighter leading-[0.9] mb-16">
            EL PRECIO <br /> DE LA <br /> <span className="not-italic text-brand-amber font-light uppercase tracking-widest block transform translate-y-6">INACCIÓN.</span>
          </h3>
          
          <p className="text-brand-noir/40 max-w-xl mx-auto mb-20 text-lg font-light italic leading-relaxed tracking-tight">
            &quot;Cada día sin soberanía digital es un día de comisiones regaladas. Reclame su infraestructura hoy mismo o ceda su mercado a la competencia.&quot;
          </p>
          
          <button 
            onClick={() => onWhatsAppClick("SOLICITAR AUDITORÍA NUCLEAR v6.1.")}
            className="btn-nuclear shadow-brands-noir/20"
          >
            Asegurar mi Mercado
          </button>
          
          <div className="mt-20 text-brand-green/20 text-[10px] font-black uppercase tracking-[1em]">Max 3 Proyectos / Mes · Granada Elite</div>
        </motion.div>
      </div>
    </section>
  );
}
