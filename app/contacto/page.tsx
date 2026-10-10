import type { Metadata } from "next";
import PageShell from "@/components/site/PageShell";
import PageHero from "@/components/site/PageHero";
import ContactoForm from "@/components/home/ContactoForm";
import WhatsAppIcon from "@/components/site/WhatsAppIcon";
import s from "@/components/home/home.module.css";
import { EMAIL, WHATSAPP_VISIBLE, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto | PG Estrategias",
  description: "Escríbenos por WhatsApp o déjanos tus datos. PG Estrategias, producción audiovisual y Meta Ads en Puebla, México.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <PageShell>
      <PageHero
        migas={[
          { label: "Inicio", href: "/" },
          { label: "Contacto", href: "/contacto" },
        ]}
        eyebrow="Contacto"
        titulo="Hablemos de tu marca"
        sub="Cuéntanos qué necesitas y te respondemos con una propuesta."
      />
      <section className={s.section} style={{ paddingTop: 40 }}>
        <div className={`${s.container} ${s.ctaGrid}`}>
          <div className={s.reveal} data-reveal>
            <ul className={s.bullets} style={{ fontSize: 17 }}>
              <li>
                WhatsApp:{" "}
                <a className={s.link} href={waLink()} target="_blank" rel="noopener noreferrer">
                  {WHATSAPP_VISIBLE}
                </a>
              </li>
              <li>
                Email:{" "}
                <a className={s.link} href={`mailto:${EMAIL}`}>
                  {EMAIL}
                </a>
              </li>
              <li>Puebla, México</li>
            </ul>
            <div className={s.ctas}>
              <a className={`${s.btn} ${s.btnPrimary}`} href={waLink()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                Escribir por WhatsApp
              </a>
            </div>
          </div>
          <div className={s.reveal} data-reveal data-reveal-delay={100}>
            <ContactoForm />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
