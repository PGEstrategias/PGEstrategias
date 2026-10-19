"use client";
import React from "react";
import { motion } from "framer-motion";
import { whatsappUrl } from "@/components/bodas/contacto";
import WhatsAppIcon from "@/components/bodas/WhatsAppIcon";
import { PJ } from "./marca";

const MSG = "Hola, quiero información sobre los servicios de wedding planner de Paola Jiménez para mi boda.";
const EASE = [0.16, 1, 0.3, 1] as const;

export default function PlaneacionHero() {
  return (
    <section id="inicio" className="bodas-light pj-hero relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="bodas-container grid grid-cols-1 md:grid-cols-12 gap-14 md:gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="md:col-span-7"
        >
          <p className="bodas-label bodas-label-ink mb-6">Wedding planner · Puebla y Cholula</p>

          <h1 className="bodas-display bodas-display-split">
            Que el único trabajo del día sea <em className="bodas-em">disfrutarlo</em>.
          </h1>

          <p className="bodas-subtitle mt-8">
            Dos formas de acompañarlos: coordinar el día para que nada se les salga de las manos, o
            tomar la boda completa desde el concepto hasta el último invitado que se va.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-11">
            <a href={whatsappUrl(MSG)} target="_blank" rel="noopener noreferrer" className="bodas-btn-ink">
              <WhatsAppIcon />
              Platiquemos de su boda
            </a>
            <a href="#paquetes" className="bodas-btn-outline">
              Ver los dos paquetes
            </a>
          </div>

          <p className="pj-caps mt-12 text-[11px]" style={{ color: "var(--b-rose)", letterSpacing: "0.38em" }}>
            {PJ.lema.join("  ·  ")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: EASE }}
          className="md:col-span-5 flex flex-col items-center"
        >
          <div className="pj-panel w-full max-w-[290px] md:max-w-[400px] aspect-[4/5] flex items-center justify-center px-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PJ.logoMarfil}
              alt={`${PJ.nombre} ${PJ.linea}`}
              width={1000}
              height={647}
              fetchPriority="high"
              className="w-full h-auto"
            />
          </div>
          <a
            href="/eventfilms"
            className="pj-script mt-5 text-[26px] transition-opacity duration-500 hover:opacity-70"
            style={{ color: "var(--b-rose)" }}
          >
            {PJ.firma}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
