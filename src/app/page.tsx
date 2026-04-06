import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-brand selection:text-white">
      {/* NAVBAR */}
      <nav className="w-full sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-gray-100">
        <div className="flex justify-between items-center py-5 px-8 max-w-7xl mx-auto">
          <div className="text-2xl font-black tracking-tighter text-foreground">
            Architect<span className="text-brand">.Sys</span>
          </div>
          <a href="https://wa.me/34611499674?text=Hola,%20quiero%20solicitar%20la%20Auditoría%20Gratuita%20para%20mi%20negocio." className="hidden md:inline-flex bg-foreground text-background px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-gray-800 transition-all shadow-sm">
            Auditoría Gratuita
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="max-w-7xl mx-auto px-8 pt-20 pb-24 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-brand text-sm font-bold tracking-wide uppercase mb-8">
          <span className="w-2 h-2 rounded-full bg-brand animate-pulse"></span>
          Socio Tecnológico para Hostelería
        </div>
        <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight text-foreground max-w-4xl mb-6">
          Multiplica tus reservas y <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-orange-400">hunde tus comisiones.</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl leading-relaxed font-medium mb-10">
          No te vendemos una página web. Tapamos las fugas de dinero de tu restaurante automatizando reservas, pedidos y atención al cliente. 
        </p>
        <a href="https://wa.me/34611499674?text=Hola,%20quiero%20transformar%20mi%20restaurante%20y%20multiplicar%20mis%20reservas." className="flex items-center justify-center gap-2 bg-brand text-white px-10 py-5 rounded-full text-xl font-bold shadow-float hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
          Analizar mi negocio por WhatsApp
        </a>
      </header>

      {/* AGITATION: PAIN POINTS */}
      <section className="bg-white py-24 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl lg:text-4xl font-black text-center mb-16">¿Te suena familiar esta pesadilla?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center text-2xl font-black">1</div>
              <h3 className="text-xl font-bold">Teléfono colapsado</h3>
              <p className="text-gray-600">Pierdes 1 de cada 3 reservas en hora punta porque tu personal está sirviendo mesas y no puede atender llamadas.</p>
            </div>
            <div className="space-y-4">
              <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center text-2xl font-black">2</div>
              <h3 className="text-xl font-bold">El peaje del Delivery</h3>
              <p className="text-gray-600">Plataformas de terceros se quedan hasta el 30% de tu facturación. Trabajas para ellos, no para ti.</p>
            </div>
            <div className="space-y-4">
              <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center text-2xl font-black">3</div>
              <h3 className="text-xl font-bold">Mesas lentas</h3>
              <p className="text-gray-600">Tus clientes esperan para ver la carta, pedir y pagar. Menos rotación significa menos ingresos al final del día.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTIONS: BUSINESS OUTCOMES */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 w-full">
              <img src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1200" alt="Restaurante Premium" className="w-full rounded-[2rem] shadow-premium object-cover aspect-square border-8 border-white" />
            </div>
            <div className="flex-1 space-y-10">
              <div>
                <h2 className="text-4xl font-black mb-4">Nosotros construimos la solución.</h2>
                <p className="text-lg text-gray-600">Entramos a tu negocio como socios tecnológicos para implementar sistemas que trabajan 24/7 sin pedir vacaciones.</p>
              </div>
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold text-brand mb-2">Atención Automática (Agente IA)</h3>
                  <p className="text-gray-600">Un recepcionista virtual en tu WhatsApp que responde dudas del menú y anota reservas al instante. Cero llamadas perdidas.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold text-brand mb-2">Tu Propio Canal de Ventas</h3>
                  <p className="text-gray-600">Sistema de pedidos online sin comisiones. Recupera el control de tus clientes y aumenta tu margen de beneficio.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE LADDER */}
      <section className="bg-foreground text-background py-32 rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight">Soluciones a tu medida</h2>
            <p className="text-xl text-gray-400">Invierte en sistemas que se pagan solos en el primer mes.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#1A1A1A] p-10 rounded-[2rem] border border-gray-800">
              <h3 className="font-bold text-2xl mb-2">Eficiencia Básica</h3>
              <div className="text-5xl font-black text-white mb-6">150€</div>
              <ul className="space-y-4 text-gray-400 mb-10 text-lg">
                <li>✓ Carta Digital Inteligente</li>
                <li>✓ Códigos QR en mesas</li>
                <li>✓ Presencia en Google</li>
              </ul>
              <a href="https://wa.me/34611499674?text=Hola,%20me%20interesa%20la%20Carta%20Digital%20PRO%20de%20150€." className="block text-center w-full bg-white text-black py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">Solicitar</a>
            </div>

            <div className="bg-brand p-10 rounded-[2rem] shadow-2xl relative transform md:-translate-y-8 flex flex-col">
              <div className="absolute -top-4 right-10 bg-white text-brand px-4 py-1 rounded-full text-sm font-black tracking-wide uppercase shadow-sm">Máxima Rentabilidad</div>
              <h3 className="font-bold text-2xl mb-2 text-white">Piloto Automático</h3>
              <div className="text-5xl font-black text-white mb-6">350€</div>
              <ul className="space-y-4 text-white/90 mb-10 text-lg flex-1">
                <li className="font-bold text-white">✓ Web Premium Persuasiva</li>
                <li className="font-bold text-white">✓ Agente IA en WhatsApp</li>
                <li className="font-bold text-white">✓ Motor de Reservas 24/7</li>
              </ul>
              <a href="https://wa.me/34611499674?text=Hola,%20necesito%20hablar%20con%20un%20experto%20sobre%20el%20Sistema%20de%20Reservas%20IA%20de%20350€." className="block text-center w-full bg-foreground text-white py-4 rounded-full font-black hover:bg-black transition-colors shadow-lg">Hablar con un experto</a>
            </div>

            <div className="bg-[#1A1A1A] p-10 rounded-[2rem] border border-gray-800">
              <h3 className="font-bold text-2xl mb-2">Dark Kitchen</h3>
              <div className="text-5xl font-black text-white mb-6">Custom</div>
              <ul className="space-y-4 text-gray-400 mb-10 text-lg">
                <li>✓ Marcas Virtuales Propias</li>
                <li>✓ Delivery Sin Comisiones</li>
                <li>✓ Automatización Integral</li>
              </ul>
              <a href="https://wa.me/34611499674?text=Hola,%20quiero%20agendar%20una%20consultoría%20para%20una%20Dark%20Kitchen." className="block text-center w-full bg-white text-black py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">Agendar Consultoría</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
