"use client";
import React, { useState, useEffect } from "react";
import Logo from "@/components/Logo";
import { WHATSAPP_URL } from "@/components/bodas/contacto";

const links = [
  { label: "Servicios", href: "#servicios" },
  { label: "Paquetes", href: "#paquetes" },
  { label: "Contacto", href: "#contacto" },
];

export default function BodasHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(28,28,26,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(228,224,221,0.08)" : "none",
      }}
    >
      <div className="bodas-container flex items-center justify-between h-20">
        <a
          href="/"
          className="flex items-center transition-opacity duration-500 hover:opacity-80"
          aria-label="Ir al inicio de PG Estrategias"
        >
          <Logo size={30} tone="cream" />
        </a>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-9">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="link-underline font-body text-[12px] tracking-[0.08em] transition-colors duration-500 hover:text-[color:#E4E0DD]"
              style={{ color: "rgba(228,224,221,0.55)" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-sweep relative font-body text-[12px] tracking-wide px-5 py-2.5 transition-colors duration-500 hover:text-[color:#E4E0DD]"
            style={{
              border: "1px solid rgba(228,224,221,0.3)",
              color: "#E4E0DD",
            }}
          >
            <span className="relative">Reservar fecha</span>
          </a>
        </nav>

        {/* Mobile */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
        >
          <span className="w-5 h-px block" style={{ background: "#E4E0DD" }} />
          <span
            className="h-px block transition-all duration-300"
            style={{ background: "#E4E0DD", width: menuOpen ? "1.25rem" : "0.875rem" }}
          />
        </button>
      </div>

      {menuOpen && (
        <div
          className="md:hidden bodas-container py-8 flex flex-col gap-6"
          style={{
            background: "rgba(28,28,26,0.98)",
            borderTop: "1px solid rgba(228,224,221,0.08)",
          }}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-title text-3xl transition-colors duration-500 hover:text-[color:#D63A27]"
              style={{ color: "#E4E0DD", letterSpacing: "-0.02em" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="bodas-btn-primary mt-2 self-start"
          >
            Reservar fecha
          </a>
        </div>
      )}
    </header>
  );
}
