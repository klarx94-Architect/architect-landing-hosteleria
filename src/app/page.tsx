import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FDFCF8] text-gray-900 font-sans selection:bg-[#FF4500] selection:text-white">
      
      {/* NAVBAR */}
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

      {/* SECTION 1: CINEMATIC HERO (KEPT EXACTLY AS BEFORE) */}
      <header className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 w-full h-full">
          <img src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1920" alt="Restaurante lleno" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
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
          <div className="hidden lg:flex justify-end relative">
            <div className="relative w-[320px] h-[650px] bg-white rounded-[3rem] border-[12px] border-gray-900 shadow-2xl overflow-hidden flex flex-col transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="absolute top-0 inset-x-0 h-6 bg-gray-900 rounded-b-3xl w-40 mx-auto z-20"></div>
              <div className="bg-[#075E54] pt-12 pb-4 px-4 text-white flex items-center gap-3 shadow-md z-10">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">🤖</div>
                <div>
                  <div className="font-bold">Recepcionista IA</div>
                  <div className="text-xs text-white/70">En línea</div>
                </div>
              </div>
              <div className="flex-1 bg-[#E5DDD5] p-4 flex flex-col gap-4 overflow-hidden relative">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
                <div className="relative bg-white p-3 rounded-xl rounded-tl-none self-start shadow-sm text-sm max-w-[85%] animate-fade-in-up">
                  Hola, ¿tenéis mesa para 4 esta noche a las 21:30?
                  <div className="text-[10px] text-gray-400 text-right mt-1">20:15</div>
                </div>
                <div className="relative bg-[#DCF8C6] p-3 rounded-xl rounded-tr-none self-end shadow-sm text-sm max-w-[85%] mt-2 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
                  ¡Hola! Sí, tengo una mesa libre para 4 personas a las 21:30. ¿A qué nombre la reservo? 🍽️
                  <div className="text-[10px] text-gray-500 text-right mt-1">20:15</div>
                </div>
                <div className="relative bg-white p-3 rounded-xl rounded-tl-none self-start shadow-sm text-sm max-w-[85%] mt-2 animate-fade-in-up" style={{animationDelay: '1.5s'}}>
                  A nombre de Carlos.
                  <div className="text-[10px] text-gray-400 text-right mt-1">20:16</div>
                </div>
                <div className="relative bg-[#DCF8C6] p-3 rounded-xl rounded-tr-none self-end shadow-sm text-sm max-w-[85%] mt-2 animate-fade-in-up" style={{animationDelay: '2.5s'}}>
                  Reserva confirmada. ¡Os esperamos! ✅
                  <div className="text-[10px] text-gray-500 text-right mt-1">20:16</div>
                </div>
              </div>
              <div className="bg-gray-100 p-3 flex gap-2 items-center">
                <div className="flex-1 bg-white rounded-full h-10 border border-gray-200"></div>
                <div className="w-10 h-10 bg-[#00A884] rounded-full flex items-center justify-center text-white shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                </div>
              </div>
            </div>
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

      {/* SECTION 2: THE PAIN (KEPT EXACTLY AS BEFORE) */}
      <section className="bg-white py-24 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl lg:text-5xl font-black text-center mb-20 max-w-4xl mx-auto">¿Te suena familiar esta <span className="text-red-500">pesadilla?</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-[#FDFCF8] p-10 rounded-[2rem] border border-gray-100 hover:shadow-xl transition-all">
              <div className="text-4xl mb-6">📉</div>
              <h3 className="text-2xl font-bold mb-4">El Martes Vacío</h3>
              <p className="text-gray-600 leading-relaxed text-lg">Gastas luz, pagas nóminas, pero el local está a la mitad. Necesitas que tus clientes vuelvan sin tener que rogarles.</p>
            </div>
            <div className="bg-[#FDFCF8] p-10 rounded-[2rem] border border-gray-100 hover:shadow-xl transition-all">
              <div className="text-4xl mb-6">👻</div>
              <h3 className="text-2xl font-bold mb-4">El Teléfono Fantasma</h3>
              <p className="text-gray-600 leading-relaxed text-lg">Viernes, 21:00h. El teléfono suena y nadie lo coge. Acabas de perder dinero porque tu personal solo tiene dos manos.</p>
            </div>
            <div className="bg-[#FDFCF8] p-10 rounded-[2rem] border border-gray-100 hover:shadow-xl transition-all">
              <div className="text-4xl mb-6">🛵</div>
              <h3 className="text-2xl font-bold mb-4">El Peaje de Glovo</h3>
              <p className="text-gray-600 leading-relaxed text-lg">Las apps de delivery se quedan con el 30% de tu sudor. Trabajas para ellos, corres para ellos, pero el riesgo lo pones tú.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= NEW SECTIONS INJECTED HERE ================= */}

      {/* SECTION 3: STEP-BY-STEP SYSTEM */}
      <section className="py-24 bg-[#FDFCF8]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-black mb-6">No somos informáticos. Somos tu estrategia comercial.</h2>
            <p className="text-xl text-gray-600">Así es como convertimos tu restaurante en una máquina bien engrasada en solo 3 pasos.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-1 bg-gray-200 z-0"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-white border-4 border-[#FF4500] rounded-full flex items-center justify-center text-3xl font-black text-[#FF4500] shadow-lg mb-6">1</div>
              <h3 className="text-2xl font-bold mb-4">Captación Segura</h3>
              <p className="text-gray-600 text-lg">Optimizamos tu presencia digital para que cuando alguien busque "dónde cenar", tú seas la primera opción irresistible.</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-[#FF4500] rounded-full flex items-center justify-center text-3xl font-black text-white shadow-lg mb-6">2</div>
              <h3 className="text-2xl font-bold mb-4">Cierre Automático</h3>
              <p className="text-gray-600 text-lg">El cliente entra a tu web o WhatsApp. Nuestro Agente de IA atiende, enamora y cierra la reserva o el pedido en segundos.</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center text-3xl font-black text-white shadow-lg mb-6">3</div>
              <h3 className="text-2xl font-bold mb-4">Servicio Impecable</h3>
              <p className="text-gray-600 text-lg">El cliente llega. Escanea un QR elegante, pide más rápido y tu ticket medio sube. Tus camareros solo entregan sonrisas y comida.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: WEB & RESERVATION ENGINE */}
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="text-[#FF4500] font-bold tracking-widest uppercase">Tu Propia Infraestructura</div>
            <h2 className="text-4xl lg:text-5xl font-black leading-tight">Deja de pagarle un peaje a las plataformas de siempre.</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              ¿Por qué pagar 2€ por cada comensal que entra por intermediarios? Te construimos una web premium con un motor de reservas propio. El cliente reserva directamente contigo, los datos son tuyos y el 100% del dinero se queda en tu caja.
            </p>
            <ul className="space-y-4 text-lg font-medium">
              <li className="flex items-center gap-3"><span className="text-green-500 text-2xl">✓</span> Sin comisiones ocultas por reserva.</li>
              <li className="flex items-center gap-3"><span className="text-green-500 text-2xl">✓</span> Base de datos propia para enviar ofertas.</li>
              <li className="flex items-center gap-3"><span className="text-green-500 text-2xl">✓</span> Diseño persuasivo que da hambre al verlo.</li>
            </ul>
            <a href="https://wa.me/34611499674?text=Hola,%20quiero%20mi%20propio%20motor%20de%20reservas%20sin%20comisiones." className="inline-block mt-4 bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-[#FF4500] transition-colors shadow-lg">
              Quiero mi propia web de reservas
            </a>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gray-100 rounded-[3rem] overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1000" alt="Clientes reservando" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 font-bold text-xl">
              Adiós 0% Comisiones
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: QR DIGITAL MENU */}
      <section className="py-24 bg-[#FDFCF8]">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="aspect-[4/3] bg-gray-100 rounded-[3rem] overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1625631980741-118bd31c775a?q=80&w=1000" alt="Carta QR en mesa" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="order-1 lg:order-2 space-y-8">
            <div className="text-[#FF4500] font-bold tracking-widest uppercase">Operativa Rápida</div>
            <h2 className="text-4xl lg:text-5xl font-black leading-tight">La Carta Digital que aumenta tu ticket medio.</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              El papel se ensucia, se rompe y no vende. Implementamos cartas QR interactivas con fotografías de alta calidad. Cuando el cliente ve la foto de tus postres o entrantes, el cerebro reacciona y piden más.
            </p>
            <p className="text-xl text-gray-600 leading-relaxed">
              Además, aceleras el servicio. El cliente se sienta, escanea y sabe qué quiere antes de que el camarero llegue a la mesa. Mesas más rápidas = Más turnos facturados.
            </p>
            <a href="https://wa.me/34611499674?text=Hola,%20quiero%20digitalizar%20mi%20carta%20para%20vender%20más." className="inline-block mt-4 border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-gray-900 hover:text-white transition-colors">
              Digitalizar mi menú hoy
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 6: DARK KITCHEN & DELIVERY */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF4500] rounded-full mix-blend-multiply filter blur-[100px] opacity-40"></div>
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-bold tracking-widest uppercase">
              🚀 Pivote Estratégico
            </div>
            <h2 className="text-4xl lg:text-5xl font-black leading-tight">¿Haces Delivery? Conviértete en una Dark Kitchen.</h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              Estás cocinando a toda velocidad solo para darle el 30% de tus ganancias a los repartidores de siempre. Corta la hemorragia hoy mismo.
            </p>
            <p className="text-xl text-gray-400 leading-relaxed">
              Te montamos tu propio sistema de Delivery de Marca Blanca. Tu web, tus pedidos, tus clientes. Controla los tiempos de entrega, haz promociones directas a su WhatsApp y retén el 100% del margen operativo.
            </p>
            <a href="https://wa.me/34611499674?text=Hola,%20quiero%20montar%20mi%20propio%20sistema%20de%20Delivery/Dark%20Kitchen." className="inline-flex items-center justify-center gap-3 bg-[#FF4500] text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-all">
              Crear mi sistema de Delivery
            </a>
          </div>
          <div className="relative">
            <div className="aspect-square bg-black rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/10">
              <img src="https://images.unsplash.com/photo-1581349485608-9469926a8e5e?q=80&w=1000" alt="Cocina Dark Kitchen" className="w-full h-full object-cover opacity-80" />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================= */}

      {/* SECTION 7: VALUE LADDER (KEPT EXACTLY AS BEFORE) */}
      <section className="bg-white text-gray-900 py-32 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-6xl font-black tracking-tight mb-6">Elige tu arma.</h2>
            <p className="text-xl text-gray-600">Invierte en herramientas que se pagan solas el primer fin de semana.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-[#FDFCF8] p-10 rounded-[2rem] border border-gray-200 flex flex-col">
              <h3 className="font-bold text-3xl mb-2">La Carta Interactiva</h3>
              <div className="text-5xl font-black text-gray-900 mb-6">150€</div>
              <ul className="space-y-4 text-gray-600 mb-10 text-lg flex-1">
                <li className="flex items-center gap-2"><span className="text-[#FF4500]">✓</span> Carta Web que da hambre</li>
                <li className="flex items-center gap-2"><span className="text-[#FF4500]">✓</span> Códigos QR físicos para tus mesas</li>
                <li className="flex items-center gap-2"><span className="text-[#FF4500]">✓</span> Botón directo a tu WhatsApp</li>
              </ul>
              <a href="https://wa.me/34611499674?text=Hola,%20me%20interesa%20La%20Carta%20Interactiva%20de%20150€." className="block text-center w-full border-2 border-gray-900 text-gray-900 py-4 rounded-full font-bold hover:bg-gray-900 hover:text-white transition-colors text-lg">Empezar por lo básico</a>
            </div>
            <div className="bg-[#FF4500] p-10 rounded-[2rem] shadow-2xl relative flex flex-col transform md:-translate-y-6">
              <div className="absolute -top-4 right-10 bg-white text-[#FF4500] px-4 py-1 rounded-full text-sm font-black tracking-wide uppercase shadow-sm">El Sistema Completo</div>
              <h3 className="font-bold text-3xl mb-2 text-white">El Recepcionista 24/7</h3>
              <div className="text-5xl font-black text-white mb-6">350€</div>
              <ul className="space-y-4 text-white/90 mb-10 text-lg flex-1">
                <li className="font-bold text-white flex items-center gap-2">✓ Tu Web Premium Persuasiva</li>
                <li className="font-bold text-white flex items-center gap-2">✓ Agente de IA en tu WhatsApp</li>
                <li className="font-bold text-white flex items-center gap-2">✓ Motor de Reservas Automático</li>
              </ul>
              <a href="https://wa.me/34611499674?text=Hola,%20quiero%20el%20sistema%20del%20Recepcionista%2024/7%20en%20mi%20WhatsApp%20por%20350€." className="block text-center w-full bg-gray-900 text-white py-5 rounded-full font-black hover:bg-black transition-colors shadow-lg text-lg">Llenar mis mesas hoy</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
