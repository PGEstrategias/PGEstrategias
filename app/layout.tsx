import type { Metadata } from "next";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";

/* Fuentes de las páginas existentes. Se inyectan por script para que no
   bloqueen el primer render; <noscript> cubre navegadores sin JS. */
const GOOGLE_FONTS =
  "https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Inter:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap";

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var l=document.createElement("link");l.rel="stylesheet";l.href=${JSON.stringify(GOOGLE_FONTS)};document.head.appendChild(l)})();`,
          }}
        />
        <noscript>
          <link rel="stylesheet" href={GOOGLE_FONTS} />
        </noscript>
      </head>
      <body className="grain">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
