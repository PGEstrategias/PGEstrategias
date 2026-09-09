"use client";
import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NOVIOS, PASES_DEMO } from "@/lib/invitaciones/demo";
import { FICHAS, type Plan } from "@/lib/invitaciones/planes";
import PaseDigital from "@/components/invitaciones/demo/PaseDigital";

type Paso = "asistencia" | "nombre" | "pases" | "alergias" | "correo" | "recado";

type Respuesta = {
  asiste: boolean | null;
  nombre: string;
  pases: number;
  alergias: string;
  correo: string;
  recado: string;
};

const VACIO: Respuesta = {
  asiste: null,
  nombre: "",
  pases: PASES_DEMO,
  alergias: "",
  correo: "",
  recado: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Campo({
  etiqueta,
  ayuda,
  children,
}: {
  etiqueta: string;
  ayuda?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="bodas-heading text-2xl md:text-3xl mb-2">{etiqueta}</h3>
      {ayuda && (
        <p
          className="font-body text-[13.5px] leading-[1.7] mb-6"
          style={{ color: "rgba(247,243,238,0.5)" }}
        >
          {ayuda}
        </p>
      )}
      <div className={ayuda ? "" : "mt-6"}>{children}</div>
    </div>
  );
}

const CLASE_INPUT =
  "w-full bg-transparent font-body text-[16px] py-3 outline-none transition-colors duration-300 placeholder:text-[rgba(247,243,238,0.28)]";
const ESTILO_INPUT: React.CSSProperties = {
  color: "#F7F3EE",
  borderBottom: "1px solid rgba(196,160,82,0.4)",
};

export default function Rsvp({ plan }: { plan: Plan }) {
  const ficha = FICHAS[plan];

  const [respuesta, setRespuesta] = useState<Respuesta>(VACIO);
  const [indice, setIndice] = useState(0);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [listo, setListo] = useState(false);
  const [correoEnviado, setCorreoEnviado] = useState(false);

  /* La ruta de preguntas depende de dos cosas: si el invitado va o no, y si
     el plan manda el pase por correo. Se recalcula en vez de ramificarse a
     mano en cada botón. */
  const pasos = useMemo<Paso[]>(() => {
    if (respuesta.asiste === false) return ["asistencia", "nombre", "recado"];
    const base: Paso[] = ["asistencia", "nombre", "pases", "alergias"];
    return ficha.pidecorreo ? [...base, "correo"] : base;
  }, [respuesta.asiste, ficha.pidecorreo]);

  const paso = pasos[indice];
  const ultimo = indice === pasos.length - 1;

  function actualizar(cambio: Partial<Respuesta>) {
    setRespuesta((prev) => ({ ...prev, ...cambio }));
    setError(null);
  }

  function validar(): string | null {
    if (paso === "nombre" && respuesta.nombre.trim().length < 3) {
      return "Escribe tu nombre para saber quién confirma.";
    }
    if (paso === "correo" && !EMAIL_RE.test(respuesta.correo.trim())) {
      return "Revisa el correo: ahí es donde te llega el pase.";
    }
    return null;
  }

  async function avanzar() {
    const problema = validar();
    if (problema) {
      setError(problema);
      return;
    }
    if (!ultimo) {
      setIndice((i) => i + 1);
      return;
    }
    await enviar();
  }

  async function enviar() {
    setEnviando(true);
    setError(null);
    try {
      const res = await fetch("/api/rsvp-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, ...respuesta }),
      });
      const datos = await res.json();
      if (!res.ok || !datos.ok) {
        throw new Error(datos.error ?? "No pudimos guardar tu respuesta.");
      }
      setCorreoEnviado(Boolean(datos.correoEnviado));
      setListo(true);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "No pudimos guardar tu respuesta.",
      );
    } finally {
      setEnviando(false);
    }
  }

  function reiniciar() {
    setRespuesta(VACIO);
    setIndice(0);
    setListo(false);
    setCorreoEnviado(false);
    setError(null);
  }

  /* ── Pantalla final ────────────────────────────────────────────── */
  if (listo) {
    return (
      <section id="rsvp" className="bodas-dark py-20 md:py-28 relative">
        <div className="absolute top-0 left-0 right-0 h-px bodas-rule" />
        <div className="bodas-container max-w-2xl text-center">
          {respuesta.asiste ? (
            <>
              <p className="bodas-label mb-4">Confirmado</p>
              <h2 className="bodas-title mb-4">
                Nos vemos el <span className="bodas-em">14 de noviembre</span>
              </h2>
              <p className="bodas-subtitle mx-auto mb-10">
                {correoEnviado
                  ? `Tu pase en PDF va en camino a ${respuesta.correo}. Llega en menos de un minuto.`
                  : "Guarda una captura de este pase: es lo que te van a pedir en la entrada."}
              </p>

              <PaseDigital nombre={respuesta.nombre.trim()} pases={respuesta.pases} />
            </>
          ) : (
            <>
              <p className="bodas-label mb-4">Gracias por avisar</p>
              <h2 className="bodas-title mb-4">
                Te vamos a <span className="bodas-em">extrañar</span>
              </h2>
              <p className="bodas-subtitle mx-auto">
                {NOVIOS.ella} y {NOVIOS.el} ya tienen tu recado. Vale más saberlo
                hoy que dejar una silla vacía el 14 de noviembre.
              </p>
            </>
          )}

          <button
            type="button"
            onClick={reiniciar}
            className="font-body text-[12px] uppercase tracking-[0.14em] underline underline-offset-8 mt-12 transition-opacity hover:opacity-70"
            style={{ color: "rgba(247,243,238,0.45)" }}
          >
            Probar el formulario otra vez
          </button>
        </div>
      </section>
    );
  }

  /* ── Formulario ────────────────────────────────────────────────── */
  return (
    <section id="rsvp" className="bodas-dark py-20 md:py-28 relative">
      <div className="absolute top-0 left-0 right-0 h-px bodas-rule" />

      <div className="bodas-container max-w-xl">
        <div className="text-center mb-12">
          <p className="bodas-label mb-4">Confirmación</p>
          <h2 className="bodas-title">
            ¿Nos <span className="bodas-em">acompañas?</span>
          </h2>
          <p className="bodas-subtitle mx-auto mt-6">
            Una pregunta a la vez, sin registrarte en nada. Te toma menos de un
            minuto desde el celular.
          </p>
        </div>

        {/* Avance */}
        <div className="flex items-center justify-center gap-2 mb-10" aria-hidden>
          {pasos.map((p, i) => (
            <span
              key={p}
              className="h-px transition-all duration-500"
              style={{
                width: i === indice ? 34 : 16,
                background:
                  i <= indice ? "#C4A052" : "rgba(247,243,238,0.18)",
              }}
            />
          ))}
        </div>

        <div className="bodas-frame px-7 py-10 md:px-10 md:py-12 min-h-[19rem] flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={paso}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.28 }}
              className="flex-1"
            >
              {paso === "asistencia" && (
                <Campo
                  etiqueta="¿Contamos contigo?"
                  ayuda="Tienes dos lugares apartados a tu nombre."
                >
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        actualizar({ asiste: true });
                        setIndice(1);
                      }}
                      className="bodas-btn-gold flex-1"
                    >
                      Ahí estaré
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        actualizar({ asiste: false });
                        setIndice(1);
                      }}
                      className="bodas-btn-outline flex-1"
                    >
                      No podré ir
                    </button>
                  </div>
                </Campo>
              )}

              {paso === "nombre" && (
                <Campo
                  etiqueta="¿Cómo te apuntamos?"
                  ayuda="Tu nombre completo, como quieres que aparezca en el pase."
                >
                  <input
                    type="text"
                    autoFocus
                    value={respuesta.nombre}
                    onChange={(e) => actualizar({ nombre: e.target.value })}
                    onKeyDown={(e) => e.key === "Enter" && avanzar()}
                    placeholder="Ana Reyes"
                    className={CLASE_INPUT}
                    style={ESTILO_INPUT}
                  />
                </Campo>
              )}

              {paso === "pases" && (
                <Campo
                  etiqueta="¿Cuántos van?"
                  ayuda={`Tienes ${PASES_DEMO} pases apartados. Si sobra alguno, avísanos para reacomodar la mesa.`}
                >
                  <div className="flex gap-2.5">
                    {Array.from({ length: PASES_DEMO }, (_, i) => i + 1).map(
                      (n) => {
                        const activo = respuesta.pases === n;
                        return (
                          <button
                            key={n}
                            type="button"
                            onClick={() => actualizar({ pases: n })}
                            className="flex-1 py-5 font-body text-lg transition-colors duration-300"
                            style={{
                              border: `1px solid ${
                                activo ? "#C4A052" : "rgba(247,243,238,0.16)"
                              }`,
                              background: activo
                                ? "rgba(196,160,82,0.14)"
                                : "transparent",
                              color: activo ? "#C4A052" : "rgba(247,243,238,0.6)",
                            }}
                            aria-pressed={activo}
                          >
                            {n}
                          </button>
                        );
                      },
                    )}
                  </div>
                </Campo>
              )}

              {paso === "alergias" && (
                <Campo
                  etiqueta="¿Alguna alergia?"
                  ayuda="Opcional. Si hay algo que no puedas comer, el banquete se ajusta desde ahora."
                >
                  <input
                    type="text"
                    autoFocus
                    value={respuesta.alergias}
                    onChange={(e) => actualizar({ alergias: e.target.value })}
                    onKeyDown={(e) => e.key === "Enter" && avanzar()}
                    placeholder="Sin gluten, vegetariano…"
                    className={CLASE_INPUT}
                    style={ESTILO_INPUT}
                  />
                </Campo>
              )}

              {paso === "correo" && (
                <Campo
                  etiqueta="¿A dónde te mandamos el pase?"
                  ayuda="Te llega el PDF con tu nombre en menos de un minuto."
                >
                  <input
                    type="email"
                    autoFocus
                    inputMode="email"
                    autoComplete="email"
                    value={respuesta.correo}
                    onChange={(e) => actualizar({ correo: e.target.value })}
                    onKeyDown={(e) => e.key === "Enter" && avanzar()}
                    placeholder="tucorreo@ejemplo.com"
                    className={CLASE_INPUT}
                    style={ESTILO_INPUT}
                  />
                </Campo>
              )}

              {paso === "recado" && (
                <Campo
                  etiqueta="¿Les dejas un recado?"
                  ayuda="Opcional, pero se agradece."
                >
                  <input
                    type="text"
                    autoFocus
                    value={respuesta.recado}
                    onChange={(e) => actualizar({ recado: e.target.value })}
                    onKeyDown={(e) => e.key === "Enter" && avanzar()}
                    placeholder="Que sea una noche increíble"
                    className={CLASE_INPUT}
                    style={ESTILO_INPUT}
                  />
                </Campo>
              )}
            </motion.div>
          </AnimatePresence>

          {error && (
            <p
              className="font-body text-[13px] mt-5"
              style={{ color: "#E7A79F" }}
              role="alert"
            >
              {error}
            </p>
          )}

          {/* La pantalla de asistencia avanza con sus propios botones. */}
          {paso !== "asistencia" && (
            <div className="flex items-center justify-between gap-4 mt-9">
              <button
                type="button"
                onClick={() => setIndice((i) => Math.max(0, i - 1))}
                disabled={enviando}
                className="font-body text-[12px] uppercase tracking-[0.14em] transition-opacity hover:opacity-70 disabled:opacity-30"
                style={{ color: "rgba(247,243,238,0.45)" }}
              >
                Atrás
              </button>

              <button
                type="button"
                onClick={avanzar}
                disabled={enviando}
                className="bodas-btn-gold disabled:opacity-60"
              >
                {enviando
                  ? "Enviando…"
                  : ultimo
                    ? "Confirmar"
                    : "Siguiente"}
              </button>
            </div>
          )}
        </div>

        <p
          className="text-center font-body text-[12px] mt-6"
          style={{ color: "rgba(247,243,238,0.32)" }}
        >
          {ficha.promesa}
        </p>
      </div>
    </section>
  );
}
