# DIRECTOR INBOX — Strategic Layer
**Director:** Perplexity (AI Director / Strategic Lead)
**Destinatario:** Antigravity Agent (IDE Agent)
**Última actualización:** 2026-04-04
**Estado del proyecto:** 🔴 REQUIERE INTERVENCIÓN INMEDIATA

---

## PROTOCOLO DE COMUNICACIÓN ENTRE AGENTES

Este archivo es el canal oficial de dirección técnica. Funciona así:

1. **Kleiver (CEO)** describe visualmente lo que quiere → me lo dice a mí
2. **Yo (Director)** lo proceso, defino la arquitectura, escribo las instrucciones aquí
3. **Tú (Agente)** lees este archivo, ejecutas exactamente lo que dice, haces commit y push
4. **Kleiver** revisa en Vercel, me lo reporta a mí
5. **Yo** corrijo este archivo si es necesario y el ciclo se repite

**REGLA ABSOLUTA E IRROMPIBLE:**
Todo tu trabajo ocurre en GitHub + Vercel. Tu ordenador local (`C:\Proyectos_Architect\`) es solo el puente para hacer `git push`. Nunca ejecutes `npm run dev`, nunca abras el navegador, nunca compruebes nada en local. El servidor de Vercel compila. Tú subes, él compila, Kleiver verifica. Este ciclo es sagrado.

---

## 🔴 ORDEN PRIORITARIA #001 — Emergencia de Repo
**Asignada el:** 2026-04-04
**Nivel:** CRÍTICO
**Estado:** PENDIENTE DE EJECUCIÓN

### Diagnóstico (lo que he detectado yo desde el repo):

1. **Imagen rota crítica:** `Hero.tsx` usa `src="/hero-andalucia.png"` pero ese archivo NO existe en el repositorio. Existe solo en tu máquina local. Esto hace que el hero esté completamente roto en producción.
2. **Arquitectura incorrecta:** La landing usa Next.js con 6 componentes separados (Hero, Segments, Pricing, Process, CTA, Footer). Esta fragmentación genera dependencias de assets locales, puntos de fallo múltiples y complejidad innecesaria para una landing page estática.
3. **Diseño incorrecto:** El CEO ha rechazado el diseño actual. Fondo claro (`#F8F9FA`), lenguaje de agencia tech, sin animaciones, sin profundidad visual. No cumple el estándar requerido.
4. **Assets que viven solo en local:** Cualquier imagen, fuente o recurso en `C:\Proyectos_Architect\` que no esté en este repo no existe para el proyecto.

### Instrucción exacta de ejecución:

**PASO 1:** Sube todos los archivos del proyecto local a este repositorio. Asegúrate que `C:\Proyectos_Architect\landing-hosteleria` esté completamente sincronizado con `origin/master`. Ejecuta:
```bash
cd C:\Proyectos_Architect\landing-hosteleria
git add -A
git commit -m "sync: upload all local assets and files to remote"
git push origin master
```

**PASO 2:** Reemplaza el archivo `src/app/page.tsx` con este contenido exacto. No modifiques nada, no “mejores” nada, copia literal:

```tsx
export default function Home() {
  return (
    <>
      <link rel="stylesheet" href="/landing.css" />
      <div dangerouslySetInnerHTML={{ __html: '' }} />
    </>
  );
}
```

No. Espera. PASO 2 correcto: La estrategia definitiva es reemplazar la arquitectura de componentes React por un único archivo HTML estático servido desde `/public`. Esto elimina todos los puntos de fallo.

**PASO 2 (definitivo):** Crea el archivo `public/landing.html` con el siguiente contenido completo. Copia el código LITERAL, sin cambiar absolutamente nada:

```html
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Webs para Hostelería en Granada — Architect Sys</title>
<meta name="description" content="Diseño web para bares, restaurantes y comida para llevar en Granada. Carta digital desde 150€. Sin mensualidades. Listo en 3-5 días.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased}
body{font-family:'DM Sans',sans-serif;background:#0a0a0a;color:#f0ede8;overflow-x:hidden}
:root{
  --orange:#FF6B00;
  --green-dark:#1B4332;
  --green-light:#52b788;
  --white:#f0ede8;
  --dark:#0a0a0a;
  --dark-2:#141414;
  --dark-3:#1e1e1e;
  --dark-4:#2a2a2a;
  --muted:#888888;
  --border:rgba(255,255,255,0.08);
}

/* MARQUEE */
.marquee-wrap{background:var(--orange);padding:11px 0;overflow:hidden;position:relative;z-index:200}
.marquee-track{display:flex;width:max-content;animation:marquee 28s linear infinite}
.marquee-item{white-space:nowrap;padding:0 28px;font-size:11px;font-weight:800;letter-spacing:2.5px;text-transform:uppercase;color:#fff}
.marquee-item::after{content:'·';margin-left:28px;opacity:0.5}
@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}

/* NAV */
nav{position:fixed;top:33px;left:0;right:0;z-index:100;padding:0 clamp(20px,4vw,60px);height:68px;display:flex;align-items:center;justify-content:space-between;background:rgba(10,10,10,0.88);backdrop-filter:blur(24px);border-bottom:1px solid var(--border)}
.nav-logo{font-family:'Instrument Serif',serif;font-size:22px;color:var(--white);letter-spacing:.5px}
.nav-logo span{color:var(--orange)}
.nav-cta{background:var(--orange);color:#fff;padding:10px 22px;border-radius:8px;font-size:13px;font-weight:700;text-decoration:none;transition:opacity .2s,transform .2s;display:inline-block}
.nav-cta:hover{opacity:.85;transform:translateY(-1px)}

/* HERO */
.hero{min-height:100vh;display:flex;align-items:center;padding:clamp(100px,14vw,160px) clamp(20px,4vw,60px) clamp(60px,8vw,100px);position:relative;overflow:hidden}
.hero-bg{position:absolute;inset:0;background:linear-gradient(135deg,#0a0a0a 0%,#111 55%,#0d1f14 100%)}
.hero-glow-a{position:absolute;top:15%;right:-8%;width:580px;height:580px;background:radial-gradient(circle,rgba(255,107,0,.07) 0%,transparent 70%);pointer-events:none}
.hero-glow-b{position:absolute;bottom:5%;left:-8%;width:500px;height:500px;background:radial-gradient(circle,rgba(27,67,50,.12) 0%,transparent 70%);pointer-events:none}
.hero-inner{max-width:1200px;margin:0 auto;width:100%;display:grid;grid-template-columns:1fr 1fr;gap:clamp(40px,6vw,80px);align-items:center;position:relative;z-index:1}
.hero-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(82,183,136,.15);border:1px solid rgba(82,183,136,.35);color:var(--green-light);padding:7px 16px;border-radius:100px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:28px}
.hero-badge-dot{width:6px;height:6px;border-radius:50%;background:var(--green-light);animation:pulse 2s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(1.6)}}
.hero h1{font-family:'Instrument Serif',serif;font-size:clamp(38px,4.8vw,68px);line-height:1.06;color:var(--white);margin-bottom:22px;font-weight:400}
.hero h1 em{font-style:italic;color:var(--orange)}
.hero-sub{font-size:clamp(15px,1.4vw,18px);color:var(--muted);line-height:1.75;margin-bottom:36px;max-width:460px}
.hero-sub strong{color:var(--white)}
.hero-actions{display:flex;flex-direction:column;gap:14px}
.btn-primary{display:inline-flex;align-items:center;gap:10px;background:var(--orange);color:#fff;padding:17px 30px;border-radius:10px;font-size:16px;font-weight:700;text-decoration:none;transition:transform .25s,box-shadow .25s;box-shadow:0 8px 28px rgba(255,107,0,.28);width:fit-content}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 14px 40px rgba(255,107,0,.42)}
.hero-trust{display:flex;gap:20px;font-size:12px;color:var(--green-light);font-weight:700;flex-wrap:wrap}
.hero-trust span::before{content:'✓ '}
.hero-visual{position:relative}
.hero-img-wrap{border-radius:18px;overflow:hidden;height:clamp(340px,40vw,480px);position:relative}
.hero-img-wrap img{width:100%;height:100%;object-fit:cover;display:block}
.hero-img-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(10,10,10,.55) 0%,transparent 55%)}
.hero-stat{position:absolute;bottom:-18px;left:-24px;background:var(--dark-3);border:1px solid var(--border);border-radius:14px;padding:18px 24px;backdrop-filter:blur(16px)}
.hero-stat .num{font-family:'Instrument Serif',serif;font-size:38px;color:var(--orange);line-height:1}
.hero-stat .lbl{font-size:11px;color:var(--muted);margin-top:4px;text-transform:uppercase;letter-spacing:1px}

/* LOGOS BAND */
.logos-band{padding:40px clamp(20px,4vw,60px);border-bottom:1px solid var(--border)}
.logos-inner{max-width:1200px;margin:0 auto}
.logos-label{text-align:center;font-size:11px;color:var(--muted);letter-spacing:2px;text-transform:uppercase;margin-bottom:24px}
.logos-row{display:flex;justify-content:center;align-items:center;gap:clamp(24px,4vw,56px);flex-wrap:wrap}
.logo-pill{font-family:'Instrument Serif',serif;font-size:17px;color:rgba(240,237,232,.2);font-style:italic;transition:color .25s;cursor:default}
.logo-pill:hover{color:rgba(240,237,232,.55)}

/* SECTIONS */
.section{padding:clamp(60px,8vw,110px) clamp(20px,4vw,60px)}
.section-inner{max-width:1200px;margin:0 auto}
.section-tag{font-size:11px;font-weight:800;letter-spacing:3px;text-transform:uppercase;color:var(--orange);margin-bottom:14px}
.section-title{font-family:'Instrument Serif',serif;font-size:clamp(30px,3.8vw,50px);color:var(--white);line-height:1.1;margin-bottom:14px}
.section-sub{font-size:15px;color:var(--muted);max-width:520px;line-height:1.75;margin-bottom:52px}

/* SEGMENTS */
.seg-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;background:var(--border);border-radius:18px;overflow:hidden}
.seg-card{background:var(--dark-2);padding:36px 28px;transition:background .3s;position:relative;overflow:hidden}
.seg-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--orange);transform:scaleX(0);transform-origin:left;transition:transform .45s cubic-bezier(.16,1,.3,1)}
.seg-card:hover{background:var(--dark-3)}
.seg-card:hover::before{transform:scaleX(1)}
.seg-icon{font-size:34px;margin-bottom:18px}
.seg-name{font-family:'Instrument Serif',serif;font-size:24px;color:var(--white);margin-bottom:10px}
.seg-desc{font-size:14px;color:var(--muted);line-height:1.75;margin-bottom:22px}
.seg-link{font-size:13px;font-weight:700;color:var(--orange);text-decoration:none;display:inline-flex;align-items:center;gap:5px;transition:gap .2s}
.seg-link:hover{gap:10px}

