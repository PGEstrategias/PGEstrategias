"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ConfigXV, Lugar } from "./datos";
import s from "./xv.module.css";

const EASE = [0.16, 1, 0.3, 1] as const;
const ABRIR = "xv:abrir";

const objetivo = (c: ConfigXV) => new Date(`${c.fechaISO}T${c.hora || "00:00"}:00-06:00`).getTime();

const aparece = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: EASE },
};

/* ── Sobre de apertura ───────────────────────────────────────── */
function Sobre({ nombre }: { nombre: string }) {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [abriendo, setAbriendo] = useState(false);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  function abrir() {
    if (abriendo) return;
    setAbriendo(true);
    window.dispatchEvent(new Event(ABRIR));
    window.setTimeout(() => setVisible(false), reduce ? 0 : 1400);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div className={s.sobreFondo} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
          <button type="button" className={s.sobreBtn} onClick={abrir}>
            <div className={s.sobre}>
              <motion.div
                className={s.carta}
                animate={abriendo ? { y: -140, scale: 1.05 } : { y: 0 }}
                transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
              >
                <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 20 }}>Mis XV años</span>
                <span style={{ fontFamily: "var(--serif)", fontSize: 44, lineHeight: 1, textAlign: "center" }}>{nombre}</span>
              </motion.div>
              <div className={s.cuerpo} />
              <motion.div
                className={s.solapa}
                animate={abriendo ? { rotateX: 180, zIndex: 0 } : { rotateX: 0 }}
                transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
              />
              <motion.span
                className={s.sello}
                aria-hidden
                animate={abriendo ? { scale: 0, opacity: 0 } : { scale: [1, 1.07, 1] }}
                transition={abriendo ? { duration: 0.3 } : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              >
                XV
              </motion.span>
            </div>
            <motion.span
              className={s.toca}
              animate={abriendo ? { opacity: 0 } : { opacity: [0.45, 1, 0.45] }}
              transition={{ duration: 2.2, repeat: abriendo ? 0 : Infinity }}
            >
              Toca para abrir tu invitación
            </motion.span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Música: reproductor de YouTube visible + control flotante ── */
type YTPlayer = { playVideo(): void; pauseVideo(): void; destroy(): void };
type YTNamespace = {
  Player: new (
    el: HTMLElement,
    opts: {
      videoId: string;
      playerVars?: Record<string, number | string>;
      events?: { onStateChange?: (e: { data: number }) => void };
    },
  ) => YTPlayer;
};
declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

function useYouTube(id: string, holder: React.RefObject<HTMLDivElement>) {
  const player = useRef<YTPlayer | null>(null);
  const [sonando, setSonando] = useState(false);

  useEffect(() => {
    if (!id || !holder.current) return;
    const crear = () => {
      if (!window.YT || !holder.current) return;
      player.current = new window.YT.Player(holder.current, {
        videoId: id,
        playerVars: { playsinline: 1, rel: 0, loop: 1, playlist: id, modestbranding: 1 },
        events: { onStateChange: (e) => setSonando(e.data === 1) },
      });
    };
    if (window.YT?.Player) crear();
    else {
      const previo = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previo?.();
        crear();
      };
      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      }
    }
    /* Abrir el sobre es un toque del invitado: el navegador permite
       arrancar el sonido en ese momento. */
    const onAbrir = () => player.current?.playVideo();
    window.addEventListener(ABRIR, onAbrir);
    return () => {
      window.removeEventListener(ABRIR, onAbrir);
      player.current?.destroy();
      player.current = null;
    };
  }, [id, holder]);

  const alternar = () => (sonando ? player.current?.pauseVideo() : player.current?.playVideo());
  return { sonando, alternar };
}

