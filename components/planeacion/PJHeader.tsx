"use client";
import React, { useEffect, useState } from "react";
import { whatsappUrl, type NavLink } from "@/components/bodas/contacto";
import { PJ } from "./marca";

type Props = {
  links: NavLink[];
  ctaLabel: string;
  ctaMessage: string;
};

/* Cabecera clara para la marca de Paola Jiménez: monograma en bronce sobre
   marfil, a diferencia de la cabecera oscura de PG Event Films. */
export default function PJHeader({ links, ctaLabel, ctaMessage }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const solido = scrolled || menuOpen;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: solido ? "rgba(248,246,241,0.94)" : "transparent",
        backdropFilter: solido ? "blur(14px)" : "none",
        WebkitBackdropFilter: solido ? "blur(14px)" : "none",
        borderBottom: solido ? "1px solid rgba(140,94,69,0.18)" : "1px solid transparent",
      }}
    >
      <div className="bodas-container flex items-center justify-between h-20">
        <a href="#inicio" className="flex items-center gap-3 transition-opacity duration-500 hover:opacity-80">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={PJ.monograma} alt="" width={46} height={44} style={{ height: 44, width: "auto" }} />
          <span className="flex flex-col leading-none" style={{ color: "var(--b-rose)" }}>
            <span className="pj-caps text-[13px] md:text-[14px]">{PJ.nombre}</span>
            <span className="pj-script text-[20px] md:text-[22px] -mt-0.5">{PJ.linea}</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-[12px] tracking-[0.1em] transition-colors duration-500 hover:text-[color:var(--b-rose)]"
              style={{ color: "var(--b-muted-light)" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={whatsappUrl(ctaMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="bodas-btn-ink !py-2.5 !px-5 !text-[12px]"
          >
            {ctaLabel}
          </a>
        </nav>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          <span className="w-5 h-px block" style={{ background: "var(--b-ink)" }} />
          <span
            className="h-px block transition-all duration-300"
            style={{ background: "var(--b-ink)", width: menuOpen ? "1.25rem" : "0.875rem" }}
          />
        </button>
      </div>

      {menuOpen && (
        <div
          className="md:hidden bodas-container py-10 flex flex-col gap-5 min-h-screen"
          style={{ background: "rgba(248,246,241,0.98)", borderTop: "1px solid rgba(140,94,69,0.18)" }}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="bodas-heading text-3xl"
              style={{ color: "var(--b-ink)" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={whatsappUrl(ctaMessage)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="bodas-btn-ink mt-3 self-start"
          >
            {ctaLabel}
          </a>
        </div>
      )}
    </header>
  );
}
