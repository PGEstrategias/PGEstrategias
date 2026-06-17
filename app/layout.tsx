import type { Metadata } from "next";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";

export const metadata: Metadata = {
  title: "Taller Gratuito CorteCloud — Diseña y vende muebles sin taller propio",
  description: "Taller práctico en Puebla donde aprendes a usar CorteCloud desde cero: diseña, cotiza y manda muebles a producción industrial sin maquinaria, bodega ni empleados fijos. Cupos limitados.",
  keywords: "CorteCloud, Cubiertas y Herrajes, taller muebles, fabricar muebles sin taller, producción industrial muebles, Puebla, carpintería",
  openGraph: {
    title: "Taller Gratuito CorteCloud — Diseña y vende muebles sin taller propio",
    description: "Aprende a fabricar muebles profesionales sin maquinaria, sin bodega y sin empleados fijos. Taller gratuito en Puebla · Cupos limitados.",
    type: "website",
    locale: "es_MX",
    siteName: "CorteCloud · Cubiertas y Herrajes",
  },
  twitter: {
    card: "summary_large_image",
    title: "Taller Gratuito CorteCloud",
    description: "Diseña y vende muebles sin taller propio. Cupos limitados.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="grain">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
