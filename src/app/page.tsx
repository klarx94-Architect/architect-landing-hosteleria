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

      {/* HERO SECTION: THE HOOK */}
      <header className="max-w-7xl mx-auto px-8 pt-20 pb-24 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-brand text-sm font-bold tracking-wide uppercase mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-brand animate-pulse"></span>
          Sistemas Automáticos para Hostelería
        </div>
        <h1 className="text-5xl lg:text-7xl font-black leading-[1.05] tracking-tight text-foreground max-w-5xl mb-6">
          Llenamos tus mesas los martes. <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-orange-500">Y blindamos tus fines de semana.</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl leading-relaxed font-medium mb-10">
          Sin trucos de marketing. Implementamos asistentes virtuales en tu WhatsApp y cartas digitales interactivas para que tu personal deje de correr y empiece a facturar.
        </p>
        <a href="https://wa.me/34611499674?text=Hola,%20quiero%20ver%20una%20demostración%20del%20sistema%20en%20mi%20WhatsApp." className="flex items-center justify-center gap-3 bg-brand text-white px-10 py-5 rounded-full text-xl font-bold shadow-float hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
          Ver demostración en WhatsApp
        </a>
      </header>

      {/* THE PAIN: WHY THEY CAN'T SLEEP */}
      <section className="bg-white py-24 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl lg:text-5xl font-black text-center mb-16 max-w-4xl mx-auto">¿Te suena familiar esta <span className="text-red-500">pesadilla?</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path></svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">El Martes Vacío</h3>
              <p className="text-gray-600 leading-relaxed">Gastas luz, pagas nóminas, pero el local está a la mitad. Necesitas que tus clientes habituales vuelvan más a menudo sin rogarles.</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">El Teléfono Fantasma</h3>
              <p className="text-gray-600 leading-relaxed">Viernes, 21:00h. Local a tope. El teléfono suena y nadie lo coge. Acabas de perder 150€ en reservas porque tu personal solo tiene dos manos.</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">La Carta de Papel Manchada</h3>
              <p className="text-gray-600 leading-relaxed">Camareros perdiendo 15 minutos explicando platos. Clientes desesperados. Menos rotación de mesas significa menos ingresos al cierre.</p>
            </div>
          </div>
        </div>
      </section>

      {/* THE SOLUTION: BENTO BOX LAYOUT */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-black mb-6">Nosotros traemos la solución.</h2>
            <p className="text-xl text-gray-600">Sistemas que trabajan 24/7. Tú cocinas, nosotros llenamos el local.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Bento 1: WhatsApp AI */}
            <div className="lg:col-span-2 bg-[#1A1A1A] rounded-[2rem] p-10 relative overflow-hidden group">
              <div className="relative z-10 w-full md:w-1/2 text-white">
                <h3 className="text-3xl font-bold mb-4">El Recepcionista que no duerme.</h3>
                <p className="text-gray-400 text-lg mb-8">Un agente de Inteligencia Artificial conectado a tu WhatsApp. Responde dudas, envía la carta y anota reservas en automático. Cero llamadas perdidas.</p>
              </div>
              <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000" alt="WhatsApp Chat" className="absolute right-0 top-0 w-1/2 h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700" />
            </div>

            {/* Bento 2: Digital Menu */}
            <div className="bg-brand rounded-[2rem] p-10 relative overflow-hidden text-white group">
              <h3 className="text-2xl font-bold mb-4">Menús que dan hambre.</h3>
              <p className="text-white/80 text-lg mb-8">Códigos QR elegantes. Fotos que venden solas. Pedidos directos sin intermediarios.</p>
              <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800" alt="Restaurant QR" className="absolute -bottom-10 -right-10 w-64 h-64 object-cover rounded-full border-8 border-brand/50 group-hover:scale-110 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* FOMO / SOCIAL PROOF */}
      <section className="bg-orange-50 py-20 border-y border-orange-100">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-black text-foreground mb-6">Mientras tú usas papel y boli, tu competencia ya es digital.</h2>
          <p className="text-xl text-gray-700 italic font-medium">"Antes perdíamos 30 llamadas a la semana. Hoy, el sistema de WhatsApp nos cierra 12 reservas automáticas al día sin tocar el teléfono."</p>
          <div className="mt-6 font-bold text-brand">— Datos proyectados de nuestros Ecosistemas Hosteleros</div>
        </div>
      </section>

      {/* VALUE LADDER */}
      <section className="bg-foreground text-background py-32 rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight">Elige tu arma de facturación</h2>
            <p className="text-xl text-gray-400">Invierte en un sistema que se paga solo con las reservas del primer fin de semana.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#1A1A1A] p-10 rounded-[2rem] border border-gray-800">
              <h3 className="font-bold text-2xl mb-2">La Carta que Vende</h3>
              <div className="text-5xl font-black text-white mb-6">150€</div>
              <ul className="space-y-4 text-gray-400 mb-10 text-lg">
                <li>✓ Carta Web Interactiva (No un PDF aburrido)</li>
                <li>✓ Códigos QR físicos para tus mesas</li>
                <li>✓ Autogestionable desde tu móvil</li>
              </ul>
              <a href="https://wa.me/34611499674?text=Hola,%20me%20interesa%20implementar%20La%20Carta%20que%20Vende%20por%20150€." className="block text-center w-full bg-white text-black py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">Empezar a digitalizar</a>
            </div>

            <div className="bg-brand p-10 rounded-[2rem] shadow-2xl relative transform md:-translate-y-8 flex flex-col">
              <div className="absolute -top-4 right-10 bg-white text-brand px-4 py-1 rounded-full text-sm font-black tracking-wide uppercase shadow-sm">El más pedido</div>
              <h3 className="font-bold text-2xl mb-2 text-white">El Recepcionista 24/7</h3>
              <div className="text-5xl font-black text-white mb-6">350€</div>
              <ul className="space-y-4 text-white/90 mb-10 text-lg flex-1">
                <li className="font-bold text-white">✓ Tu Web Persuasiva para captar</li>
                <li className="font-bold text-white">✓ Agente de IA conectado a WhatsApp</li>
                <li className="font-bold text-white">✓ Gestión Automática de Reservas</li>
              </ul>
              <a href="https://wa.me/34611499674?text=Hola,%20quiero%20el%20sistema%20del%20Recepcionista%2024/7%20en%20mi%20WhatsApp%20por%20350€." className="block text-center w-full bg-foreground text-white py-4 rounded-full font-black hover:bg-black transition-colors shadow-lg">Llenar mis mesas</a>
            </div>

            <div className="bg-[#1A1A1A] p-10 rounded-[2rem] border border-gray-800">
              <h3 className="font-bold text-2xl mb-2">Delivery Sin Comisiones</h3>
              <div className="text-5xl font-black text-white mb-6">Custom</div>
              <ul className="space-y-4 text-gray-400 mb-10 text-lg">
                <li>✓ Tu propio sistema de pedidos</li>
                <li>✓ Cero comisiones a plataformas</li>
                <li>✓ Perfecto para Dark Kitchens</li>
              </ul>
              <a href="https://wa.me/34611499674?text=Hola,%20quiero%20crear%20mi%20propio%20sistema%20de%20Delivery%20sin%20comisiones." className="block text-center w-full bg-white text-black py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">Agendar Auditoría</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
