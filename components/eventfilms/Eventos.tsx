"use client";

import { motion } from "framer-motion";
import { whatsappUrl } from "@/components/bodas/contacto";
import { EVENTOS } from "./data";

const FONDOS = [
  "radial-gradient(circle at 30% 20%, rgba(210,174,109,0.55), transparent 55%), radial-gradient(circle at 80% 80%, rgba(140,58,69,0.5), transparent 60%), #1E1A17",
  "radial-gradient(circle at 75% 25%, rgba(234,203,194,0.45), transparent 55%), radial-gradient(circle at 15% 85%, rgba(210,174,109,0.4), transparent 60%), #1E1A17",
  "radial-gradient(circle at 25% 30%, rgba(140,58,69,0.6), transparent 55%), radial-gradient(circle at 85% 75%, rgba(230,203,151,0.35), transparent 60%), #1E1A17",
];

/* Un tipo de evento por tarjeta. La de bodas lleva foto; las demás, un
   fondo de luz champaña para no inventar imágenes que no tenemos. */
export default function Eventos() {
  return (
    <section id="eventos" className="bodas-light py-24 md:py-32">
      <div className="bodas-container">
        <div className="text-center mb-14 md:mb-16">
          <p className="bodas-label bodas-label-ink mb-5">Eventos que filmamos</p>
          <h2 className="bodas-title">
            Cada celebración tiene <span className="bodas-em-rose">su propia película</span>
          </h2>
          <p className="bodas-subtitle mx-auto mt-6">
            Bodas, XV años, brindis y reuniones familiares. Cambia el evento; la
            calidad de cine y el cuidado por cada detalle, no.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {EVENTOS.map((e, i) => (
            <motion.a
              key={e.id}
              href={whatsappUrl(e.mensaje)}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col justify-end overflow-hidden rounded-[28px] min-h-[360px] p-7 text-left"
              style={{ background: "#14110F", color: "#F7F2EA" }}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
            >
              {e.imagen ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={e.imagen}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover opacity-70 transition-transform duration-[1.2s] group-hover:scale-110"
                />
              ) : (
                <div
                  aria-hidden
                  className="absolute inset-0 transition-transform duration-[1.2s] group-hover:scale-110"
                  style={{ background: FONDOS[i % FONDOS.length] }}
                />
              )}
              <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 30%, rgba(20,17,15,0.92))" }} />
              <span aria-hidden className="absolute top-6 left-7 bodas-heading italic text-6xl" style={{ color: "rgba(230,203,151,0.55)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative">
                <h3 className="bodas-heading text-3xl mb-2">{e.nombre}</h3>
                <p className="font-body text-[14px] leading-relaxed" style={{ color: "rgba(247,242,234,0.75)" }}>
                  {e.linea}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 font-body text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: "#E6CB97" }}>
                  Cotizar <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
