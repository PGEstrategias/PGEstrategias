"use client";
import React, { useState, useEffect } from "react";

const WHATSAPP = "https://wa.me/528141558165";

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="bodas-container flex items-center justify-between h-16 md:h-20">
        <a href="/bodas" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/bodas/logotipo.svg"
            alt="Oasis Creativa"
            className="h-6 md:h-7 w-auto"
          />
        </a>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-white/60">
          <a href="#servicios" className="hover:text-white transition-colors duration-200">
            Servicios
          </a>
          <a href="#paquetes" className="hover:text-white transition-colors duration-200">
            Paquetes
          </a>
          <a href="#contacto" className="hover:text-white transition-colors duration-200">
            Contacto
          </a>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-[#C9A050] to-[#E8C97A] text-black font-medium px-6 py-2.5 rounded-full text-xs tracking-wide hover:opacity-90 transition-opacity"
          >
            Reservar Fecha
          </a>
        </nav>

        {/* Mobile */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/5 px-6 py-8 flex flex-col gap-6">
          <a
            href="#servicios"
            onClick={() => setMenuOpen(false)}
            className="text-lg text-white/70 hover:text-white transition-colors"
          >
            Servicios
          </a>
          <a
            href="#paquetes"
            onClick={() => setMenuOpen(false)}
            className="text-lg text-white/70 hover:text-white transition-colors"
          >
            Paquetes
          </a>
          <a
            href="#contacto"
            onClick={() => setMenuOpen(false)}
            className="text-lg text-white/70 hover:text-white transition-colors"
          >
            Contacto
          </a>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="bg-gradient-to-r from-[#C9A050] to-[#E8C97A] text-black font-medium px-6 py-3 rounded-full w-full text-center"
          >
            Reservar Fecha
          </a>
        </div>
      )}
    </header>
  );
}
