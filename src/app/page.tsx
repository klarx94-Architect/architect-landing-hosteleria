export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-brand selection:text-white">
      {/* NAVBAR PREMIUM */}
      <nav className="w-full sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-gray-100">
        <div className="flex justify-between items-center py-5 px-8 max-w-7xl mx-auto">
          <div className="text-2xl font-black tracking-tighter text-foreground">
            Architect<span className="text-brand">.Sys</span>
          </div>
          <a href="https://wa.me/34611499674" className="hidden md:inline-flex bg-foreground text-background px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-gray-800 transition-all shadow-sm">
            Auditoría Gratuita
          </a>
        </div>
      </nav>

      {/* HERO SECTION HIGH-CONVERSION */}
      <main className="max-w-7xl mx-auto px-8 pt-24 pb-32 flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-8 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-brand text-sm font-bold tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-brand animate-pulse"></span>
            Sistemas para Hostelería
          </div>
          <h1 className="text-5xl lg:text-[5.5rem] font-black leading-[1.05] tracking-tight text-foreground">
            Multiplica tus reservas. <br/>
            <span className="text-brand text-transparent bg-clip-text bg-gradient-to-r from-brand to-orange-400">En piloto automático.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-xl leading-relaxed font-medium">
            Transformamos restaurantes tradicionales en máquinas de facturación. Implementamos menús digitales, sistemas de captación y agentes de IA que responden a tus clientes 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a href="https://wa.me/34611499674" className="flex items-center justify-center gap-2 bg-brand text-white px-8 py-4 rounded-full text-lg font-bold shadow-float hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
              Transformar mi negocio
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </a>
          </div>
        </div>
        <div className="flex-1 w-full relative group">
          <div className="absolute inset-0 bg-brand/20 blur-3xl rounded-full scale-90 group-hover:scale-100 transition-transform duration-700"></div>
          <img src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1200" alt="Restaurante Premium Alta Facturación" className="relative w-full h-[600px] rounded-[2.5rem] shadow-premium object-cover border-8 border-white transition-transform duration-700 group-hover:scale-[1.02]" />
        </div>
      </main>
      
      {/* ESCALERA DE VALOR PREMIUM */}
      <section className="bg-foreground text-background py-32 rounded-t-[3rem] mt-10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight">Ecosistemas a medida</h2>
            <p className="text-xl text-gray-400">Deja de perder dinero en comisiones de terceros. Construye un activo digital propio y domina tu zona.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* TIER 1 */}
            <div className="bg-[#1A1A1A] p-10 rounded-[2rem] border border-gray-800 hover:border-gray-600 transition-colors">
              <h3 className="font-bold text-2xl mb-2">Carta Digital PRO</h3>
              <div className="text-5xl font-black text-white mb-6">150€</div>
              <ul className="space-y-4 text-gray-400 mb-10 text-lg">
                <li className="flex items-center gap-3"><span className="text-brand">✓</span> Código QR de alta durabilidad</li>
                <li className="flex items-center gap-3"><span className="text-brand">✓</span> Optimización para Google</li>
                <li className="flex items-center gap-3"><span className="text-brand">✓</span> Menú autogestionable</li>
              </ul>
              <a href="https://wa.me/34611499674" className="block text-center w-full bg-white text-black py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">Solicitar</a>
            </div>

            {/* TIER 2 - DESTACADO */}
            <div className="bg-brand p-10 rounded-[2rem] shadow-2xl relative transform md:-translate-y-8 flex flex-col">
              <div className="absolute -top-4 right-10 bg-white text-brand px-4 py-1 rounded-full text-sm font-black tracking-wide uppercase shadow-sm">Recomendado</div>
              <h3 className="font-bold text-2xl mb-2 text-white">Sist. Reservas IA</h3>
              <div className="text-5xl font-black text-white mb-6">350€</div>
              <ul className="space-y-4 text-white/90 mb-10 text-lg flex-1">
                <li className="flex items-center gap-3"><span className="text-white font-bold">✓</span> Web Premium de Agencia</li>
                <li className="flex items-center gap-3"><span className="text-white font-bold">✓</span> Agente IA (Responde WhatsApp)</li>
                <li className="flex items-center gap-3"><span className="text-white font-bold">✓</span> Embudo de Captación Local</li>
              </ul>
              <a href="https://wa.me/34611499674" className="block text-center w-full bg-foreground text-white py-4 rounded-full font-black hover:bg-black transition-colors shadow-lg">Hablar con un experto</a>
            </div>

            {/* TIER 3 */}
            <div className="bg-[#1A1A1A] p-10 rounded-[2rem] border border-gray-800 hover:border-gray-600 transition-colors">
              <h3 className="font-bold text-2xl mb-2">Dark Kitchen</h3>
              <div className="text-5xl font-black text-white mb-6">Custom</div>
              <ul className="space-y-4 text-gray-400 mb-10 text-lg">
                <li className="flex items-center gap-3"><span className="text-brand">✓</span> Branding y Marcas Virtuales</li>
                <li className="flex items-center gap-3"><span className="text-brand">✓</span> Sistema Delivery Sin Comisiones</li>
                <li className="flex items-center gap-3"><span className="text-brand">✓</span> Automatización total de cocina</li>
              </ul>
              <a href="https://wa.me/34611499674" className="block text-center w-full bg-white text-black py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">Agendar Consultoría</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
