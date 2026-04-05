import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Architect Sys - Soluciones Web para Hostelería",
  description: "Diseño web orgánico premium y cartas digitales para hostelería.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
