import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import RevealObserver from "@/components/home/RevealObserver";
import { inter, syne } from "@/lib/fonts";
import s from "@/components/home/home.module.css";

/* Estructura común del sitio principal: tipografía, encabezado, pie y
   animaciones de entrada. */
export default function PageShell({
  children,
  overHero = false,
}: {
  children: React.ReactNode;
  overHero?: boolean;
}) {
  return (
    <div className={`${s.page} ${syne.variable} ${inter.variable}`}>
      <noscript>
        <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
      </noscript>
      <SiteHeader overHero={overHero} />
      <main id="contenido" className={overHero ? undefined : s.offset}>
        {children}
      </main>
      <SiteFooter />
      <RevealObserver />
    </div>
  );
}
