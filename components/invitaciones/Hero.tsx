"use client";
import React from "react";
import { motion } from "framer-motion";
import { whatsappUrl } from "@/components/bodas/contacto";
import WhatsAppIcon from "@/components/bodas/WhatsAppIcon";

const MSG_HERO =
  "Hola, me interesan las invitaciones digitales con confirmación automática para mi boda.";

/* Muestra estática de la invitación: sirve de "producto" en el hero
   sin depender de imágenes externas. */
function InvitacionPreview() {
  return (
    <div className="bodas-frame relative bg-[#F7F3EE] text-[#14120F] px-8 py-12 md:px-14 md:py-16 text-center">
      <p
        className="font-body text-[10px] uppercase tracking-[0.28em] mb-7"
        style={{ color: "#A85E56" }}
      >
        Nos casamos
      </p>

      <p className="bodas-heading text-4xl md:text-5xl leading-tight">
        María
        <span className="mx-3" style={{ color: "#C4A052" }}>
          &amp;
        </span>
        Carlos
      </p>

      <div className="bodas-ornament my-7" aria-hidden>
        <span
          style={{
            display: "block",
            width: 5,
            height: 5,
            transform: "rotate(45deg)",
            background: "#C4A052",
          }}
        />
      </div>

      <p
        className="font-body text-[12px] tracking-[0.16em] uppercase"
        style={{ color: "#4A443D" }}
      >
        Sábado 14 de marzo · 17:00 h
      </p>
      <p
        className="font-body text-[12px] tracking-[0.16em] uppercase mt-1.5"
        style={{ color: "#4A443D" }}
      >
        Hacienda San Miguel · Puebla
      </p>

      {/* Bloque RSVP — el corazón del producto */}
      <div
        className="mt-9 pt-7"
        style={{ borderTop: "1px solid rgba(196,160,82,0.35)" }}
      >
        <p
          className="font-body text-[11px] uppercase tracking-[0.2em] mb-4"
          style={{ color: "#4A443D" }}
        >
          ¿Nos acompañas?
        </p>
        <div className="flex items-center justify-center gap-3">
          <span
            className="font-body text-[12px] px-6 py-2.5"
            style={{ background: "#C4A052", color: "#14120F" }}
          >
            Confirmar asistencia
          </span>
          <span
            className="font-body text-[12px] px-6 py-2.5"
            style={{
              border: "1px solid rgba(20,18,15,0.2)",
              color: "#4A443D",
            }}
          >
            No podré ir
          </span>
        </div>
        <p
          className="font-body text-[11px] mt-5"
          style={{ color: "rgba(74,68,61,0.7)" }}
        >
          2 pases reservados a tu nombre
        </p>
      </div>
    </div>
  );
}

export default function InvitacionesHero() {
  return (
    <section className="bodas-dark relative min-h-screen overflow-hidden">
      <motion.div
        aria-hidden
        className="absolute pointer-events-none z-[1]"
        style={{
          top: "-15%",
          left: "-10%",
          width: "55vw",
          height: "55vw",
          background:
            "radial-gradient(circle, rgba(231,201,196,0.15) 0%, transparent 62%)",
          filter: "blur(65px)",
        }}
        animate={{ x: [0, 20, 0], y: [0, 18, 0] }}
        transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        aria-hidden
        className="absolute pointer-events-none z-[1]"
        style={{
          bottom: "-8%",
          right: "-8%",
          width: "50vw",
          height: "50vw",
          background:
            "radial-gradient(circle, rgba(196,160,82,0.16) 0%, transparent 64%)",
          filter: "blur(70px)",
        }}
        animate={{ x: [0, -22, 0], y: [0, -14, 0] }}
        transition={{ duration: 16, ease: "easeInOut", repeat: Infinity }}
      />

      <div className="bodas-container relative z-10 pt-32 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-center">
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="bodas-label mb-7">
              Invitaciones digitales · PG Estrategias
            </p>

            <h1 className="bodas-display bodas-display-split">
              Tu invitación,{" "}
              <span className="bodas-em">sin perseguir a nadie</span>
            </h1>

            <p className="bodas-subtitle mt-8 mx-auto lg:mx-0">
              Una invitación web con tu historia, tu música y tu mapa. Detrás,
              un sistema que confirma a tus invitados, les manda su pase y te
              entrega la lista lista para el banquetero.
            </p>

            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mt-10">
              <a href="#paquetes" className="bodas-btn-gold">
                Ver paquetes
              </a>
              <a
                href={whatsappUrl(MSG_HERO)}
                target="_blank"
                rel="noopener noreferrer"
                className="bodas-btn-outline"
              >
                <WhatsAppIcon />
                Contáctanos
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <InvitacionPreview />
            <p
              className="text-center font-body text-[11px] uppercase tracking-[0.2em] mt-8"
              style={{ color: "rgba(247,243,238,0.38)" }}
            >
              Ejemplo — cada invitación se diseña con su historia
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
