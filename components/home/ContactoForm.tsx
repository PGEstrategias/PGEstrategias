"use client";

import { useState } from "react";
import { NECESIDADES } from "@/data/home";
import { waLink } from "@/lib/site";
import s from "./home.module.css";

/* Formulario corto. Aún no hay endpoint para guardar leads: al enviar se
   abre WhatsApp con el mensaje armado. Cuando exista el endpoint, se
   reemplaza el cuerpo de onSubmit. */
export default function ContactoForm() {
  const [enviado, setEnviado] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const nombre = String(f.get("nombre") || "").trim();
    const empresa = String(f.get("empresa") || "").trim();
    const necesidad = String(f.get("necesidad") || "");
    const msg =
      `Hola, soy ${nombre}` +
      (empresa ? ` de ${empresa}` : "") +
      `. Me interesa: ${necesidad}.`;
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
    setEnviado(true);
  }

  return (
    <form className={s.form} onSubmit={onSubmit} noValidate={false}>
      <div className={s.field}>
        <label htmlFor="f-nombre">
          Nombre <span className={s.req} aria-hidden="true">*</span>
        </label>
        <input id="f-nombre" name="nombre" type="text" autoComplete="name" required aria-required="true" />
      </div>
      <div className={s.field}>
        <label htmlFor="f-empresa">Empresa</label>
        <input id="f-empresa" name="empresa" type="text" autoComplete="organization" />
      </div>
      <div className={s.field}>
        <label htmlFor="f-necesidad">Qué necesitas</label>
        <select id="f-necesidad" name="necesidad" defaultValue={NECESIDADES[0]}>
          {NECESIDADES.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className={`${s.btn} ${s.btnPrimary}`}>
        Enviar
      </button>
      <p className={s.hint}>* Campo requerido.</p>
      {enviado && (
        <p className={s.ok} role="status">
          Gracias. Abrimos WhatsApp con tu mensaje; si no se abrió, escríbenos con el botón de arriba.
        </p>
      )}
    </form>
  );
}
