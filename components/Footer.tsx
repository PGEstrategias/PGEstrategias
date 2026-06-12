"use client";

import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Metodología", href: "#metodologia" },
  { label: "Paquetes", href: "#paquetes" },
  { label: "FAQ", href: "#faq" },
  { label: "Agendar llamada", href: "#contacto" },
];

function InstagramIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="14" height="14" rx="3" />
      <circle cx="9" cy="9" r="3" />
      <circle cx="13" cy="5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="14" height="14" rx="2" />
      <path d="M6 8v5M6 6v.01M9 13v-2.5c0-1 .5-1.5 1.5-1.5s1.5.5 1.5 1.5V13" />
    </svg>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const hrefFor = (hash: string) => (isHome ? hash : `/${hash}`);
  return (
    <footer style={{ background: "#0D0D0D", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-[1300px] mx-auto px-8 md:px-16 pt-24 pb-10">

        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">

          {/* Brand — 4 cols */}
          <div className="md:col-span-4">
            <a href="/" className="flex items-center gap-2.5 mb-6 group">
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none" style={{ color: "#A6E22E" }}>
                <rect x="2" y="18" width="5" height="8" fill="currentColor" />
                <rect x="9" y="12" width="5" height="14" fill="currentColor" />
                <rect x="16" y="6" width="5" height="20" fill="currentColor" />
                <rect x="23" y="2" width="3" height="24" fill="currentColor" opacity="0.4" />
              </svg>
              <span className="font-title text-white text-[13px] tracking-[0.1em] uppercase" style={{ fontWeight: 700 }}>
                PG <span className="opacity-50 font-normal">Estrategias</span>
              </span>
            </a>
            <p
              className="font-body text-[13px] leading-[1.7] max-w-[220px] mb-6"
              style={{ color: "rgba(245,245,245,0.38)" }}
            >
              Growth Partners para negocios que ya saben cómo vender.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="transition-colors duration-500 hover:text-pg-lime"
                style={{ color: "rgba(255,255,255,0.35)" }}
                aria-label="Instagram de PG Estrategias"
              >
                <InstagramIcon />
              </a>
              <a
                href="#"
                className="transition-colors duration-500 hover:text-pg-lime"
                style={{ color: "rgba(255,255,255,0.35)" }}
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
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              Navegación
            </p>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={hrefFor(link.href)}
                  className="font-body text-[14px] transition-colors duration-500 hover:text-white w-fit"
                  style={{ color: "rgba(245,245,245,0.5)" }}
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
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              Contacto
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:contacto@pgestrategias.com"
                className="font-body text-[14px] transition-colors duration-500 hover:text-white"
                style={{ color: "rgba(245,245,245,0.5)" }}
              >
                contacto@pgestrategias.com
              </a>
              <a
                href="https://wa.me/5212221215051"
                className="font-body text-[14px] transition-colors duration-500 hover:text-white"
                style={{ color: "rgba(245,245,245,0.5)" }}
              >
                +52 222 121 5051
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pt-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="font-body text-[11px]" style={{ color: "rgba(245,245,245,0.2)" }}>
            © 2026 PG Estrategias · Growth Partners · Puebla
          </p>
          <p className="font-body text-[11px]" style={{ color: "rgba(245,245,245,0.15)" }}>
            Todos los precios en MXN, sin IVA.
          </p>
        </div>
      </div>
    </footer>
  );
}
