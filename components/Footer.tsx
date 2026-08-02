"use client";

import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";

const navLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Metodología", href: "#metodologia" },
  { label: "Paquetes", href: "#paquetes" },
  { label: "Nuestro trabajo", href: "/nuestrotrabajo", external: true },
  { label: "FAQ", href: "#faq" },
  { label: "Agendar llamada", href: "#contacto" },
];

function InstagramIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="14" height="14" rx="3" />
      <circle cx="9" cy="9" r="3" />
      <circle cx="13" cy="5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="14" height="14" rx="2" />
      <path d="M6 8v5M6 6v.01M9 13v-2.5c0-1 .5-1.5 1.5-1.5s1.5.5 1.5 1.5V13" />
    </svg>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const hrefFor = (link: { href: string; external?: boolean }) => {
    if (link.external) return link.href;
    return isHome ? link.href : `/${link.href}`;
  };
  return (
    <footer
      style={{
        background: "#1C1C1A",
        borderTop: "1px solid rgba(228,224,221,0.08)",
      }}
    >
      <div className="max-w-[1300px] mx-auto px-8 md:px-16 pt-24 pb-10">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          {/* Brand — 4 cols */}
          <div className="md:col-span-4">
            <a
              href="/"
              className="inline-flex mb-6 transition-opacity duration-500 hover:opacity-80"
            >
              <Logo size={26} tone="cream" />
            </a>
            <p
              className="font-body text-[13px] leading-[1.7] max-w-[240px] mb-6"
              style={{ color: "rgba(228,224,221,0.5)" }}
            >
              Growth Partners para negocios que ya saben cómo vender.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/pg.estrategias/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-500 hover:text-[color:#D63A27]"
                style={{ color: "rgba(228,224,221,0.45)" }}
                aria-label="Instagram de PG Estrategias"
              >
                <InstagramIcon />
              </a>
              <a
                href="#"
                className="transition-colors duration-500 hover:text-[color:#D63A27]"
                style={{ color: "rgba(228,224,221,0.45)" }}
                aria-label="LinkedIn de PG Estrategias"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>

          {/* Nav — 3 cols */}
          <div className="md:col-span-3 md:col-start-6">
            <p
              className="font-body text-[11px] uppercase tracking-[0.14em] mb-6"
              style={{ color: "rgba(228,224,221,0.35)" }}
            >
              Navegación
            </p>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={hrefFor(link)}
                  className="link-underline font-body text-[14px] transition-colors duration-500 w-fit hover:text-[color:#E4E0DD]"
                  style={{ color: "rgba(228,224,221,0.6)" }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact — 4 cols */}
          <div className="md:col-span-4 md:col-start-9">
            <p
              className="font-body text-[11px] uppercase tracking-[0.14em] mb-6"
              style={{ color: "rgba(228,224,221,0.35)" }}
            >
              Contacto
            </p>
            <div className="flex flex-col gap-3 mb-8">
              <a
                href="mailto:contacto@pgestrategias.com"
                className="link-underline font-body text-[14px] transition-colors duration-500 hover:text-[color:#E4E0DD] w-fit"
                style={{ color: "rgba(228,224,221,0.6)" }}
              >
                contacto@pgestrategias.com
              </a>
              <a
                href="https://wa.me/5212221215051"
                className="link-underline font-body text-[14px] transition-colors duration-500 hover:text-[color:#E4E0DD] w-fit"
                style={{ color: "rgba(228,224,221,0.6)" }}
              >
                +52 222 121 5051
              </a>
            </div>
            <p
              className="font-body text-[11px] uppercase tracking-[0.14em] mb-3"
              style={{ color: "rgba(228,224,221,0.35)" }}
            >
              Oficina
            </p>
            <p
              className="font-body text-[13px] leading-relaxed"
              style={{ color: "rgba(228,224,221,0.5)" }}
            >
              Calle Valencia 131-2, Las Palmas,
              <br />
              Puebla, México
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pt-6"
          style={{ borderTop: "1px solid rgba(228,224,221,0.08)" }}
        >
          <p
            className="font-body text-[11px]"
            style={{ color: "rgba(228,224,221,0.3)" }}
          >
            © 2026 PG Estrategias · Growth Partners · Puebla
          </p>
          <p
            className="font-body text-[11px]"
            style={{ color: "rgba(228,224,221,0.22)" }}
          >
            Todos los precios en MXN, sin IVA.
          </p>
        </div>
      </div>
    </footer>
  );
}
