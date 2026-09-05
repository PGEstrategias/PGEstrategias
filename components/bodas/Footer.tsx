import React from "react";
import Logo from "@/components/Logo";
import { legalLinks } from "@/components/legalLinks";
import {
  EMAIL,
  GOLD,
  WHATSAPP_DISPLAY,
  WHATSAPP_URL,
  type NavLink,
} from "@/components/bodas/contacto";

type Props = {
  tagline: string;
  links: NavLink[];
};

const labelStyle = {
  color: "rgba(247,243,238,0.4)",
} as const;

const linkStyle = {
  color: "rgba(247,243,238,0.62)",
} as const;

export default function BodasFooter({ tagline, links }: Props) {
  return (
    <footer
      className="bodas-dark"
      style={{ borderTop: "1px solid rgba(196,160,82,0.22)" }}
    >
      <div className="bodas-container pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Marca */}
          <div className="md:col-span-4">
            <a
              href="/"
              className="inline-flex mb-6 transition-opacity duration-500 hover:opacity-80"
            >
              <Logo size={26} tone="cream" accent={GOLD} />
            </a>
            <p
              className="font-body text-[13px] leading-[1.75] max-w-[260px]"
              style={{ color: "rgba(247,243,238,0.5)" }}
            >
              {tagline}
            </p>
          </div>

          {/* Navegación */}
          <div className="md:col-span-3 md:col-start-6">
            <p
              className="font-body text-[11px] uppercase tracking-[0.2em] mb-6"
              style={labelStyle}
            >
              Navegación
            </p>
            <div className="flex flex-col gap-3">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-body text-[14px] transition-colors duration-500 w-fit hover:text-[color:#C4A052]"
                  style={linkStyle}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <p
              className="font-body text-[11px] uppercase tracking-[0.2em] mt-10 mb-6"
              style={labelStyle}
            >
              Legal
            </p>
            <div className="flex flex-col gap-3">
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-body text-[14px] transition-colors duration-500 w-fit hover:text-[color:#C4A052]"
                  style={linkStyle}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contacto */}
          <div className="md:col-span-4 md:col-start-9">
            <p
              className="font-body text-[11px] uppercase tracking-[0.2em] mb-6"
              style={labelStyle}
            >
              Contacto
            </p>
            <div className="flex flex-col gap-3 mb-8">
              <a
                href={`mailto:${EMAIL}`}
                className="font-body text-[14px] transition-colors duration-500 w-fit hover:text-[color:#C4A052]"
                style={linkStyle}
              >
                {EMAIL}
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-[14px] transition-colors duration-500 w-fit hover:text-[color:#C4A052]"
                style={linkStyle}
              >
                {WHATSAPP_DISPLAY}
              </a>
            </div>
            <p
              className="font-body text-[11px] uppercase tracking-[0.2em] mb-3"
              style={labelStyle}
            >
              Oficina
            </p>
            <p
              className="font-body text-[13px] leading-relaxed"
              style={{ color: "rgba(247,243,238,0.5)" }}
            >
              Calle Valencia 131-2, Las Palmas,
              <br />
              Puebla, México
            </p>
          </div>
        </div>

        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pt-6"
          style={{ borderTop: "1px solid rgba(247,243,238,0.1)" }}
        >
          <p
            className="font-body text-[11px]"
            style={{ color: "rgba(247,243,238,0.32)" }}
          >
            © {new Date().getFullYear()} PG Estrategias · Growth Partners · Puebla
          </p>
          <p
            className="font-body text-[11px]"
            style={{ color: "rgba(247,243,238,0.24)" }}
          >
            Todos los precios en MXN, sin IVA.
          </p>
        </div>
      </div>
    </footer>
  );
}
