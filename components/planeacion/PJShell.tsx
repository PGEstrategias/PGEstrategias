import { allura, inter, playfair } from "@/lib/fonts";

/* Raíz de la página de Paola Jiménez: reusa el sistema .bodas-* del
   vertical de PG Event Films con la paleta y las tipografías de su marca
   (.pj-root en globals.css). */
export default function PJShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`bodas-root pj-root ${playfair.variable} ${allura.variable} ${inter.variable}`}
      style={
        {
          "--font-boda": "var(--font-playfair), 'Playfair Display', Georgia, serif",
          "--font-body": "var(--font-inter), Inter, system-ui, sans-serif",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
