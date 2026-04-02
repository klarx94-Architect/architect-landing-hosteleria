"use client";

import Hero from "@/components/landing/Hero";
import Segments from "@/components/landing/Segments";
import Pricing from "@/components/landing/Pricing";
import Process from "@/components/landing/Process";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

const WHATSAPP_NUMBER = "34611499674";

export default function Home() {
  const openWhatsApp = (msg: string) => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <main className="flex-1 overflow-x-hidden selection:bg-brand-amber selection:text-white bg-brand-bone">
      {/* 🏺 NUCLEAR ARCHITECT v6.1 // ARQUITECTURA SENIOR INMACULADA */}
      <Hero onWhatsAppClick={openWhatsApp} />
      <Segments />
      <Pricing onWhatsAppClick={openWhatsApp} />
      <Process />
      <CTA onWhatsAppClick={openWhatsApp} />
      <Footer WHATSAPP_NUMBER={WHATSAPP_NUMBER} />
      {/* 🏺 NUCLEAR ARCHITECT v6.1 // END */}
    </main>
  );
}
