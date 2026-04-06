import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FDFCF8] text-gray-900 font-sans selection:bg-[#FF4500] selection:text-white">
      
      {/* NAVBAR (TRANSPARENT OVER HERO) */}
      <nav className="absolute top-0 w-full z-50 border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="flex justify-between items-center py-5 px-8 max-w-7xl mx-auto">
          <div className="text-2xl font-black tracking-tighter text-white">
            Architect<span className="text-[#FF4500]">.Sys</span>
          </div>
          <a href="https://wa.me/34611499674?text=Hola,%20quiero%20solicitar%20la%20Auditoría%20Gratuita." className="hidden md:inline-flex bg-[#FF4500] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-orange-600 transition-all shadow-lg">
            Auditoría Gratuita
          </a>
        </div>
      </nav>

      {/* SECTION 1: THE CINEMATIC HOOK (IMMERSIVE) */}
      <header className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Immersive Background */}
        <div className="absolute inset-0 w-full h-full">
          <img src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1920" alt="Restaurante lleno" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Visceral Copy */}
          <div className="text-white space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-[#FF4500] text-sm font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-[#FF4500] animate-pulse"></span>
              Mesas llenas. Cero estrés.
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight">
              Tú cocina. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4500] to-orange-400">Nosotros llenamos <br/> el local.</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-lg leading-relaxed font-medium">
              El teléfono suena, tú estás sirviendo platos y pierdes 150€ en reservas. Instalamos un recepcionista virtual en tu WhatsApp que atiende y cierra mesas mientras tú trabajas.
            </p>
            
            <div className="pt-4">
              <a href="https://wa.me/34611499674?text=Hola,%20quiero%20ver%20cómo%20funciona." className="inline-flex items-center justify-center gap-3 bg-[#FF4500] text-white px-10 py-5 rounded-full text-xl font-bold shadow-[0_0_40px_rgba(255,69,0,0.4)] hover:-translate-y-1 hover:shadow-[0_0_60px_rgba(255,69,0,0.6)] transition-all duration-300">
                Ver demostración en vivo
              </a>
            </div>
          </div>

          {/* Right: CSS iPhone WhatsApp Mockup (Proof of Value) */}
          <div className="hidden lg:flex justify-end relative">
            <div className="relative w-[320px] h-[650px] bg-white rounded-[3rem] border-[12px] border-gray-900 shadow-2xl overflow-hidden flex flex-col transform rotate-2 hover:rotate-0 transition-transform duration-500">
              {/* Notch */}
              <div className="absolute top-0 inset-x-0 h-6 bg-gray-900 rounded-b-3xl w-40 mx-auto z-20"></div>
              
              {/* WhatsApp Header */}
              <div className="bg-[#075E54] pt-12 pb-4 px-4 text-white flex items-center gap-3 shadow-md z-10">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">🤖</div>
                <div>
                  <div className="font-bold">Recepcionista IA</div>
                  <div className="text-xs text-white/70">En línea</div>
                </div>
              </div>

              {/* Chat Body */}
              <div className="flex-1 bg-[#E5DDD5] p-4 flex flex-col gap-4 overflow-hidden relative">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
                
                {/* Chat Bubbles */}
                <div className="relative bg-white p-3 rounded-xl rounded-tl-none self-start shadow-sm text-sm max-w-[85%] animate-fade-in-up">
                  Hola, el viernes estaba a tope, ¿tenéis mesa para 4 esta noche a las 21:30?
                  <div className="text-[10px] text-gray-400 text-right mt-1">20:15</div>
                </div>
                
                <div className="relative bg-[#DCF8C6] p-3 rounded-xl rounded-tr-none self-end shadow-sm text-sm max-w-[85%] mt-2 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
                  ¡Hola! Soy el asistente del restaurante. Sí, tengo una mesa libre para 4 personas a las 21:30. ¿A qué nombre la reservo? 🍽️
                  <div className="text-[10px] text-gray-500 text-right mt-1">20:15</div>
                </div>

                <div className="relative bg-white p-3 rounded-xl rounded-tl-none self-start shadow-sm text-sm max-w-[85%] mt-2 animate-fade-in-up" style={{animationDelay: '1.5s'}}>
                  A nombre de Carlos. ¡Genial!
                  <div className="text-[10px] text-gray-400 text-right mt-1">20:16</div>
                </div>

                <div className="relative bg-[#DCF8C6] p-3 rounded-xl rounded-tr-none self-end shadow-sm text-sm max-w-[85%] mt-2 animate-fade-in-up" style={{animationDelay: '2.5s'}}>
                  Perfecto Carlos. Reserva confirmada para hoy a las 21:30 (4 pax). ¡Os esperamos! ✅
                  <div className="text-[10px] text-gray-500 text-right mt-1">20:16</div>
                </div>
              </div>

              {/* Chat Input */}
              <div className="bg-gray-100 p-3 flex gap-2 items-center">
                <div className="flex-1 bg-white rounded-full h-10 border border-gray-200"></div>
                <div className="w-10 h-10 bg-[#00A884] rounded-full flex items-center justify-center text-white shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                </div>
              </div>
            </div>
            
            {/* Floating Element */}
            <div className="absolute -left-10 bottom-20 bg-white p-4 rounded-2xl shadow-2xl border border-gray-100 flex items-center gap-4 animate-bounce">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl">💰</div>
              <div>
                <div className="text-sm text-gray-500 font-bold">Reserva Cerrada</div>
                <div className="text-lg font-black">+ 120€</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* SECTION 2: THE PAIN (RESTORED & POLISHED) */}
      <section className="bg-white py-32 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl lg:text-5xl font-black text-center mb-20 max-w-4xl mx-auto">¿Te suena familiar esta <span className="text-red-500">pesadilla?</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-[#FDFCF8] p-10 rounded-[2rem] border border-gray-100 hover:shadow-xl transition-all">
              <div className="text-4xl mb-6">📉</div>
              <h3 className="text-2xl font-bold mb-4">El Martes Vacío</h3>
              <p className="text-gray-600 leading-relaxed text-lg">Gastas luz, pagas nóminas, pero el local está a la mitad. Necesitas que tus clientes vuelvan sin tener que rogarles por Instagram.</p>
            </div>
            <div className="bg-[#FDFCF8] p-10 rounded-[2rem] border border-gray-100 hover:shadow-xl transition-all">
              <div className="text-4xl mb-6">👻</div>
              <h3 className="text-2xl font-bold mb-4">El Teléfono Fantasma</h3>
              <p className="text-gray-600 leading-relaxed text-lg">Viernes, 21:00h. Local a tope. El teléfono suena y nadie lo coge. Acabas de perder dinero porque tu personal solo tiene dos manos.</p>
            </div>
            <div className="bg-[#FDFCF8] p-10 rounded-[2rem] border border-gray-100 hover:shadow-xl transition-all">
              <div className="text-4xl mb-6">🛵</div>
              <h3 className="text-2xl font-bold mb-4">El Peaje de Glovo</h3>
              <p className="text-gray-600 leading-relaxed text-lg">Las apps de delivery se quedan con el 30% de tu sudor. Trabajas para ellos, corres para ellos, pero el riesgo lo pones tú.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: VALUE LADDER (RESTORED) */}
      <section className="bg-gray-900 text-white py-32 rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-6xl font-black tracking-tight mb-6">Elige tu arma.</h2>
            <p className="text-xl text-gray-400">Invierte en herramientas que se pagan solas el primer fin de semana.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* DOWNSELL */}
            <div className="bg-[#1A1A1A] p-10 rounded-[2rem] border border-gray-800 flex flex-col">
              <h3 className="font-bold text-3xl mb-2">La Carta Interactiva</h3>
              <div className="text-5xl font-black text-white mb-6">150€</div>
              <ul className="space-y-4 text-gray-400 mb-10 text-lg flex-1">
                <li>✓ Carta Web que da hambre (No un PDF aburrido)</li>
                <li>✓ Códigos QR físicos para tus mesas</li>
                <li>✓ Botón directo a tu WhatsApp</li>
              </ul>
              <a href="https://wa.me/34611499674?text=Hola,%20me%20interesa%20La%20Carta%20Interactiva%20de%20150€." className="block text-center w-full bg-white text-black py-4 rounded-full font-bold hover:bg-gray-200 transition-colors text-lg">Empezar por lo básico</a>
            </div>

            {/* HIGH TICKET */}
            <div className="bg-[#FF4500] p-10 rounded-[2rem] shadow-2xl relative flex flex-col transform md:-translate-y-6">
              <div className="absolute -top-4 right-10 bg-white text-[#FF4500] px-4 py-1 rounded-full text-sm font-black tracking-wide uppercase shadow-sm">El Sistema Completo</div>
              <h3 className="font-bold text-3xl mb-2 text-white">El Recepcionista 24/7</h3>
              <div className="text-5xl font-black text-white mb-6">350€</div>
              <ul className="space-y-4 text-white/90 mb-10 text-lg flex-1">
                <li className="font-bold text-white">✓ Tu Web Premium Persuasiva</li>
                <li className="font-bold text-white">✓ Agente de IA en tu WhatsApp</li>
                <li className="font-bold text-white">✓ Cierra Reservas en Piloto Automático</li>
              </ul>
              <a href="https://wa.me/34611499674?text=Hola,%20quiero%20el%20sistema%20del%20Recepcionista%2024/7%20en%20mi%20WhatsApp%20por%20350€." className="block text-center w-full bg-gray-900 text-white py-5 rounded-full font-black hover:bg-black transition-colors shadow-lg text-lg">Llenar mis mesas hoy</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
