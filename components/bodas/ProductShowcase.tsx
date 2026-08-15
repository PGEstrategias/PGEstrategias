"use client";
import React from "react";
import { motion } from "framer-motion";

/* Los entregables mostrados aquí son los de los paquetes de abajo,
   para que la página no prometa nada que no esté incluido. */
const highlights = [
  {
    image:
      "https://res.cloudinary.com/dxcr9utre/image/upload/v1770334085/WhatsApp_Image_2026-02-05_at_5.21.14_PM_ayu139.jpg",
    title: "Tu equipo dedicado",
    description:
      "Videógrafo y camarógrafo con equipo de alta gama, tomas aéreas e iluminación profesional. Nada se escapa.",
  },
  {
    image:
      "https://res.cloudinary.com/dxcr9utre/image/upload/v1770334142/9837c6f78552d14f441722a0f80cafb0-xxlarge_x6grtm.jpg",
    title: "Cineminuto para compartir",
    description:
      "Hasta 120 segundos con lo mejor de tu boda — listo para compartir con familia y amigos.",
  },
  {
    image:
      "https://res.cloudinary.com/dxcr9utre/image/upload/v1770334370/91ebce557df7d97b598c4084a77f100f-xxlarge_w1dddt.jpg",
    title: "Sesiones que cuentan la historia",
    description:
      "First look y sesión familiar, además de la cobertura completa de ceremonia y fiesta.",
  },
  {
    image:
      "https://res.cloudinary.com/dxcr9utre/image/upload/v1770334085/cd1fbe2511c34500d1c8a86399579a25-xxlarge_uzzrte.jpg",
    title: "Video cinematográfico largo",
    description:
      "Hasta 15 minutos con las mejores tomas de tu día, editado con color y ritmo de cine.",
  },
];

export default function BodasProductShowcase() {
  return (
    <section id="servicios" className="py-24 md:py-32 bg-black relative">
      <div className="absolute top-0 left-0 right-0 h-px bodas-gold-line" />

      <div className="bodas-container">
        <div className="text-center mb-16">
          <p className="bodas-label mb-4">Lo que te llevas</p>
          <h2 className="bodas-title">
            No es solo un video,
            <br />
            <span className="italic text-white/60">es tu historia de amor</span>
          </h2>
          <p className="bodas-subtitle mx-auto mt-6">
            Nos obsesionamos con cada detalle para que cuando veas tu video,
            sientas exactamente lo mismo que sentiste ese día.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              className="group rounded-2xl border border-white/5 bg-white/[0.02] hover:border-[#C9A050]/20 transition-all duration-500 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative h-52 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
