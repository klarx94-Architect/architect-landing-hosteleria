import React from 'react';

export const metadata = {
  title: "Condiciones del Servicio | Architect.Sys",
  description: "Términos y condiciones de uso de la plataforma de automatización y servicios digitales de Architect.Sys.",
  alternates: { canonical: 'https://hosteleria.architectsys.com/terms' }
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#FDFCF8] text-zinc-900 font-sans p-8 md:p-24 selection:bg-[#FF4500] selection:text-white">
      <div className="max-w-3xl mx-auto">
        <header className="mb-16 border-b border-zinc-100 pb-8 text-center md:text-left">
          <h1 className="text-sm font-black uppercase tracking-[0.3em] text-[#FF4500] mb-4">Protocolo de Servicio</h1>
          <p className="text-4xl md:text-5xl font-black tracking-tighter">Condiciones del Servicio</p>
          <p className="text-zinc-400 mt-4 font-medium">Última actualización: 21 de Abril, 2026</p>
        </header>

        <section className="space-y-12 leading-relaxed text-zinc-600">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 mb-4">1. Aceptación de Términos</h2>
            <p>
              Al utilizar los servicios de automatización de Architect.Sys (vía WhatsApp o Web), 
              el usuario acepta estas condiciones. Los servicios están diseñados para la gestión 
              de reservas y comunicación comercial automatizada.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-zinc-900 mb-4">2. Uso de la IA y Automatización</h2>
            <p>
              Nuestra plataforma utiliza tecnología de Inteligencia Artificial para responder consultas. 
              Aunque el sistema está calibrado para ser preciso, las confirmaciones finales de reserva 
              están sujetas a la disponibilidad real del establecimiento gestor.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-zinc-900 mb-4">3. Responsabilidad del Usuario</h2>
            <p>
              El usuario se compromete a proporcionar información veraz y a no utilizar el canal de 
              automatización para fines ilícitos o envío de spam.
            </p>
          </div>

          <div className="bg-zinc-900 text-white p-8 rounded-[2rem] shadow-xl">
            <h2 className="text-xl font-bold mb-4">Aviso de Facturación</h2>
            <p className="text-zinc-400 text-sm">
              Los servicios de Architect.Sys pueden incluir cargos por mantenimiento de IA o gestión 
              publicitaria, los cuales habrán sido acordados previamente mediante factura comercial 
              independiente.
            </p>
          </div>
        </section>

        <footer className="mt-24 pt-12 border-t border-zinc-100 text-center">
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">© Architect.Sys Ecosystem | Secure Node</p>
        </footer>
      </div>
    </div>
  );
}
