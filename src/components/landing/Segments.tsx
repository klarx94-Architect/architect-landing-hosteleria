"use client";

import { motion } from "framer-motion";
import { Beer, Utensils, Package, ShieldCheck, Star } from "lucide-react";

const segments = [
  { 
    icon: <Beer size={24} />, 
    title: "BARES Y CAFETERÍAS", 
    desc: "Digitalización de flujo rápido. Dominio .es exclusivo y motor de reservas directas sin dependencias externas.",
    highlight: "Soberanía"
  },
  { 
    icon: <Utensils size={24} />, 
    title: "RESTAURACIÓN ELITE", 
    desc: "Motor estratégico integrado. Fotografía de autor y posicionamiento local avanzado (SEO Granada).",
    highlight: "Prestigio"
  },
  { 
    icon: <Package size={24} />, 
    title: "OPERATIVA DELIVERY", 
    desc: "Gestión de pedidos propios. Sin comisiones abusivas. Control total de la base de datos de sus clientes.",
    highlight: "Rentabilidad"
  }
];

export default function Segments() {
  return (
    <section className="py-48 bg-white border-t border-brand-green/5 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl">
        
        <div className="text-center mb-32 space-y-8">
           <h2 className="label-senior">
             <Star size={12} className="fill-brand-green" /> Segmentación Nuclear
           </h2>
           <h3 className="text-5xl md:text-7xl font-serif text-brand-noir tracking-tighter leading-tight italic">
             Arquitectura <span className="not-italic text-brand-green font-light uppercase tracking-tighter">Específica</span> <br /> para su Modelo de Negocio.
           </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {segments.map((s, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 1 }}
              className="glass-senior p-12 space-y-10 border-l-[4px] border-l-brand-green/5 hover:border-l-brand-amber transition-all duration-700"
            >
              <div className="text-brand-green opacity-40 group-hover:opacity-100 transition-all duration-700 h-10 w-fit">
                {s.icon}
              </div>
              <div className="space-y-6">
                <span className="text-[10px] font-black tracking-widest text-brand-amber uppercase">{s.highlight}</span>
                <h4 className="text-3xl font-serif text-brand-noir tracking-tighter leading-none">{s.title}</h4>
                <p className="text-brand-noir/50 text-[15px] leading-relaxed font-light italic">
                   &quot;{s.desc}&quot;
                </p>
              </div>
              <div className="pt-10 border-t border-brand-green/5 flex items-center justify-between text-[9px] font-black tracking-[0.2em] text-brand-green/40 uppercase">
                Arquitectura v6.1 // Granada
              </div>
            </motion.div>
          ))}
        </div>

        {/* 🏛️ INDUSTRIAL STANDARD BADGE */}
        <div className="mt-32 flex flex-wrap justify-center gap-12 text-[10px] font-bold uppercase tracking-[0.5em] text-brand-green/30">
           <span className="flex items-center gap-2"><ShieldCheck size={14} /> Security by Architect Sys</span>
           <span className="flex items-center gap-2"><Star size={14} /> Senior Standard 30k</span>
        </div>
      </div>
    </section>
  );
}
