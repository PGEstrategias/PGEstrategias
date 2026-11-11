import type { Metadata } from "next";
import InvitacionXV from "@/components/xv/InvitacionXV";
import { cormorant, inter } from "@/lib/fonts";
import { FATIMA as XV } from "@/components/xv/datos";

/* Invitación privada de una clienta menor de edad: fuera de buscadores y
   del sitemap. Se comparte solo por enlace. */
export const metadata: Metadata = {
  title: `Mis XV años · ${XV.nombre}`,
  description: `${XV.fechaLarga}. Te espero para celebrar mis XV años.`,
  robots: { index: false, follow: false, nocache: true },
  openGraph: {
    title: `Mis XV años · ${XV.nombre}`,
    description: `${XV.fechaLarga}. Te espero para celebrar.`,
    type: "website",
    locale: "es_MX",
  },
};

export default function Page() {
  return (
    <div className={`${cormorant.variable} ${inter.variable}`}>
      <InvitacionXV c={XV} />
    </div>
  );
}
