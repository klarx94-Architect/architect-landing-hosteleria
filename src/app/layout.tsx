import React from "react";
import "./globals.css";

export const metadata = {
  title: "Architect.Sys | Sistemas de Alta Facturación para Hostelería",
  description: "Transformamos restaurantes en máquinas de facturación. Cartas digitales, Agentes IA 24/7 y automatización de reservas.",
  openGraph: {
    title: "Architect.Sys | Multiplica tus reservas en piloto automático",
    description: "Sistemas digitales de autor para hostelería inteligente. Deja de perder dinero en comisiones.",
    url: "https://architect-landing-hosteleria.vercel.app/",
    images: [{ url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1200", width: 1200, height: 630, alt: "Architect.Sys Hostelería" }],
    siteName: "Architect.Sys",
    type: "website",
  },
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
  twitter: {
    card: "summary_large_image",
    title: "Architect.Sys | Hostelería Inteligente",
    description: "Sistemas digitales de autor para restaurantes y Dark Kitchens.",
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}
