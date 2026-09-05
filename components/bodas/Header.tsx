"use client";
import React, { useState, useEffect } from "react";
import Logo from "@/components/Logo";
import { GOLD, whatsappUrl, type NavLink } from "@/components/bodas/contacto";

type Props = {
  links: NavLink[];
  ctaLabel: string;
  ctaMessage: string;
};

export default function BodasHeader({ links, ctaLabel, ctaMessage }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(20,18,15,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(196,160,82,0.22)" : "none",
      }}
    >
      <div className="bodas-container flex items-center justify-between h-20">
        <a
          href="/"
          className="flex items-center transition-opacity duration-500 hover:opacity-80"
          aria-label="Ir al inicio de PG Estrategias"
        >
          <Logo size={30} tone="cream" accent={GOLD} />
        </a>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-9">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-[12px] tracking-[0.1em] transition-colors duration-500"
              style={{ color: "rgba(247,243,238,0.6)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(247,243,238,0.6)")
              }
            >
              {link.label}
            </a>
          ))}
          <a
            href={whatsappUrl(ctaMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="bodas-btn-outline !py-2.5 !px-5 !text-[12px]"
          >
            {ctaLabel}
          </a>
        </nav>

        {/* Mobile */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
        >
          <span className="w-5 h-px block" style={{ background: GOLD }} />
          <span
            className="h-px block transition-all duration-300"
            style={{ background: GOLD, width: menuOpen ? "1.25rem" : "0.875rem" }}
          />
        </button>
      </div>

      {menuOpen && (
        <div
          className="md:hidden bodas-container py-10 flex flex-col gap-5"
          style={{
            background: "rgba(20,18,15,0.98)",
            borderTop: "1px solid rgba(196,160,82,0.22)",
          }}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="bodas-heading text-3xl"
              style={{ color: "#F7F3EE" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={whatsappUrl(ctaMessage)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="bodas-btn-gold mt-3 self-start"
          >
            {ctaLabel}
          </a>
        </div>
      )}
    </header>
  );
}
