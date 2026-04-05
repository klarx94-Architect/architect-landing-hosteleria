export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <nav className="w-full flex justify-between items-center py-6 px-8 max-w-7xl mx-auto border-b border-gray-200">
        <div className="text-3xl font-bold tracking-tight text-foreground">Architect<span className="text-terracotta">.Sys</span></div>
        <a href="https://wa.me/34611499674" className="bg-olive text-white px-6 py-3 rounded-full font-semibold transition hover:opacity-90 shadow-md">Hablemos hoy</a>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-20 lg:py-32 flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-8">
          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight text-foreground">
            Llenamos tus mesas y <span className="text-terracotta">automatizamos</span> tus pedidos.
          </h1>
          <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
            Sistemas digitales de autor para hostelería inteligente. Desde cartas digitales hasta la transformación a Dark Kitchen rentable.
          </p>
          <a href="https://wa.me/34611499674" className="inline-block bg-terracotta text-white px-10 py-5 rounded-xl text-xl font-bold shadow-2xl hover:-translate-y-1 transition duration-300">
            Analizar mi negocio (WhatsApp)
          </a>
        </div>
        <div className="flex-1 w-full">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] border-4 border-white">
            <img src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1200" alt="Restaurante" className="w-full h-full object-cover" />
          </div>
        </div>
      </main>
      
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16 text-foreground">Soluciones a medida de tu crecimiento</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-10 rounded-3xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-2xl mb-2 text-foreground">Supervivencia Digital</h3>
              <div className="text-4xl font-extrabold text-terracotta mb-6">150€</div>
              <ul className="space-y-4 text-gray-600 mb-8 text-lg">
                <li>✓ Carta digital interactiva</li>
                <li>✓ Códigos QR en mesas</li>
                <li>✓ Google optimizado</li>
              </ul>
            </div>
            <div className="bg-foreground text-background p-10 rounded-3xl shadow-2xl relative transform md:-translate-y-4 border-t-8 border-terracotta">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-terracotta text-white px-4 py-1 rounded-full text-sm font-bold">DESTACADO</span>
              <h3 className="font-bold text-2xl mb-2">Restaurante Automático</h3>
              <div className="text-4xl font-extrabold text-terracotta mb-6">Desde 350€</div>
              <ul className="space-y-4 text-gray-300 mb-8 text-lg">
                <li>✓ Web Premium de Autor</li>
                <li>✓ Agente IA reservas 24/7</li>
                <li>✓ Botón WhatsApp Directo</li>
              </ul>
            </div>
            <div className="bg-background p-10 rounded-3xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-2xl mb-2 text-foreground">Dark Kitchen</h3>
              <div className="text-4xl font-extrabold text-terracotta mb-6">Consultoría</div>
              <ul className="space-y-4 text-gray-600 mb-8 text-lg">
                <li>✓ Sistema propio sin comisiones</li>
                <li>✓ Cero intermediarios</li>
                <li>✓ Marcas virtuales</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
