"use client";
import React from "react";
import { motion } from "framer-motion";
import { whatsappUrl } from "@/components/bodas/contacto";
import WhatsAppIcon from "@/components/bodas/WhatsAppIcon";

const MSG = "Hola, quiero información sobre los servicios de wedding planner para mi boda.";

export default function PlaneacionHero() {
  return (
    <section className="bodas-dark relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="bodas-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <p className="bodas-label mb-6">Wedding planner · Puebla y Cholula</p>

          <h1 className="bodas-display bodas-display-split">
            Que el único trabajo del día
            <br />
            sea <em className="bodas-em">disfrutarlo</em>.
          </h1>

          <p className="bodas-subtitle mt-8">
            Dos formas de acompañarlos: coordinar el día para que nada se les salga de las manos, o
            tomar la boda completa desde el concepto hasta el último invitado que se va.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-11">
            <a
              href={whatsappUrl(MSG)}
              target="_blank"
              rel="noopener noreferrer"
              className="bodas-btn-gold"
            >
              <WhatsAppIcon />
              Platiquemos de su boda
            </a>
            <a href="#paquetes" className="bodas-btn-outline">
              Ver los dos paquetes
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