/* ── Cuenta regresiva ────────────────────────────────────────── */
function useCuenta(c: ConfigXV) {
  const [ms, setMs] = useState<number | null>(null);
  useEffect(() => {
    const t = () => setMs(Math.max(0, objetivo(c) - Date.now()));
    t();
    const id = setInterval(t, 1000);
    return () => clearInterval(id);
  }, [c]);
  if (ms === null) return null;
  const sg = Math.floor(ms / 1000);
  return { Días: Math.floor(sg / 86400), Horas: Math.floor((sg % 86400) / 3600), Min: Math.floor((sg % 3600) / 60), Seg: sg % 60 };
}

function Casilla({ v, u }: { v: number; u: string }) {
  const t = String(v).padStart(2, "0");
  return (
    <div className={s.casilla}>
      <p className={s.num}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={t} initial={{ y: "-100%", opacity: 0 }} animate={{ y: "0%", opacity: 1 }} exit={{ y: "100%", opacity: 0 }} transition={{ duration: 0.35, ease: EASE }}>
            {t}
          </motion.span>
        </AnimatePresence>
      </p>
      <p className={s.uni}>{u}</p>
    </div>
  );
}

const PARTICULAS = Array.from({ length: 16 }, (_, i) => ({
  left: (i * 61) % 100,
  d: `${11 + (i % 7)}s`,
  delay: `${-((i * 1.9) % 13)}s`,
  x: `${((i % 5) - 2) * 22}px`,
  s: `${10 + (i % 4) * 4}px`,
  c: i % 3 === 0 ? "✦" : "♡",
}));

function idSpotify(url: string) {
  return url.match(/playlist\/([A-Za-z0-9]+)/)?.[1] ?? "";
}

function TarjetaLugar({ icono, titulo, lugar }: { icono: string; titulo: string; lugar: Lugar }) {
  return (
    <motion.div className={s.card} {...aparece}>
      <span className={s.cardIcon} aria-hidden>{icono}</span>
      <h3 className={s.cardTitle}>{titulo}</h3>
      <p className={s.cardText}>
        {lugar.horaTexto}
        <br />
        {lugar.nombre}
        {lugar.direccion && (
          <>
            <br />
            {lugar.direccion}
          </>
        )}
      </p>
      {lugar.maps && (
        <p style={{ marginTop: 14 }}>
          <a href={lugar.maps} target="_blank" rel="noopener noreferrer" className={`${s.btn} ${s.btnLinea}`} style={{ minHeight: 44 }}>
            Cómo llegar
          </a>
        </p>
      )}
    </motion.div>
  );
}