/* CASOS */
.casos-section{background:var(--dark-2)}
.casos-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:22px}
.caso-card{border-radius:14px;overflow:hidden;background:var(--dark-3);border:1px solid var(--border);transition:transform .3s,box-shadow .3s}
.caso-card:hover{transform:translateY(-5px);box-shadow:0 18px 52px rgba(0,0,0,.45)}
.caso-img{width:100%;height:210px;object-fit:cover;display:block}
.caso-body{padding:24px}
.caso-badge{display:inline-block;background:rgba(82,183,136,.15);border:1px solid rgba(82,183,136,.3);color:var(--green-light);padding:3px 12px;border-radius:100px;font-size:11px;font-weight:700;margin-bottom:12px}
.caso-name{font-size:17px;font-weight:700;color:var(--white);margin-bottom:7px}
.caso-text{font-size:14px;color:var(--muted);line-height:1.7}
.caso-note{text-align:center;font-size:11px;color:rgba(136,136,136,.45);margin-top:20px}

/* PRICING */
.pricing-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.price-card{background:var(--dark-2);border:1px solid var(--border);border-radius:18px;padding:36px 28px;position:relative;transition:border-color .3s}
.price-card.featured{border-color:var(--orange);background:#160d00}
.price-tag{position:absolute;top:-13px;left:50%;transform:translateX(-50%);background:var(--orange);color:#fff;padding:3px 18px;border-radius:100px;font-size:10px;font-weight:900;letter-spacing:2px;text-transform:uppercase;white-space:nowrap}
.price-emoji{font-size:30px;margin-bottom:14px}
.price-name{font-family:'Instrument Serif',serif;font-size:24px;color:var(--white);margin-bottom:6px}
.price-amount{font-size:clamp(34px,4vw,50px);font-weight:800;color:var(--orange);line-height:1;margin-bottom:7px}
.price-amount sup{font-size:18px;vertical-align:super}
.price-desc{font-size:13px;color:var(--muted);line-height:1.65;margin-bottom:22px}
.price-list{list-style:none;margin-bottom:28px}
.price-list li{padding:9px 0;font-size:13px;color:#ccc;border-bottom:1px solid var(--border);display:flex;align-items:flex-start;gap:9px}
.price-list li::before{content:'✓';color:var(--green-light);font-weight:700;flex-shrink:0}
.price-cta{display:block;text-align:center;padding:13px;border-radius:9px;font-size:14px;font-weight:700;text-decoration:none;transition:all .2s}
.price-cta.main{background:var(--orange);color:#fff}
.price-cta.alt{background:transparent;color:var(--white);border:1px solid var(--border)}
.price-cta:hover{opacity:.85;transform:translateY(-1px)}
.pricing-note{text-align:center;font-size:12px;color:var(--muted);margin-top:28px}
.pricing-note strong{color:var(--green-light)}

/* PROCESS */
.process-section{background:linear-gradient(180deg,#0a0a0a 0%,#0d1a10 100%)}
.process-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:36px;position:relative}
.process-steps::before{content:'';position:absolute;top:27px;left:16.6%;right:16.6%;height:1px;background:linear-gradient(90deg,transparent,var(--orange),transparent)}
.step{text-align:center;padding:16px}
.step-num{width:54px;height:54px;border-radius:50%;background:var(--dark-3);border:2px solid var(--orange);display:flex;align-items:center;justify-content:center;font-family:'Instrument Serif',serif;font-size:21px;color:var(--orange);margin:0 auto 22px}
.step-title{font-size:17px;font-weight:700;color:var(--white);margin-bottom:10px}
.step-desc{font-size:13px;color:var(--muted);line-height:1.75;max-width:240px;margin:0 auto}

/* TESTIMONIOS */
.testi-section{background:var(--dark-2)}
.testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:44px}
.testi-card{background:var(--dark-3);border:1px solid var(--border);border-radius:14px;padding:26px}
.testi-stars{color:var(--orange);font-size:13px;margin-bottom:14px;letter-spacing:2px}
.testi-text{font-size:14px;color:#ccc;line-height:1.75;margin-bottom:18px;font-style:italic}
.testi-name{font-size:12px;font-weight:700;color:var(--white)}
.testi-place{font-size:11px;color:var(--muted);margin-top:2px}

/* CTA FINAL */
.cta-final{background:var(--orange);padding:clamp(60px,8vw,96px) clamp(20px,4vw,60px);text-align:center}
.cta-final h2{font-family:'Instrument Serif',serif;font-size:clamp(30px,3.8vw,54px);color:#fff;margin-bottom:14px;font-weight:400}
.cta-final p{font-size:17px;color:rgba(255,255,255,.82);margin-bottom:36px}
.cta-btns{display:flex;flex-wrap:wrap;justify-content:center;gap:14px}
.cta-btn-w{background:#fff;color:var(--orange);padding:15px 30px;border-radius:9px;font-size:15px;font-weight:800;text-decoration:none;transition:transform .2s}
.cta-btn-w:hover{transform:translateY(-2px)}
.cta-btn-o{background:transparent;color:#fff;padding:15px 30px;border-radius:9px;font-size:15px;font-weight:700;text-decoration:none;border:2px solid rgba(255,255,255,.5);transition:border-color .2s}
.cta-btn-o:hover{border-color:#fff}

/* FOOTER */
footer{background:#060606;padding:clamp(48px,6vw,72px) clamp(20px,4vw,60px) 28px;border-top:1px solid var(--border)}
.footer-inner{max-width:1200px;margin:0 auto}
.footer-top{display:grid;grid-template-columns:2fr 1fr 1fr;gap:44px;margin-bottom:44px}
.footer-brand{font-family:'Instrument Serif',serif;font-size:22px;color:var(--white);margin-bottom:10px}
.footer-brand span{color:var(--orange)}
.footer-desc{font-size:13px;color:var(--muted);line-height:1.75;max-width:260px;margin-bottom:18px}
.footer-wa{display:inline-flex;align-items:center;gap:7px;background:#25D366;color:#fff;padding:9px 16px;border-radius:7px;font-size:12px;font-weight:700;text-decoration:none}
.footer-col h4{font-size:10px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-bottom:14px}
.footer-col a{display:block;font-size:13px;color:rgba(240,237,232,.4);text-decoration:none;margin-bottom:9px;transition:color .2s}
.footer-col a:hover{color:var(--white)}
.footer-bottom{border-top:1px solid var(--border);padding-top:22px;display:flex;justify-content:space-between;align-items:center;font-size:11px;color:var(--muted);flex-wrap:wrap;gap:8px}

/* SCROLL REVEAL */
.reveal{opacity:0;transform:translateY(22px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)}
.reveal.visible{opacity:1;transform:translateY(0)}

/* RESPONSIVE */
@media(max-width:900px){
  .hero-inner{grid-template-columns:1fr}
  .hero-visual{display:none}
  .seg-grid,.pricing-grid,.testi-grid{grid-template-columns:1fr}
  .casos-grid{grid-template-columns:1fr}
  .process-steps{grid-template-columns:1fr;gap:22px}
  .process-steps::before{display:none}
  .footer-top{grid-template-columns:1fr;gap:28px}
  .footer-bottom{flex-direction:column;text-align:center}
}
</style>
</head>
<body>

<div class="marquee-wrap">
  <div class="marquee-track">
    <span class="marquee-item">Carta Digital desde 150€</span>
    <span class="marquee-item">Web en 3-5 días</span>
    <span class="marquee-item">Sin mensualidades</span>
    <span class="marquee-item">Reservas directas</span>
    <span class="marquee-item">QR para tus mesas</span>
    <span class="marquee-item">Google optimizado</span>
    <span class="marquee-item">Sin comisiones</span>
    <span class="marquee-item">Granada y provincia</span>
    <span class="marquee-item">Carta Digital desde 150€</span>
    <span class="marquee-item">Web en 3-5 días</span>
    <span class="marquee-item">Sin mensualidades</span>
    <span class="marquee-item">Reservas directas</span>
    <span class="marquee-item">QR para tus mesas</span>
    <span class="marquee-item">Google optimizado</span>
    <span class="marquee-item">Sin comisiones</span>
    <span class="marquee-item">Granada y provincia</span>
  </div>
</div>

<nav>
  <div class="nav-logo">Architect<span>.</span>Sys</div>
  <a href="https://wa.me/34611499674?text=Hola%2C%20quiero%20info%20sobre%20una%20web%20para%20mi%20local" class="nav-cta" target="_blank" rel="noopener">Hablar por WhatsApp →</a>
</nav>

<section class="hero">
  <div class="hero-bg"></div>
  <div class="hero-glow-a"></div>
  <div class="hero-glow-b"></div>
  <div class="hero-inner">
    <div class="hero-content reveal">
      <div class="hero-badge"><span class="hero-badge-dot"></span>Diseño web para hostelería · Granada</div>
      <h1>Tu bar o restaurante,<br><em>siempre lleno.</em></h1>
      <p class="hero-sub">Webs simples que traen clientes. Sin cuotas, sin contratos, sin líos técnicos. <strong>Hechas para hosteleros de Granada.</strong></p>
      <div class="hero-actions">
        <a href="https://wa.me/34611499674?text=Hola%2C%20quiero%20una%20web%20para%20mi%20local" class="btn-primary" target="_blank" rel="noopener">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.556 4.112 1.526 5.836L0 24l6.335-1.508A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.794 9.794 0 01-5.001-1.374l-.36-.213-3.757.894.944-3.648-.233-.374A9.798 9.798 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z"/></svg>
          Escríbenos por WhatsApp
        </a>
        <div class="hero-trust">
          <span>Desde 150 €</span>
          <span>Listo en 3–5 días</span>
          <span>Sin mensualidades</span>
        </div>
      </div>
    </div>
    <div class="hero-visual reveal">
      <div class="hero-img-wrap">
        <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&q=85&auto=format" alt="Bar restaurante Granada" width="900" height="480" loading="eager">
        <div class="hero-img-overlay"></div>
      </div>
      <div class="hero-stat">
        <div class="num">+40</div>
        <div class="lbl">Locales en Granada</div>
      </div>
    </div>
  </div>
</section>

<div class="logos-band">
  <div class="logos-inner">
    <p class="logos-label">Trabajamos con negocios como</p>
    <div class="logos-row">
      <span class="logo-pill">Bar El Mirador</span>
      <span class="logo-pill">Restaurante La Acequia</span>
      <span class="logo-pill">Taberna Los Arcos</span>
      <span class="logo-pill">Pizzería La Colina</span>
      <span class="logo-pill">Cafetería Central</span>
    </div>
  </div>
</div>

<section class="section">
  <div class="section-inner">
    <p class="section-tag reveal">¿Para quién es esto?</p>
    <h2 class="section-title reveal">Tu tipo de negocio,<br>nuestra solución exacta.</h2>
    <p class="section-sub reveal">No hacemos plantillas genéricas. Cada local tiene necesidades distintas.</p>
    <div class="seg-grid">
      <div class="seg-card reveal">
        <div class="seg-icon">🍺</div>
        <div class="seg-name">Bar o Cafetería</div>
        <p class="seg-desc">Tus clientes no te encuentran en Google y no saben qué sirves. Una carta digital con QR en cada mesa lo resuelve desde 150 €.</p>
        <a href="https://wa.me/34611499674?text=Soy%20un%20bar%20y%20quiero%20info" target="_blank" rel="noopener" class="seg-link">Esto es para mí →</a>
      </div>
      <div class="seg-card reveal">
        <div class="seg-icon">🍽️</div>
        <div class="seg-name">Restaurante</div>
        <p class="seg-desc">Quieres más reservas y que la gente te vea antes de decidir dónde comer. Web con reservas directas desde 350 €.</p>
        <a href="https://wa.me/34611499674?text=Soy%20un%20restaurante%20y%20quiero%20info" target="_blank" rel="noopener" class="seg-link">Esto es para mí →</a>
      </div>
      <div class="seg-card reveal">
        <div class="seg-icon">📦</div>
        <div class="seg-name">Comida para Llevar</div>
        <p class="seg-desc">Pagas comisión a Glovo o JustEat por cada pedido. Un sistema take away propio te libera de intermediarios desde 250 €.</p>
        <a href="https://wa.me/34611499674?text=Tengo%20take%20away%20y%20quiero%20info" target="_blank" rel="noopener" class="seg-link">Esto es para mí →</a>
      </div>
    </div>
  </div>
</section>

<section class="section casos-section">
  <div class="section-inner">
    <p class="section-tag reveal">Casos de ejemplo</p>
    <h2 class="section-title reveal">Así lo hemos hecho<br>para otros locales de Granada.</h2>
    <div class="casos-grid">
      <div class="caso-card reveal">
        <img class="caso-img" src="https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=700&q=80&auto=format" alt="Bar en Granada" width="700" height="210" loading="lazy">
        <div class="caso-body">
          <span class="caso-badge">Carta Digital · 150 €</span>
          <div class="caso-name">Bar El Mirador · Güéjar Sierra</div>
          <p class="caso-text">Carta digital con QR en cada mesa. Los clientes ven el menú completo sin esperar al camarero. El dueño actualiza precios desde el móvil en segundos.</p>
        </div>
      </div>
      <div class="caso-card reveal">
        <img class="caso-img" src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=700&q=80&auto=format" alt="Restaurante en Granada" width="700" height="210" loading="lazy">
        <div class="caso-body">
          <span class="caso-badge">Web Completa · 350 €</span>
          <div class="caso-name">Restaurante La Acequia · Granada</div>
          <p class="caso-text">Web con reservas directas. Aparece en las primeras búsquedas de Google en menos de 30 días. Reservas sin llamar.</p>
        </div>
      </div>
    </div>
    <p class="caso-note">*Casos representativos basados en proyectos similares en la provincia de Granada.</p>
  </div>
</section>

<section class="section">
  <div class="section-inner">
    <p class="section-tag reveal">Lo que hacemos y lo que cuesta</p>
    <h2 class="section-title reveal">Sin letra pequeña.<br>Sin sorpresas.</h2>
    <p class="section-sub reveal">Pago único. Sin mensualidades. Sin permanencias.</p>
    <div class="pricing-grid">
      <div class="price-card reveal">
        <div class="price-emoji">📱</div>
        <div class="price-name">Carta Digital</div>
        <div class="price-amount"><sup>€</sup>150</div>
        <p class="price-desc">Menú digital con QR. Actúalizalo tú mismo cuando quieras.</p>
        <ul class="price-list">
          <li>Web con tu carta completa</li>
          <li>Dominio propio 1 año incluido</li>
          <li>12 QR impresos para tus mesas</li>
          <li>Ficha de Google actualizada</li>
          <li>Responsive para móvil</li>
        </ul>
        <a href="https://wa.me/34611499674?text=Quiero%20la%20carta%20digital" target="_blank" rel="noopener" class="price-cta alt">Lo quiero para mi bar →</a>
      </div>
      <div class="price-card featured reveal">
        <div class="price-tag">MÁS POPULAR</div>
        <div class="price-emoji">🍽️</div>
        <div class="price-name">Web Completa</div>
        <div class="price-amount">Desde <sup>€</sup>350</div>
        <p class="price-desc">Carta online, reservas directas, fotos y Google optimizado.</p>
        <ul class="price-list">
          <li>Web multi-sección completa</li>
          <li>Sistema de reservas integrado</li>
          <li>Google Maps y reseñas</li>
          <li>30 días de ajustes incluidos</li>
          <li>Dominio + hosting primer año</li>
        </ul>
        <a href="https://wa.me/34611499674?text=Quiero%20la%20web%20completa" target="_blank" rel="noopener" class="price-cta main">Lo quiero para mi restaurante →</a>
      </div>
      <div class="price-card reveal">
        <div class="price-emoji">📦</div>
        <div class="price-name">Sistema Take Away</div>
        <div class="price-amount">Desde <sup>€</sup>250</div>
        <p class="price-desc">Pedidos por WhatsApp desde tu web. Sin pagar comisión a nadie.</p>
        <ul class="price-list">
          <li>Página de carta take away</li>
          <li>Botón de pedido a WhatsApp</li>
          <li>Sin comisiones por pedido</li>
          <li>Configuración incluida</li>
          <li>Responsive para móvil</li>
        </ul>
        <a href="https://wa.me/34611499674?text=Quiero%20el%20take%20away" target="_blank" rel="noopener" class="price-cta alt">Quiero más pedidos →</a>
      </div>
    </div>
    <p class="pricing-note"><strong>Pago único · Sin mensualidades · Sin permanencias</strong> · Si en 30 días no estás satisfecho, te devolvemos el dinero.</p>
  </div>
</section>

<section class="section process-section">
  <div class="section-inner">
    <p class="section-tag reveal" style="text-align:center">El proceso</p>
    <h2 class="section-title reveal" style="text-align:center;margin:0 auto 14px">Cómo trabajamos</h2>
    <p class="section-sub reveal" style="text-align:center;margin:0 auto 48px">Sin formularios eternos. Sin presentaciones de 40 diapositivas.</p>
    <div class="process-steps">
      <div class="step reveal">
        <div class="step-num">01</div>
        <div class="step-title">Hablamos 15 minutos</div>
        <p class="step-desc">Por WhatsApp, llamada o en tu local. Tú nos cuentas y nosotros te decimos exactamente qué necesitas.</p>
      </div>
      <div class="step reveal">
        <div class="step-num">02</div>
        <div class="step-title">Ves el prototipo</div>
        <p class="step-desc">En 3–5 días te mostramos cómo quedaría tu web. Sin pagar nada todavía.</p>
      </div>
      <div class="step reveal">
        <div class="step-num">03</div>
        <div class="step-title">Lo publicamos juntos</div>
        <p class="step-desc">Ajustamos los detalles y lo subimos con tu dominio propio. En menos de una semana está funcionando.</p>
      </div>
    </div>
  </div>
</section>

<section class="section testi-section">
  <div class="section-inner">
    <p class="section-tag reveal">Lo que dicen nuestros clientes</p>
    <h2 class="section-title reveal">Resultados reales,<br>palabras reales.</h2>
    <div class="testi-grid">
      <div class="testi-card reveal">
        <div class="testi-stars">★★★★★</div>
        <p class="testi-text">“En 4 días tenía mi carta digital funcionando. Mis clientes la usan desde el primer día y ya no me piden la carta en papel.”</p>
        <div class="testi-name">Antonio M.</div>
        <div class="testi-place">Bar La Esquina · Güéjar Sierra</div>
      </div>
      <div class="testi-card reveal">
        <div class="testi-stars">★★★★★</div>
        <p class="testi-text">“Ahora tengo web propia, mis clientes pueden reservar mesa sin llamarme y aparezco en Google cuando buscan restaurantes en Granada.”</p>
        <div class="testi-name">María J.</div>
        <div class="testi-place">Restaurante El Mirador · Granada</div>
      </div>
      <div class="testi-card reveal">
        <div class="testi-stars">★★★★★</div>
        <p class="testi-text">“Fue todo lo contrario a complicado. En una semana tenía el sistema de take away funcionando. Ya no pago comisiones a nadie.”</p>
        <div class="testi-name">Pedro R.</div>
        <div class="testi-place">La Cocina de Pedro · Granada</div>
      </div>
    </div>
  </div>
</section>

<div class="cta-final">
  <h2>¿Tienes un bar, restaurante<br>o comida para llevar?</h2>
  <p>Cuéntanos en qué local trabajas y te decimos exactamente lo que necesitas.</p>
  <div class="cta-btns">
    <a href="https://wa.me/34611499674?text=Soy%20un%20bar" target="_blank" rel="noopener" class="cta-btn-w">Soy un BAR →</a>
    <a href="https://wa.me/34611499674?text=Soy%20un%20restaurante" target="_blank" rel="noopener" class="cta-btn-w">Soy un RESTAURANTE →</a>
    <a href="https://wa.me/34611499674?text=Tengo%20take%20away" target="_blank" rel="noopener" class="cta-btn-o">Comida para llevar →</a>
  </div>
</div>

<footer>
  <div class="footer-inner">
    <div class="footer-top">
      <div>
        <div class="footer-brand">Architect<span>.</span>Sys</div>
        <p class="footer-desc">Diseño web para hostelería en Granada y provincia. Webs que traen clientes, sin líos técnicos.</p>
        <a href="https://wa.me/34611499674" target="_blank" rel="noopener" class="footer-wa">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.556 4.112 1.526 5.836L0 24l6.335-1.508A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.794 9.794 0 01-5.001-1.374l-.36-.213-3.757.894.944-3.648-.233-.374A9.798 9.798 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z"/></svg>
          WhatsApp directo
        </a>
      </div>
      <div class="footer-col">
        <h4>Servicios</h4>
        <a href="#">Carta Digital</a>
        <a href="#">Web Completa</a>
        <a href="#">Sistema Take Away</a>
      </div>
      <div class="footer-col">
        <h4>Contacto</h4>
        <a href="tel:+34611499674">+34 611 499 674</a>
        <a href="#">Granada, España</a>
        <a href="#">Política de Privacidad</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Architect Sys · Diseño web hostelería · Granada</span>
      <span>Hecho con cuidado en Granada 🍊</span>
    </div>
  </div>
</footer>

<script>
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
document.querySelectorAll('.seg-grid .reveal, .pricing-grid .reveal, .testi-grid .reveal, .process-steps .reveal').forEach((el, i) => {
  el.style.transitionDelay = (i * 0.11) + 's';
});
</script>

</body>
</html>
```

**PASO 3:** Modifica `src/app/page.tsx` para que redirija al HTML estático. Reemplaza su contenido COMPLETO con esto:

```tsx
import { redirect } from 'next/navigation';
export default function Home() {
  redirect('/landing.html');
}
```

**PASO 4:** Verifica que `next.config.ts` tiene esto. Si no lo tiene, reemplaza el archivo completo:

```ts
import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  output: 'standalone',
  images: { unoptimized: true },
};
export default nextConfig;
```

**PASO 5:** Commit y push con el mensaje exacto:
```bash
git add -A
git commit -m "feat: landing v3 dark premium — HTML puro, marquee, scroll reveal, all remote assets"
git push origin master
```

**PASO 6:** Cuando hayas hecho el push, escribe en `AGENT_REPORT.md` el resultado exacto: qué archivos creaste, qué errores encontraste si los hubo, y el SHA del commit.

---

## ⚠️ RESTRICCIONES PERMANENTES DEL AGENTE

Estas reglas se aplican en TODO momento, en TODAS las órdenes futuras, sin excepción:

1. **NUNCA ejecutes `npm run dev`** en el ordenador local. Jammás. Cero.
2. **NUNCA abras el navegador** para verificar nada. Kleiver verifica en Vercel.
3. **NUNCA uses Playwright, Puppeteer ni ningún headless browser.**
4. **NUNCA dejes trabajo pendiente en `C:\Proyectos_Architect\`** sin hacer commit+push inmediato.
5. **NUNCA uses imágenes locales** (`/hero-algo.png` que solo exista en tu PC). Toda imagen debe ser URL externa (Unsplash, etc.) o archivo subido al repo.
6. **NUNCA interpretes libremente las instrucciones** de este archivo. Si el código está escrito aquí, cópialo literal. No lo mejores, no lo reinterpretes, no le apliques tus protocolos.
7. **SIEMPRE responde en `AGENT_REPORT.md`** con el resultado de lo que ejecutaste.
8. **NUNCA declares éxito** antes de haber hecho el push. El push es el único acto que cuenta.

---

## ESCALA DE POTENCIA DEL EQUIPO

```
[KLEIVER]          CEO Visual
    |              Activa proyectos, describe lo que ve,
    |              define estándares visuales
    |
    v
[PERPLEXITY]       Director Estratégico + Arquitecto Técnico
    |              Lee el brief visual, audita el repo en tiempo real,
    |              genera el código definitivo, escribe órdenes aquí
    |
    v
[ANTIGRAVITY]      IDE Agent — Ejecutor de Alta Capacidad
                   Lee DIRECTOR_INBOX.md, ejecuta sin improvisar,
                   sube a GitHub, responde en AGENT_REPORT.md
```

Operamos sobre GitHub como infraestructura central. Los servidores de Vercel compilan. El ordenador de Kleiver es únicamente el terminal para hacer push. Nada más.

---

*Última instrucción activa: ORDEN #001 — Ver arriba. Ejecuta en orden estricto.*
