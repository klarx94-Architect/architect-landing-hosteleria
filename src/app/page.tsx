export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center py-6 px-8 max-w-7xl mx-auto">
        <div className="font-serif text-2xl font-bold tracking-tight">Architect.Sys</div>
        <a href="https://wa.me/34611499674" className="bg-olive text-white px-5 py-2.5 rounded-full font-medium transition hover:opacity-90 shadow-sm">
          Hablemos hoy
        </a>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-20 lg:py-32 flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-8">
          <h1 className="font-serif text-5xl lg:text-7xl leading-[1.1] text-foreground">
            Llenamos tus mesas y automatizamos tus pedidos.
          </h1>
          <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
            Sistemas digitales de autor para hostelería inteligente. Desde cartas digitales hasta la transformación de tu local en una Dark Kitchen rentable.
          </p>
          <div className="pt-4">
            <a href="https://wa.me/34611499674" className="inline-block bg-terracotta text-white px-8 py-4 rounded-xl text-lg font-bold shadow-xl shadow-terracotta/30 hover:-translate-y-1 transition duration-300">
              Analizar mi negocio (WhatsApp)
            </a>
          </div>
        </div>
        <div className="flex-1 w-full relative">
          <img 
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1200" 
            alt="Interior de restaurante premium" 
            className="w-full h-auto rounded-2xl shadow-2xl object-cover aspect-[4/3]"
          />
        </div>
      </section>

      {/* Escalera de Valor */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="font-serif text-4xl lg:text-5xl text-center mb-16">Soluciones a medida de tu crecimiento</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="border border-gray-100 bg-gray-50 p-10 rounded-2xl flex flex-col hover:shadow-lg transition">
              <h3 className="font-bold text-xl mb-2">Supervivencia Digital</h3>
              <div className="text-3xl font-serif text-terracotta mb-6">150€</div>
              <ul className="space-y-4 mb-8 text-gray-600 flex-1">
                <li>✓ Carta digital interactiva</li>
                <li>✓ Códigos QR en mesas</li>
                <li>✓ Google Maps optimizado</li>
              </ul>
              <p className="text-sm font-medium text-olive mb-4">Ideal: Bares y Cafeterías</p>
            </div>

            {/* Card 2 - Destacada */}
            <div className="border border-terracotta bg-white p-10 rounded-2xl flex flex-col shadow-2xl relative transform md:-translate-y-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-terracotta text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider">MÁS POPULAR</div>
              <h3 className="font-bold text-xl mb-2">Restaurante Automático</h3>
              <div className="text-3xl font-serif text-terracotta mb-6">Desde 350€</div>
              <ul className="space-y-4 mb-8 text-gray-600 flex-1">
                <li>✓ Web Premium de Autor</li>
                <li>✓ Agente IA para reservas 24/7</li>
                <li>✓ Botón WhatsApp Directo</li>
              </ul>
              <p className="text-sm font-medium text-terracotta mb-4">Ideal: Restaurantes medianos</p>
            </div>

            {/* Card 3 */}
            <div className="border border-gray-100 bg-gray-50 p-10 rounded-2xl flex flex-col hover:shadow-lg transition">
              <h3 className="font-bold text-xl mb-2">Dark Kitchen Revolution</h3>
              <div className="text-3xl font-serif text-terracotta mb-6">Consultoría</div>
              <ul className="space-y-4 mb-8 text-gray-600 flex-1">
                <li>✓ Sistema propio de pedidos</li>
                <li>✓ Cero comisiones (Adiós Glovo)</li>
                <li>✓ Creación de marcas virtuales</li>
              </ul>
              <p className="text-sm font-medium text-olive mb-4">Ideal: Escalar tu cocina</p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12 text-center">
        <p className="text-gray-400 font-medium">© 2026 Architect Sys. Diseñado para escalar negocios reales.</p>
      </footer>
    </main>
  );
}
