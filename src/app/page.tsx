import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] font-sans">
      {/* 1. NAVBAR */}
      <nav className="w-full flex justify-between items-center px-6 py-6 max-w-7xl mx-auto">
        <div className="font-serif text-xl font-bold">Architect.Sys</div>
        <a 
          href="https://wa.me/34611499674" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-[#81B29A] text-white px-5 py-2 rounded-md font-medium shadow-sm hover:bg-opacity-90 transition-all"
        >
          Hablemos hoy
        </a>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="px-6 py-12 md:py-24 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-20">
        <div className="flex-1 space-y-6 md:space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight">
            Llenamos tus mesas y automatizamos tus pedidos.
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-lg">
            Sistemas digitales de autor para hostelería inteligente. Desde cartas digitales hasta la transformación de tu local en una Dark Kitchen rentable.
          </p>
          <a 
            href="https://wa.me/34611499674" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block bg-[#E07A5F] text-white px-8 py-4 rounded-md text-lg font-medium shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            Analizar mi negocio (WhatsApp)
          </a>
        </div>
        <div className="flex-1 w-full relative">
          <img 
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1200" 
            alt="Interior de restaurante elegante" 
            className="w-full h-auto object-cover rounded-xl shadow-xl relative z-10"
          />
        </div>
      </section>

      {/* 3. ESCALERA DE VALOR */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-16 text-[#1A1A1A]">
            Soluciones a medida de tu crecimiento
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-[#FAF9F6] p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col">
              <h3 className="text-xl font-bold font-serif mb-2 text-[#1A1A1A]">Supervivencia Digital</h3>
              <p className="text-2xl font-bold mb-6 text-[#1A1A1A]">150€</p>
              <ul className="space-y-4 text-gray-700 flex-grow mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-[#81B29A] font-bold">✓</span> Carta digital interactiva
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#81B29A] font-bold">✓</span> Códigos QR en mesas
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#81B29A] font-bold">✓</span> Google optimizado
                </li>
              </ul>
              <div className="mt-auto pt-6 border-t border-gray-200">
                <p className="text-sm">
                  <span className="font-semibold text-gray-900">Ideal para:</span> Bares y Cafeterías.
                </p>
              </div>
            </div>

            {/* Card 2 (Destacada) */}
            <div className="bg-white p-8 rounded-xl shadow-2xl border-t-4 border-[#E07A5F] flex flex-col md:-translate-y-4 relative z-10">
              <h3 className="text-xl font-bold font-serif mb-2 text-[#1A1A1A]">Restaurante Automático</h3>
              <p className="text-2xl font-bold mb-6 text-[#1A1A1A]">Desde 350€</p>
              <ul className="space-y-4 text-gray-700 flex-grow mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-[#E07A5F] font-bold">✓</span> Web Premium
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#E07A5F] font-bold">✓</span> Agente IA para reservas 24/7
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#E07A5F] font-bold">✓</span> Botón WhatsApp
                </li>
              </ul>
              <div className="mt-auto pt-6 border-t border-gray-100">
                <p className="text-sm">
                  <span className="font-semibold text-gray-900">Ideal para:</span> Restaurantes medianos.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#FAF9F6] p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col">
              <h3 className="text-xl font-bold font-serif mb-2 text-[#1A1A1A]">Dark Kitchen Revolution</h3>
              <p className="text-2xl font-bold mb-6 text-[#1A1A1A]">Consultoría</p>
              <ul className="space-y-4 text-gray-700 flex-grow mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-[#81B29A] font-bold">✓</span> Sistema propio de pedidos sin comisión
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#81B29A] font-bold">✓</span> Creación de marcas virtuales para tu misma cocina
                </li>
              </ul>
              <div className="mt-auto pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 font-medium">Modelos escalables</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOOTER BASE */}
      <footer className="bg-[#1A1A1A] text-white py-8 text-center px-6">
        <p className="text-sm opacity-80">© 2026 Architect Sys. Diseñado para escalar negocios reales.</p>
      </footer>
    </div>
  );
}
