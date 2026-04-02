"use client";

import { motion } from "framer-motion";
import { Search, Rocket, ShieldCheck } from "lucide-react";

const steps = [
  { icon: <Search size={22} />, title: "RECONOCIMIENTO", text: "Auditamos su modelo de negocio y flujo de reservas en 15 minutos. Sin protocolos comerciales. Solo ingeniería de producto." },
  { icon: <Rocket size={22} />, title: "DESPLIEGUE SENIOR", text: "En 5 días laborables su infraestructura estará operativa. Si el diseño no es de vanguardia, el proyecto se detiene." },
  { icon: <ShieldCheck size={22} />, title: "PROPIEDAD TOTAL", text: "Entrega de soberanía técnica. Sin comisiones eternas. El cliente es dueño absoluto de su entorno digital." }
];

export default function Process() {
  return (
    <section className="py-48 bg-white overflow-hidden relative border-t border-brand-green/5">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-32 items-start">
          
          <div className="sticky top-40 space-y-12">
             <h2 className="label-senior">
               Ingeniería de Procesos
             </h2>
             <h3 className="text-5xl md:text-8xl font-serif text-brand-noir leading-[1.05]">Protocolo <br /> <span className="not-italic text-brand-amber font-light tracking-tighter uppercase text-4xl mt-6 block">Nuclear // v6.1</span></h3>
             <p className="text-brand-noir/40 text-lg font-light leading-relaxed max-w-xs italic tracking-tight">
                &quot;No somos una agencia. Somos arquitectos de infraestructuras de alto impacto. Nuestra metodología es binaria: éxito o retirada.&quot;
             </p>
             <div className="pt-10">
                <div className="w-16 h-[2px] bg-brand-amber shadow-2xl" />
             </div>
          </div>

          <div className="space-y-48">
            {steps.map((s, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative group border-l-[1px] border-brand-green/10 pl-16 space-y-8"
              >
                <div className="text-[14vw] font-serif text-brand-green opacity-[0.03] absolute -left-12 -top-16 pointer-events-none group-hover:opacity-[0.06] transition-all duration-1000 tracking-tighter italic select-none">
                  0{idx + 1}
                </div>
                <div className="text-brand-amber p-3 bg-brand-amber/5 w-fit rounded-lg shadow-sm border border-brand-amber/10 group-hover:bg-brand-noir group-hover:text-white transition-all duration-700">
                  {s.icon}
                </div>
                <h4 className="text-3xl font-serif text-brand-noir tracking-tight leading-none group-hover:text-brand-green transition-colors duration-700 uppercase">{s.title}</h4>
                <p className="text-brand-noir/50 text-[17px] leading-relaxed font-light tracking-normal max-w-md italic">
                   &quot;{s.text}&quot;
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
