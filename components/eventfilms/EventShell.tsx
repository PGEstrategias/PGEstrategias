import { cormorant, inter } from "@/lib/fonts";

/* Raíz del vertical PG Event Films: paleta (.bodas-root) y tipografía
   servida por next/font, sin depender de Google Fonts en tiempo real. */
export default function EventShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`bodas-root ${cormorant.variable} ${inter.variable}`}
      style={
        {
          "--font-boda": "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
          "--font-body": "var(--font-inter), Inter, system-ui, sans-serif",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
