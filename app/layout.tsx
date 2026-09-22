import type { Metadata } from "next";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";

export const metadata: Metadata = {
  title: "Agencia de Marketing Digital y Producción Audiovisual en Puebla | PG Estrategias",
  description: "Anuncios, video y WhatsApp operados por un solo equipo en Puebla. Campaña activa en 14 días con garantía por escrito.",
  keywords: "agencia de marketing Puebla, producción audiovisual Puebla, pauta digital, publicidad digital, Meta Ads, Google Ads",
  openGraph: {
    title: "Agencia de Marketing Digital y Producción Audiovisual en Puebla | PG Estrategias",
    description: "Anuncios, video y WhatsApp operados por un solo equipo en Puebla. Campaña activa en 14 días con garantía por escrito.",
    type: "website",
    locale: "es_MX",
    siteName: "PG Estrategias",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agencia de Marketing Digital y Producción Audiovisual en Puebla | PG Estrategias",
    description: "Anuncios, video y WhatsApp operados por un solo equipo en Puebla.",
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
