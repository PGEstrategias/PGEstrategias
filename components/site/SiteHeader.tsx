"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import WhatsAppIcon from "./WhatsAppIcon";
import { NAV_LINKS, waLink } from "@/lib/site";
import s from "./site.module.css";

/* Menú principal. `overHero` deja el encabezado transparente mientras está
   sobre el video del hero y lo vuelve sólido al hacer scroll. */
export default function SiteHeader({ overHero = false }: { overHero?: boolean }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(!overHero);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!overHero) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overHero]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  const links = (
    <ul className={s.navList}>
      {NAV_LINKS.map((l) => (
        <li key={l.href}>
          <Link
            href={l.href}
            prefetch={false}
            className={s.navLink}
            aria-current={isActive(l.href) ? "page" : undefined}
          >
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <header className={`${s.header} ${solid ? s.solid : ""}`}>
      <div className={s.bar}>
        <Link href="/" className={s.brand} prefetch={false}>
          <Logo size={26} tone={solid ? "dark" : "cream"} />
        </Link>

        <nav className={s.nav} aria-label="Principal">
          {links}
        </nav>

        <div className={s.right}>
          <a className={s.wa} href={waLink()} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
            <span className={s.waLabel}>WhatsApp</span>
          </a>
          <button
            type="button"
            className={s.burger}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
          </button>
        </div>
      </div>

      <nav
        id="menu-movil"
        className={`${s.panel} ${open ? s.panelOpen : ""}`}
        aria-label="Menú móvil"
      >
        {links}
      </nav>
    </header>
  );
}
