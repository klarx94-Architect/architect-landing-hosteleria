"use client";

import { motion } from "framer-motion";
import { Check, Star, Zap } from "lucide-react";

const products = [
  { 
    title: "CARTA SENIOR", 
    price: "150€", 
    tag: "Infraestructura Base",
    features: ["PWA de Alto Rendimiento", "QR Dinámicos Inteligentes", "Alojamiento Premium .es", "SEO Local Granada"] 
  },
  { 
    title: "SISTEMA INTEGRAL", 
    price: "350€", 
    tag: "Prestigio & Ventas",
    popular: true,
    features: ["Motor de Reservas Propio", "Gestión Mensajes Directos", "Fotografía IA Gourmet", "Base de Datos de Clientes"] 
  },
  { 
    title: "PEDIDOS DIRECTOS", 
    price: "250€", 
    tag: "Delivery & Take Away",
    features: ["Venta Directa sin Comisiones", "Router Pro a WhatsApp", "Gestión Menú Dinámica", "Soporte Senior"] 
  }
];

export default function Pricing({ onWhatsAppClick }: { onWhatsAppClick: (msg: string) => void }) {
  return (
    <section className="py-48 bg-brand-bone relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl">
        
        <div className="text-center mb-32 space-y-8">
           <h2 className="label-senior">
             <Zap size={12} className="fill-brand-amber text-brand-amber" /> Inversión Estratégica
           </h2>
           <h3 className="text-5xl md:text-8xl font-serif text-brand-noir leading-[1.05]">
             Precisión <span className="text-brand-amber italic">Financiera.</span> <br /> 
             <span className="text-brand-green font-light uppercase tracking-tighter text-4xl mt-6 block underline-none decoration-brand-amber decoration-1 underline-offset-8">Modelos de Pago Único // Sin Intermediarios.</span>
           </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {products.map((p, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className={`
                glass-senior p-12 flex flex-col gap-10 relative
                ${p.popular ? "border-brand-amber/30 scale-105 z-10 bg-white" : "opacity-90"}
              `}
            >
              <div className="flex justify-between items-start">
                 <span className="text-[10px] font-black text-brand-green uppercase tracking-[0.2em]">{p.tag}</span>
                 {p.popular && <Star size={16} className="text-brand-amber fill-brand-amber" />}
              </div>

              <div className="space-y-4 pt-4 border-t border-brand-green/5">
                <h4 className="text-3xl font-serif text-brand-noir tracking-tighter leading-none">{p.title}</h4>
                <div className="flex items-baseline gap-2">
                   <span className="text-5xl md:text-6xl font-serif text-brand-noir/80 tracking-tighter leading-none">{p.price}</span>
                   <span className="text-[10px] font-black text-brand-green/20 uppercase tracking-widest italic">Pago Único</span>
                </div>
              </div>

              <div className="space-y-6 flex-1 pt-6 border-t border-brand-green/5">
                {p.features.map((f, i) => (
                  <div key={i} className="flex gap-4 items-start text-[13.5px] font-medium tracking-tight text-brand-noir/40 leading-relaxed italic">
                    <Check size={16} className="text-brand-amber shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => onWhatsAppClick(`SISTEMA WHITE PRECISION: ${p.title}`)}
                className={`
                  w-full py-5 text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-700
                  ${p.popular ? "bg-brand-noir text-white shadow-lg hover:bg-brand-amber" : "bg-brand-green/5 text-brand-green hover:bg-brand-noir hover:text-white"}
                `}
              >
                Activar Estructura
              </button>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-24 text-center">
           <p className="text-brand-noir/20 text-[10px] font-bold uppercase tracking-[0.6em]">Consulte Planes de Soporte Senior // Architect Sys</p>
        </div>
      </div>
    </section>
  );
}
