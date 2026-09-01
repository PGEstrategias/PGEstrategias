import React from "react";
import Logo from "@/components/Logo";
import { legalLinks } from "@/components/legalLinks";
import { EMAIL, WHATSAPP_DISPLAY, WHATSAPP_URL } from "@/components/bodas/contacto";

const secciones = [
  { label: "Servicios", href: "#servicios" },
  { label: "Paquetes", href: "#paquetes" },
  { label: "Contacto", href: "#contacto" },
  { label: "Nuestro trabajo", href: "/nuestrotrabajo" },
];

export default function BodasFooter() {
  return (
    <footer style={{ borderTop: "1px solid rgba(228,224,221,0.08)" }}>
      <div className="bodas-container pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Marca */}
          <div className="md:col-span-4">
            <a
              href="/"
              className="inline-flex mb-6 transition-opacity duration-500 hover:opacity-80"
            >
              <Logo size={26} tone="cream" />
            </a>
            <p
              className="font-body text-[13px] leading-[1.7] max-w-[250px]"
              style={{ color: "rgba(228,224,221,0.5)" }}
            >
              Producción audiovisual con calidad de cine para el día más
              importante de tu vida.
            </p>
          </div>

          {/* Navegación */}
          <div className="md:col-span-3 md:col-start-6">
            <p
              className="font-body text-[11px] uppercase tracking-[0.14em] mb-6"
              style={{ color: "rgba(228,224,221,0.35)" }}
            >
              Navegación
            </p>
            <div className="flex flex-col gap-3">
              {secciones.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="link-underline font-body text-[14px] transition-colors duration-500 w-fit hover:text-[color:#E4E0DD]"
                  style={{ color: "rgba(228,224,221,0.6)" }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <p
              className="font-body text-[11px] uppercase tracking-[0.14em] mt-10 mb-6"
              style={{ color: "rgba(228,224,221,0.35)" }}
            >
              Legal
            </p>
            <div className="flex flex-col gap-3">
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="link-underline font-body text-[14px] transition-colors duration-500 w-fit hover:text-[color:#E4E0DD]"
                  style={{ color: "rgba(228,224,221,0.6)" }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contacto */}
          <div className="md:col-span-4 md:col-start-9">
            <p
              className="font-body text-[11px] uppercase tracking-[0.14em] mb-6"
              style={{ color: "rgba(228,224,221,0.35)" }}
            >
              Contacto
            </p>
            <div className="flex flex-col gap-3 mb-8">
              <a
                href={`mailto:${EMAIL}`}
                className="link-underline font-body text-[14px] transition-colors duration-500 w-fit hover:text-[color:#E4E0DD]"
                style={{ color: "rgba(228,224,221,0.6)" }}
              >
                {EMAIL}
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline font-body text-[14px] transition-colors duration-500 w-fit hover:text-[color:#E4E0DD]"
                style={{ color: "rgba(228,224,221,0.6)" }}
              >
                {WHATSAPP_DISPLAY}
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

        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pt-6"
          style={{ borderTop: "1px solid rgba(228,224,221,0.08)" }}
        >
          <p
            className="font-body text-[11px]"
            style={{ color: "rgba(228,224,221,0.3)" }}
          >
            © {new Date().getFullYear()} PG Estrategias · Growth Partners · Puebla
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
