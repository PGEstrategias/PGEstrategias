import Link from "next/link";
import Logo from "@/components/Logo";
import {
  AVISO_PRIVACIDAD,
  EMAIL,
  FOOTER_LINKS,
  WHATSAPP_VISIBLE,
  waLink,
} from "@/lib/site";
import s from "./site.module.css";

export default function SiteFooter() {
  return (
    <footer className={s.footer}>
      <div className={s.fGrid}>
        <div>
          <Logo size={28} tone="cream" />
          <p style={{ marginTop: 16, color: "#aaa8a4" }}>Puebla, México</p>
        </div>
        <div>
          <p className={s.fTitle}>Contacto</p>
          <ul className={s.fList}>
            <li>
              WhatsApp:{" "}
              <a href={waLink()} target="_blank" rel="noopener noreferrer">
                {WHATSAPP_VISIBLE}
              </a>
            </li>
            <li>
              Email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </li>
          </ul>
        </div>
        <nav aria-label="Pie de página">
          <p className={s.fTitle}>Sitio</p>
          <ul className={s.fList}>
            {FOOTER_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} prefetch={false}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className={s.fBottom}>
        <span>© {new Date().getFullYear()} PG Estrategias</span>
        <Link href={AVISO_PRIVACIDAD}>Aviso de privacidad</Link>
      </div>
    </footer>
  );
}
