"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useContactMenu } from "@/context/ContactMenuContext";
import Logo from "@/components/Logo";
import { legalLinks } from "@/components/legalLinks";

const MSG_NAVBAR =
  "Hola, me interesa saber más sobre los servicios de PG Estrategias. ¿Podemos hablar?";

const links = [
  { label: "Servicios", href: "#servicios" },
  { label: "Metodología", href: "#metodologia" },
  { label: "Paquetes", href: "#paquetes" },
  { label: "Nuestro trabajo", href: "/nuestrotrabajo", external: true },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { open: openContact } = useContactMenu();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const homeHeroIsLight = isHome; // Home tiene hero crema
  const hrefFor = useMemo(
    () => (link: { href: string; external?: boolean }) => {
      if (link.external) return link.href;
      return isHome ? link.href : `/${link.href}`;
    },
    [isHome]
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) {
      setActiveSection("");
      return;
    }
    const sectionIds = links
      .filter((l) => !l.external)
      .map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -40% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Determinar apariencia según scroll y tipo de hero
  const useLightSurface = scrolled || !homeHeroIsLight ? false : true;
  const textColor = useLightSurface
    ? "#1C1C1A"
    : "#E4E0DD";
  const textColorMuted = useLightSurface
    ? "rgba(28,28,26,0.55)"
    : "rgba(228,224,221,0.55)";
  const borderColor = useLightSurface
    ? "rgba(28,28,26,0.28)"
    : "rgba(228,224,221,0.3)";
  const logoTone: "cream" | "dark" = useLightSurface ? "dark" : "cream";
  const barColor = useLightSurface ? "#1C1C1A" : "#E4E0DD";

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(28,28,26,0.9)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(228,224,221,0.08)"
            : "none",
        }}
      >
        <div className="flex items-center justify-between px-8 md:px-14 h-20 max-w-[1300px] mx-auto">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center transition-opacity duration-500 hover:opacity-80"
          >
            <Logo size={30} tone={scrolled ? "cream" : logoTone} />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-9">
            {links.map((link) => {
              const isActive =
                !link.external && activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={hrefFor(link)}
                  className="relative group font-body text-[12px] tracking-[0.08em] transition-colors duration-500"
                  style={{
                    color: isActive
                      ? scrolled
                        ? "#E4E0DD"
                        : textColor
                      : scrolled
                      ? "rgba(228,224,221,0.55)"
                      : textColorMuted,
                  }}
                >
                  {link.label}
                  <span
                    className="absolute -bottom-1 left-0 h-px origin-left transition-transform duration-500"
                    style={{
                      width: "100%",
                      background: "#D63A27",
                      transform: isActive ? "scaleX(1)" : "scaleX(0)",
                    }}
                  />
                  <span
                    className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                    style={{ background: "rgba(214,58,39,0.5)" }}
                  />
                </a>
              );
            })}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => openContact(MSG_NAVBAR)}
              className="hidden md:inline-flex relative overflow-hidden group items-center gap-2 font-body text-[12px] tracking-wide px-5 py-2.5 transition-colors duration-500"
              style={{
                border: `1px solid ${scrolled ? "rgba(228,224,221,0.3)" : borderColor}`,
                color: scrolled ? "#E4E0DD" : textColor,
              }}
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                style={{ background: "#D63A27" }}
              />
              <span
                className="relative transition-colors duration-500 group-hover:text-[#E4E0DD]"
              >
                Agenda una llamada
              </span>
            </button>
            <button
              className="md:hidden flex flex-col gap-1.5 p-1"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
            >
              <span
                className="w-5 h-px block"
                style={{ background: scrolled ? "#E4E0DD" : barColor }}
              />
              <span
                className="w-3.5 h-px block"
                style={{ background: scrolled ? "#E4E0DD" : barColor }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] flex flex-col"
            style={{ background: "rgba(28,28,26,0.98)" }}
          >
            <div
              className="flex items-center justify-between px-8 h-20"
              style={{ borderBottom: "1px solid rgba(228,224,221,0.08)" }}
            >
              <Logo size={26} tone="cream" />
              <button
                onClick={() => setMenuOpen(false)}
                className="font-body text-[11px] tracking-[0.16em] uppercase transition-colors duration-500"
                style={{ color: "rgba(228,224,221,0.5)" }}
                aria-label="Cerrar menú"
              >
                cerrar ×
              </button>
            </div>
            <div className="flex flex-col justify-center flex-1 px-8 gap-2">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={hrefFor(link)}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.1, duration: 0.5 }}
                  className="font-title py-4 transition-colors duration-500 hover:text-[color:#D63A27]"
                  style={{
                    fontSize: "clamp(32px, 8vw, 52px)",
                    fontWeight: 400,
                    borderBottom: "1px solid rgba(228,224,221,0.08)",
                    letterSpacing: "-0.02em",
                    color: "#E4E0DD",
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.button
                onClick={() => {
                  setMenuOpen(false);
                  openContact(MSG_NAVBAR);
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.42, duration: 0.5 }}
                className="mt-8 inline-block font-title font-bold text-[13px] tracking-wide px-6 py-3.5 self-start transition-opacity duration-500 hover:opacity-85"
                style={{ background: "#D63A27", color: "#E4E0DD" }}
              >
                Agenda una llamada
              </motion.button>

              {/* Legal — secundario, no compite con la navegación */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex flex-wrap gap-x-5 gap-y-2 mt-10"
              >
                {legalLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-body text-[12px] transition-colors duration-500 hover:text-[color:#E4E0DD]"
                    style={{ color: "rgba(228,224,221,0.45)" }}
                  >
                    {link.label}
                  </a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
