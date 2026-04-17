import React from 'react';

/**
 * src/components/DarkKitchen.tsx
 * Sección de ecosistema Dark Kitchen refactorizada.
 * Filosofía Comercial: Atacando el dolor de activos ociosos y comisiones.
 * Protocolo: Anti-Monolito (Modularización).
 */

export default function DarkKitchen() {
  return (
    <section className="py-24 bg-white border-y border-gray-100 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl opacity-50 -mr-32 -mt-32"></div>
      
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-20 space-y-6">
          <div className="text-[#FF4500] font-bold tracking-widest uppercase flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-[#FF4500] rounded-full animate-pulse"></span> Activos Ociosos
          </div>
          <h2 className="text-4xl lg:text-7xl font-black leading-tight text-gray-900">
            Si tu plancha no echa humo,<br/> estás perdiendo dinero.
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            ¿Alquiler pagado y cocina vacía de 17:00 a 20:00? Un error comercial imperdonable. Pon a trabajar tus herramientas mientras el salón descansa.
          </p>
        </div>

        {/* --- CALCULADOR DE HEMORRAGIA --- */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            <div className="bg-red-50 p-8 rounded-3xl border border-red-100 flex items-center justify-between group hover:bg-red-100 transition-colors">
                <div>
                    <p className="text-red-600 font-bold uppercase text-[10px] tracking-[0.2em] mb-2">Vía Apps (Glovo/Uber)</p>
                    <p className="text-2xl font-black text-gray-900 tracking-tight">Facturar 10.000€</p>
                </div>
                <div className="text-right">
                    <p className="text-red-600 font-black text-3xl transition-transform group-hover:scale-110">- 3.000€</p>
                    <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-1">Hemorragia de Comisiones</p>
                </div>
            </div>
            <div className="bg-green-50 p-8 rounded-3xl border-2 border-green-500 flex items-center justify-between shadow-lg shadow-green-500/10 hover:bg-green-100 transition-colors">
                <div>
                    <p className="text-green-600 font-bold uppercase text-[10px] tracking-[0.2em] mb-2">Tu Propia App Architect.Sys</p>
                    <p className="text-2xl font-black text-gray-900 tracking-tight">Facturar 10.000€</p>
                </div>
                <div className="text-right">
                    <p className="text-green-600 font-black text-3xl">0€</p>
                    <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest mt-1">Margen Intacto</p>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-[#FDFCF8] p-8 rounded-[2rem] border border-gray-200 group hover:border-[#FF4500] hover:shadow-2xl transition-all duration-500 flex flex-col">
            <div className="w-16 h-16 bg-orange-100 text-[#FF4500] rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">🍔</div>
            <h3 className="text-2xl font-bold mb-4">Marcas Virtuales</h3>
            <p className="text-gray-600 flex-1 leading-relaxed">
                Utiliza tus mismos ingredientes para crear marcas que solo existen online. <strong className="text-gray-900">Maximiza tu flujo de caja</strong> sin contratar más personal ni pagar más luz.
            </p>
          </div>
          
          <div className="bg-[#FDFCF8] p-8 rounded-[2rem] border border-gray-200 group hover:border-[#FF4500] hover:shadow-2xl transition-all duration-500 flex flex-col">
            <div className="w-16 h-16 bg-orange-100 text-[#FF4500] rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">🛵</div>
            <h3 className="text-2xl font-bold mb-4">App & Flota Directa</h3>
            <p className="text-gray-600 flex-1 leading-relaxed">
                Independencia total de las plataformas. El dinero entra a tu cuenta al instante. <strong className="text-gray-900">Tú eres el dueño del cliente</strong>, no una base de datos externa.
            </p>
          </div>

          <div className="bg-[#FDFCF8] p-8 rounded-[2rem] border border-gray-200 group hover:border-[#FF4500] hover:shadow-2xl transition-all duration-500 flex flex-col">
            <div className="w-16 h-16 bg-orange-100 text-[#FF4500] rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">📊</div>
            <h3 className="text-2xl font-bold mb-4">Retorno Predictivo</h3>
            <p className="text-gray-600 flex-1 leading-relaxed">
                CRM de hostelería inteligente. Lanzaremos ofertas automáticas por WhatsApp para <strong className="text-gray-900">llenar los días de flojos de lluvia</strong> basándonos en historial real.
            </p>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <a href="https://wa.me/34611499674?text=Hola,%20quiero%20detener%20la%20fuga%20de%20comisiones%20y%20activar%20mi%20Dark%20Kitchen." className="inline-block bg-gray-900 text-white px-12 py-6 rounded-full font-black text-2xl hover:bg-[#FF4500] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(255,69,0,0.3)] transition-all duration-300">
            Detener la fuga de comisiones ahora
          </a>
        </div>
      </div>
    </section>
  );
}
