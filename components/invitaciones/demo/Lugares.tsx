"use client";
import React from "react";
import { motion } from "framer-motion";
import { SEDES } from "@/lib/invitaciones/demo";
import { descargarICS, urlMaps, urlWaze } from "@/lib/invitaciones/calendario";

function IconoPin() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconoCalendario() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 11h18" />
    </svg>
  );
}

/**
 * En vez de incrustar un iframe de Google Maps —que pesa cerca de un mega y
 * tarda en pintar— van botones directos a Maps y a Waze. Abren la app nativa
 * con la ruta ya cargada, que es lo único que el invitado quiere.
 */
export default function Lugares() {
  return (
    <section id="donde" className="bodas-dark py-20 md:py-28 relative">
      <div className="absolute top-0 left-0 right-0 h-px bodas-rule" />

      <div className="bodas-container max-w-4xl">
        <div className="text-center mb-14">
          <p className="bodas-label mb-4">Cuándo y dónde</p>
          <h2 className="bodas-title">
            Dos lugares, <span className="bodas-em">el mismo día</span>
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {SEDES.map((sede, i) => (
            <motion.div
              key={sede.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bodas-card-dark p-7 flex flex-col"
            >
              <p
                className="font-body text-[10px] uppercase tracking-[0.2em] mb-4"
                style={{ color: "#C4A052" }}
              >
                {sede.etiqueta}
              </p>

              <h3 className="bodas-heading text-2xl mb-2">{sede.nombre}</h3>

              <p
                className="bodas-heading text-3xl mb-4"
                style={{ color: "#C4A052" }}
              >
                {sede.hora}
              </p>

              <p
                className="font-body text-[13.5px] leading-[1.7] mb-7"
                style={{ color: "rgba(247,243,238,0.55)" }}
              >
                {sede.direccion}
              </p>

              <div className="mt-auto flex flex-wrap gap-2.5">
                <a
                  href={urlMaps(sede.lat, sede.lng, sede.nombre)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bodas-btn-outline !py-2.5 !px-4 !text-[12px]"
                >
                  <IconoPin />
                  Google Maps
                </a>
                <a
                  href={urlWaze(sede.lat, sede.lng)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bodas-btn-outline !py-2.5 !px-4 !text-[12px]"
                >
                  <IconoPin />
                  Waze
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            type="button"
            onClick={descargarICS}
            className="bodas-btn-gold"
          >
            <IconoCalendario />
            Agregar a mi calendario
          </button>
          <p
            className="font-body text-[12px] mt-4"
            style={{ color: "rgba(247,243,238,0.4)" }}
          >
            Se guarda en tu celular con recordatorio un día antes.
          </p>
        </div>
      </div>
    </section>
  );
}
