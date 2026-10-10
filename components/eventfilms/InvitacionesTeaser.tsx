"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FOTOS, NOVIOS, FECHA_CORTA, foto } from "@/lib/invitaciones/demo";

/* Invitaciones digitales dentro de PG Event Films: un teléfono que flota
   con la portada del demo y los dos enlaces a los demos reales. */
export default function InvitacionesTeaser() {
  const reduce = useReducedMotion();
  return (
    <section id="invitaciones" className="bodas-blush py-24 md:py-32 overflow-hidden">
      <div className="bodas-container grid gap-14 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="bodas-label bodas-label-ink mb-5">Invitaciones digitales</p>
          <h2 className="bodas-title">
            La invitación también <span className="bodas-em-rose">se vive</span>
          </h2>
          <p className="bodas-subtitle mt-6">
            Tu historia, música, ubicaciones, código de vestimenta y confirmación de
            asistencia en una sola invitación que se abre en el celular. Para bodas,
            XV años y cualquier celebración.
          </p>
          <ul className="mt-8 grid gap-3 font-body text-[15px]" style={{ color: "#3A332C" }}>
            {[
              "Confirmaciones ordenadas en Excel, sin perseguir a nadie",
              "Pase digital o PDF con el nombre de cada invitado",
              "Música, cuenta regresiva y mapas con un toque",
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <span aria-hidden style={{ color: "#8C3A45" }}>✦</span>
                {t}
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-3 mt-10">
            <a href="/invitacionesdebodas/demo/estandar" className="bodas-btn-ink">
              Ver demo
            </a>
            <a href="/invitacionesdebodas" className="bodas-btn-outline" style={{ color: "#8C3A45", borderColor: "rgba(140,58,69,0.45)" }}>
              Paquetes de invitaciones
            </a>
          </div>
        </div>

        <div className="relative flex justify-center">
          <div aria-hidden className="absolute w-[420px] h-[420px] rounded-full" style={{ background: "radial-gradient(circle, rgba(210,174,109,0.45), transparent 65%)", filter: "blur(30px)" }} />
          <motion.a
            href="/invitacionesdebodas/demo/estandar"
            className="relative block w-[270px] sm:w-[300px] rounded-[44px] p-3"
            style={{ background: "#14110F", boxShadow: "0 40px 80px -30px rgba(20,17,15,0.55)" }}
            animate={reduce ? undefined : { y: [0, -14, 0], rotate: [-2, 1, -2] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="relative overflow-hidden rounded-[34px] aspect-[9/19.5]" style={{ background: "#14110F" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={foto(FOTOS.cafe, 600)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-40 bodas-kenburns" />
              <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(20,17,15,0.35), rgba(20,17,15,0.9) 75%)" }} />
              <div className="absolute top-3 left-1/2 -translate-x-1/2 h-6 w-24 rounded-full bg-black" />
              <div className="relative h-full flex flex-col items-center justify-center text-center px-6" style={{ color: "#F7F2EA" }}>
                <p className="bodas-label" style={{ fontSize: 9 }}>Nos casamos</p>
                <p className="bodas-heading text-5xl mt-4 leading-none">{NOVIOS.ella}</p>
                <p className="bodas-heading italic text-2xl my-1" style={{ color: "#D2AE6D" }}>&amp;</p>
                <p className="bodas-heading text-5xl leading-none">{NOVIOS.el}</p>
                <p className="font-body text-[10px] tracking-[0.25em] mt-6" style={{ color: "rgba(247,242,234,0.7)" }}>{FECHA_CORTA}</p>
                <span className="mt-8 rounded-full px-5 py-2.5 font-body text-[11px] font-semibold" style={{ background: "#D2AE6D", color: "#14110F" }}>
                  Confirmar asistencia
                </span>
              </div>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
