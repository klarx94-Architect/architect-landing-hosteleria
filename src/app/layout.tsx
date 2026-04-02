import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./global.css";

const sans = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const serif = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Architect Sys | Tu local, siempre lleno. Webs para hostelería en Granada.",
  description: "Webs para bares y restaurantes en Granada. Sin comisiones, sin permanencias. Resultados desde el primer mes.",
  keywords: ["diseño web granada", "marketing gastronomico", "carta digital qr", "web restaurantes", "architect sys"],
  openGraph: {
    title: "Architect Sys | Tu local, siempre lleno.",
    description: "Webs de alto impacto para hostelería sin comisiones de terceros.",
    url: "https://architectsys.es",
    siteName: "Architect Sys",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${sans.variable} ${serif.variable} h-full antialiased`}
    >
      <head>
        {/* TODO: Meta Pixel ID aquí */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebAgency",
              "name": "Architect Sys",
              "url": "https://architectsys.es",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Granada",
                "addressCountry": "ES"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+34-611499674",
                "contactType": "sales"
              }
            })
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans selection:bg-brand-amber selection:text-white">
        {children}
      </body>
    </html>
  );
}
