"use client";
import React from "react";
import { motion } from "framer-motion";

const pasos = [
  {
    n: "01",
    title: "Compartes tu invitación",
    description:
      "Una página con sus fotos, su historia, la música, el mapa y el código de vestimenta. Se manda por WhatsApp con un solo enlace.",
  },
  {
    n: "02",
    title: "Tus invitados confirman",
    description:
      "Responden desde su celular en menos de un minuto. Cada respuesta cae directo en tu Excel, sin cadenas de mensajes ni listas sueltas.",
  },
  {
    n: "03",
    title: "Reciben su pase",
    description:
      "En pantalla o por correo en PDF, con su nombre, número de pases y la ubicación lista para guardar.",
  },
  {
    n: "04",
    title: "Tú llegas con todo resuelto",
    description:
      "Lista de confirmados, asignación de mesas y el reporte de restricciones alimenticias listo para entregar al banquetero.",
  },
];

export default function InvitacionesComoFunciona() {
  return (
    <section id="como-funciona" className="bodas-light py-24 md:py-32">
      <div className="bodas-container">
        <div className="text-center mb-16">
          <p className="bodas-label bodas-label-ink mb-5">Cómo funciona</p>
          <h2 className="bodas-title">
            Organizar la lista{" "}
            <span className="bodas-em-rose">deja de ser tu problema</span>
          </h2>
          <p className="bodas-subtitle mx-auto mt-6">
            El promedio de una boda son 150 invitados. Perseguir a cada uno por
            WhatsApp cuesta semanas. Esto lo resuelve en cuatro pasos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {pasos.map((paso, i) => (
            <motion.div
              key={paso.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="pt-6"
              style={{ borderTop: "1px solid rgba(196,160,82,0.5)" }}
            >
              <p
                className="bodas-heading text-3xl mb-4"
                style={{ color: "#C4A052" }}
              >
                {paso.n}
              </p>
              <h3 className="bodas-heading text-2xl mb-3">{paso.title}</h3>
              <p
                className="font-body text-[14px] leading-[1.75]"
                style={{ color: "#4A443D" }}
              >
                {paso.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