/* ── Invitación ──────────────────────────────────────────────── */
export default function InvitacionXV({ c }: { c: ConfigXV }) {
  const XV = c;
  const cuenta = useCuenta(c);
  const holder = useRef<HTMLDivElement>(null);
  const { sonando, alternar } = useYouTube(XV.youtubeId, holder);
  const [nombre, setNombre] = useState("");
  const [personas, setPersonas] = useState("1");
  const [mensaje, setMensaje] = useState("");
  const [acompanantes, setAcompanantes] = useState<string[]>([]);
  const extra = Number(personas) - 1;
  const nombresOk =
    nombre.trim().length >= 2 && acompanantes.slice(0, extra).length === extra &&
    acompanantes.slice(0, extra).every((n) => (n ?? "").trim().length >= 2);
  const listaAcomp = acompanantes.slice(0, extra).map((n) => (n ?? "").trim()).filter(Boolean);
  const [trampa, setTrampa] = useState("");
  const [estado, setEstado] = useState<"listo" | "enviando" | "ok" | "error">("listo");

  /* Guarda la confirmación en la hoja de Google de la familia. Si la hoja
     todavía no está conectada, se manda por WhatsApp como respaldo. */
  async function confirmar(e: React.FormEvent) {
    e.preventDefault();
    if (estado === "enviando" || !nombresOk) return;
    setEstado("enviando");
    try {
      const r = await fetch("/api/xv-rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ evento: c.evento, nombre, personas, acompanantes: listaAcomp, mensaje, sitio: trampa }),
      });
      const datos = (await r.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (datos?.ok) return setEstado("ok");
      if (datos?.error === "sin-configurar" && rsvpUrl) {
        window.open(rsvpUrl, "_blank", "noopener,noreferrer");
        return setEstado("ok");
      }
      setEstado("error");
    } catch {
      setEstado("error");
    }
  }

  const rsvpUrl = XV.whatsappRsvp
    ? `https://wa.me/${XV.whatsappRsvp}?text=${encodeURIComponent(
        `¡Hola! Confirmo mi asistencia a los XV años de ${XV.nombre}. Nombre: ${nombre || "—"}. Personas: ${personas}.${listaAcomp.length ? ` Acompañantes: ${listaAcomp.join(", ")}.` : ""}${mensaje ? ` Mensaje: ${mensaje}` : ""}`,
      )}`
    : "";

  return (
    <div className={s.root}>
      <Sobre nombre={XV.nombre} />

      {/* Portada */}
      <section className={s.hero}>
        {XV.portada && (
          <div className={s.heroBg} aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={XV.portada} alt="" fetchPriority="high" />
          </div>
        )}
        <div className={s.heroShade} aria-hidden />
        <div className={s.flotan} aria-hidden>
          {PARTICULAS.map((p, i) => (
            <span key={i} style={{ left: `${p.left}%`, ["--d" as string]: p.d, ["--delay" as string]: p.delay, ["--x" as string]: p.x, ["--s" as string]: p.s }}>
              {p.c}
            </span>
          ))}
        </div>
        <div className={s.heroIn}>
          <p className={s.misXV}>Mis XV años</p>
          {/* Nombres largos ("Fátima Ximena") bajan un poco de tamaño para no tocar los bordes. */}
          <h1 className={s.nombre} style={XV.nombre.length > 8 ? { fontSize: "clamp(84px, 25vw, 180px)" } : undefined}>
            {XV.nombre}
          </h1>
          <p className={s.fecha}>{XV.fechaLarga}</p>
          <div className={s.cuenta} aria-label="Cuenta regresiva para la fiesta" style={{ minHeight: 92 }}>
            {cuenta && Object.entries(cuenta).map(([u, v]) => <Casilla key={u} v={v} u={u} />)}
          </div>
          <p style={{ marginTop: 34 }}>
            <a href="#confirmar" className={`${s.btn} ${s.btnRosa}`}>
              Confirmar asistencia
            </a>
          </p>
        </div>
      </section>

      {/* Historia */}
      {(XV.historia.length > 0 || XV.fotos.length > 0) && (
      <section className={`${s.section} ${s.light}`}>
        <div className={s.wrap}>
          <motion.div {...aparece}>
            <p className={s.label}>Mi historia</p>
            <h2 className={s.title}>
              Quince años de <em>recuerdos</em>
            </h2>
            {XV.historia.map((p) => (
              <p key={p.slice(0, 20)} className={s.text}>
                {p}
              </p>
            ))}
          </motion.div>
          <div className={s.carrete}>
            {XV.fotos.map((f, i) => (
              <motion.figure
                key={f.src}
                className={s.polaroid}
                initial={{ opacity: 0, y: 40, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 2.5 : -3 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
                whileHover={{ rotate: 0, scale: 1.04 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f.src} alt={`${XV.nombre}: ${f.pie}`} width={f.w} height={f.h} loading="lazy" decoding="async" />
                <figcaption className={s.pie}>{f.pie}</figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Padres */}
      {XV.padres && XV.padres.length > 0 && (
        <section className={s.section}>
          <div className={s.wrap}>
            <motion.div {...aparece}>
              <p className={s.label}>Con la bendición de Dios y de mis padres</p>
              {XV.padres.map((n) => (
                <p key={n} className={s.title} style={{ fontSize: "clamp(26px, 6vw, 38px)", marginTop: 8 }}>
                  {n}
                </p>
              ))}
              {XV.padrinos && XV.padrinos.length > 0 && (
                <>
                  <p className={s.label} style={{ marginTop: 36 }}>Mis padrinos</p>
                  {XV.padrinos.map((n) => (
                    <p key={n} className={s.title} style={{ fontSize: "clamp(24px, 5.5vw, 34px)", marginTop: 8 }}>
                      {n}
                    </p>
                  ))}
                </>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* Fiesta */}
      <section className={s.section}>
        <div className={s.wrap}>
          <motion.div {...aparece}>
            <p className={s.label}>La fiesta</p>
            <h2 className={s.title}>
              Te espero para <em>celebrar</em>
            </h2>
          </motion.div>
          {XV.ceremonia && XV.recepcion ? (
            <>
              <p className={s.text}>{XV.fechaLarga}</p>
              <div className={s.grid}>
                <TarjetaLugar icono="⛪" titulo="Misa" lugar={XV.ceremonia} />
                <TarjetaLugar icono="🥂" titulo="Recepción" lugar={XV.recepcion} />
              </div>
            </>
          ) : (
          <div className={s.grid}>
            <motion.div className={s.card} {...aparece}>
              <span className={s.cardIcon} aria-hidden>🗓</span>
              <h3 className={s.cardTitle}>Cuándo</h3>
              <p className={s.cardText}>
                {XV.fechaLarga}
                <br />
                {XV.hora ? XV.horaTexto : <span className={s.pend}>Hora por confirmar</span>}
              </p>
            </motion.div>
            <motion.div className={s.card} {...aparece}>
              <span className={s.cardIcon} aria-hidden>📍</span>
              <h3 className={s.cardTitle}>Dónde</h3>
              <p className={s.cardText}>
                {XV.lugar || <span className={s.pend}>Lugar por confirmar</span>}
                {XV.direccion && (
                  <>
                    <br />
                    {XV.direccion}
                  </>
                )}
              </p>
              {XV.maps && (
                <p style={{ marginTop: 14 }}>
                  <a href={XV.maps} target="_blank" rel="noopener noreferrer" className={`${s.btn} ${s.btnLinea}`} style={{ minHeight: 44 }}>
                    Cómo llegar
                  </a>
                </p>
              )}
            </motion.div>
          </div>
          )}
        </div>
      </section>

      {/* Itinerario */}
      <section className={`${s.section} ${s.light}`}>
        <div className={s.wrap} style={{ maxWidth: 560 }}>
          <motion.div {...aparece}>
            <p className={s.label}>Itinerario</p>
            <h2 className={s.title}>
              Así se va a <em>vivir</em>
            </h2>
          </motion.div>
          <ol className={s.itinerario}>
            <motion.span
              aria-hidden
              className={s.linea}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.4, ease: EASE }}
            />
            {XV.itinerario.map((p, i) => (
              <motion.li
                key={p.titulo}
                className={s.paso}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: EASE }}
              >
                <span className={s.punto} aria-hidden>
                  {p.icono}
                </span>
                <div>
                  <p className={s.pasoHora}>{p.hora}</p>
                  <h3 className={s.pasoTitulo}>{p.titulo}</h3>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Código de vestimenta y avisos */}
      <section className={s.section} style={{ background: "#140e11" }}>
        <div className={s.wrap}>
          <motion.div {...aparece}>
            <p className={s.label}>Código de vestimenta</p>
            <h2 className={s.title}>
              {XV.vestimenta.titulo && `${XV.vestimenta.titulo} `}
              <em>{XV.vestimenta.acento}</em>
            </h2>
            <p className={s.text}>{XV.vestimenta.texto}</p>
            {(XV.vestimenta.colores.length > 0 || XV.vestimenta.reservado) && (
              <div className={s.swatches} aria-hidden>
                {XV.vestimenta.colores.map((col) => (
                  <span key={col} className={s.swatch} style={{ background: col }} />
                ))}
                {XV.vestimenta.reservado && (
                  <span
                    className={s.swatch}
                    style={{ background: XV.vestimenta.reservado, borderColor: XV.vestimenta.reservado }}
                    title="Solo la quinceañera"
                  />
                )}
              </div>
            )}
          </motion.div>
          {XV.avisos.length > 0 && (
            <div className={s.grid}>
              {XV.avisos.map((a) => (
                <motion.div key={a.titulo} className={s.card} {...aparece}>
                  <span className={s.cardIcon} aria-hidden>{a.icono}</span>
                  <h3 className={s.cardTitle}>{a.titulo}</h3>
                  <p className={s.cardText}>{a.texto}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Canción */}
      {XV.youtubeId && (
      <section className={s.section}>
        <div className={s.wrap}>
          <motion.div {...aparece}>
            <p className={s.label}>La canción de la noche</p>
            <h2 className={s.title}>
              {XV.cancion} <em>· {XV.artista}</em>
            </h2>
          </motion.div>
          <div className={`${s.disco} ${sonando ? s.gira : ""}`} aria-hidden />
          <div className={s.yt}>
            <div ref={holder} />
          </div>
        </div>
      </section>
      )}

      {/* Playlist colaborativa */}
      {XV.spotifyPlaylist && (
        <section className={s.section}>
          <div className={s.wrap}>
            <motion.div {...aparece}>
              <p className={s.label}>Playlist de la fiesta</p>
              <h2 className={s.title}>
                Arma la playlist <em>conmigo</em>
              </h2>
              <p className={s.text}>Agrega la canción que no puede faltar esa noche.</p>
            </motion.div>
            <div style={{ maxWidth: 420, margin: "30px auto 0" }}>
              <iframe
                title="Playlist de la fiesta en Spotify"
                src={`https://open.spotify.com/embed/playlist/${idSpotify(XV.spotifyPlaylist)}?theme=0`}
                width="100%"
                height="352"
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                style={{ border: 0, borderRadius: 16, display: "block" }}
              />
            </div>
            <p style={{ marginTop: 22 }}>
              <a href={XV.spotifyPlaylist} target="_blank" rel="noopener noreferrer" className={`${s.btn} ${s.btnRosa}`}>
                Agregar canciones en Spotify
              </a>
            </p>
          </div>
        </section>
      )}

      {/* Confirmación */}
      <section id="confirmar" className={`${s.section} ${s.light}`}>
        <div className={s.wrap} style={{ maxWidth: 520 }}>
          <motion.div {...aparece}>
            <p className={s.label}>Confirma tu asistencia</p>
            <h2 className={s.title}>
              Ven a <em>disfrutar</em>
            </h2>
            {XV.fechaLimite && <p className={s.text}>Por favor confirma antes del {XV.fechaLimite}.</p>}
          </motion.div>
          {XV.fotoConfirmar && (
          <motion.figure
            className={s.polaroid}
            style={{ width: 240, margin: "30px auto 0" }}
            initial={{ opacity: 0, y: 30, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: -3 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: EASE }}
            whileHover={{ rotate: 0, scale: 1.04 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={XV.fotoConfirmar.src} alt={XV.fotoConfirmar.alt} width={XV.fotoConfirmar.w} height={XV.fotoConfirmar.h} loading="lazy" decoding="async" style={{ height: 230 }} />
            <figcaption className={s.pie}>{XV.fotoConfirmar.pie}</figcaption>
          </motion.figure>
          )}
          {estado === "ok" ? (
            <motion.div
              className={s.card}
              style={{ marginTop: 30, textAlign: "center", background: "#fff" }}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: EASE }}
              role="status"
            >
              <p style={{ fontSize: 34 }} aria-hidden>💗</p>
              <h3 className={s.cardTitle}>¡Gracias, {nombre.trim().split(" ")[0]}!</h3>
              <p className={s.cardText}>
                Tu asistencia quedó confirmada ({personas} {personas === "1" ? "persona" : "personas"}). ¡Nos vemos en la fiesta!
              </p>
              {rsvpUrl && (
                <p style={{ marginTop: 16 }}>
                  <a href={rsvpUrl} target="_blank" rel="noopener noreferrer" className={`${s.btn} ${s.btnLinea}`} style={{ minHeight: 44, color: "#0f0b0d" }}>
                    Avisar también por WhatsApp
                  </a>
                </p>
              )}
            </motion.div>
          ) : (
            <form className={s.form} onSubmit={confirmar}>
              <div className={s.field}>
                <label htmlFor="xv-nombre">Tu nombre</label>
                <input id="xv-nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} autoComplete="name" required minLength={2} maxLength={120} />
              </div>
              <div className={s.field}>
                <label htmlFor="xv-personas">¿Cuántas personas asisten? (contándote a ti)</label>
                <select id="xv-personas" value={personas} onChange={(e) => setPersonas(e.target.value)}>
                  {["1", "2", "3", "4", "5", "6"].map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </div>
              {Array.from({ length: Math.max(0, extra) }, (_, i) => (
                <motion.div
                  key={i}
                  className={s.field}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label htmlFor={`xv-acomp-${i}`}>Nombre del acompañante {i + 1}</label>
                  <input
                    id={`xv-acomp-${i}`}
                    value={acompanantes[i] ?? ""}
                    onChange={(e) =>
                      setAcompanantes((prev) => {
                        const nuevo = [...prev];
                        nuevo[i] = e.target.value;
                        return nuevo;
                      })
                    }
                    required
                    minLength={2}
                    maxLength={80}
                    autoComplete="off"
                  />
                </motion.div>
              ))}
              <div className={s.field}>
                <label htmlFor="xv-mensaje">Un mensaje para {XV.nombre} (opcional)</label>
                <input id="xv-mensaje" value={mensaje} onChange={(e) => setMensaje(e.target.value)} maxLength={140} />
              </div>
              {/* Campo trampa para bots: oculto a las personas. */}
              <input type="text" name="sitio" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }} value={trampa} onChange={(e) => setTrampa(e.target.value)} />
              <button type="submit" className={`${s.btn} ${s.btnNoche}`} aria-disabled={estado === "enviando" || !nombresOk}>
                {estado === "enviando" ? "Confirmando…" : "Confirmar asistencia"}
              </button>
              {estado === "error" && (
                <p role="alert" className={s.cardText} style={{ textAlign: "center" }}>
                  No pudimos guardar tu confirmación.{" "}
                  {rsvpUrl ? (
                    <a href={rsvpUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#a8466a", fontWeight: 600 }}>
                      Confírmala por WhatsApp aquí
                    </a>
                  ) : (
                    "Intenta de nuevo en un momento."
                  )}
                </p>
              )}
            </form>
          )}
        </div>
      </section>

      {/* Cierre */}
      <section className={s.section}>
        <div className={s.wrap}>
          {XV.frase && (
            <motion.p className={s.cierre} {...aparece}>
              “{XV.frase}” 💘
            </motion.p>
          )}
          <motion.p className={s.nombre} style={{ fontSize: "clamp(64px, 18vw, 110px)", marginTop: 26 }} {...aparece}>
            {XV.nombre}
          </motion.p>
          <p className={s.firma}>
            Invitación por <a href="/eventfilms">PG Event Films</a>
          </p>
        </div>
      </section>

      {XV.youtubeId && (
        <button
          type="button"
          className={`${s.musica} ${sonando ? s.gira : ""}`}
          onClick={alternar}
          aria-pressed={sonando}
          aria-label={sonando ? `Pausar ${XV.cancion}` : `Reproducir ${XV.cancion} de ${XV.artista}`}
        />
      )}
    </div>
  );
}
