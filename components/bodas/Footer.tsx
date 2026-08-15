import React from "react";

export default function BodasFooter() {
  return (
    <footer className="bg-black border-t border-white/5 py-16">
      <div className="bodas-container">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div className="flex flex-col gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/bodas/logotipo.svg"
              alt="Oasis Creativa"
              className="h-6 w-auto"
            />
            <p className="text-white/30 text-sm max-w-xs">
              Videografía cinematográfica para bodas.
              <br />
              Oasis Creativa × PG Estrategias.
            </p>
          </div>

          <div className="flex gap-16">
            <div className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-[0.2em] text-[#C9A050]/50 mb-1">
                Secciones
              </p>
              <a href="#servicios" className="text-sm text-white/50 hover:text-white transition-colors">
                Servicios
              </a>
              <a href="#paquetes" className="text-sm text-white/50 hover:text-white transition-colors">
                Paquetes
              </a>
              <a href="#contacto" className="text-sm text-white/50 hover:text-white transition-colors">
                Contacto
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-[0.2em] text-[#C9A050]/50 mb-1">
                Contacto
              </p>
              <a
                href="https://wa.me/528141558165"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/50 hover:text-white transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} Oasis Creativa. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
