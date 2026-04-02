"use client";

import { motion } from "framer-motion";

const items = [
  "ALTA CONVERSIÓN",
  "SIN COMISIONES",
  "ARCHITECT SYS",
  "DOMINIO LOCAL",
  "GASTRO-TECH",
  "GUERRILLA MARKETING",
  "DISEÑO PREMIUM",
  "RESULTADOS REALES"
];

export default function Marquee() {
  return (
    <div className="relative flex overflow-hidden bg-brand-amber py-4 select-none">
      <motion.div
        animate={{
          x: [0, -1000],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
        className="flex whitespace-nowrap gap-12"
      >
        {[...items, ...items, ...items].map((item, index) => (
          <span 
            key={index} 
            className="text-white font-black text-xl tracking-[0.2em]"
          >
            {item} {index % items.length === 0 ? "☢️" : "⚡"}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
