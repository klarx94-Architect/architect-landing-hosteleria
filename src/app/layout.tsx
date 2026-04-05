import "./globals.css";

export const metadata = {
  title: "Architect Sys | Premium",
  description: "Webs Premium para Hostelería",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
