'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import RecorteFoto from './RecorteFoto';
import { calcularCompletitud, faltantes } from '@/lib/listamedica/completitud';
import {
  aEntrada,
  consultorioVacio,
  formularioVacio,
  slugSugerido,
  type ConsultorioForm,
  type ValoresFormulario,
} from '@/lib/listamedica/formulario';
import { URL_SEP } from '@/lib/listamedica/marca';
import { rutas } from '@/lib/listamedica/rutas';
import { ciudadesDisponibles, slugify, validarCedula } from '@/lib/listamedica/texto';
import type { Especialidad } from '@/lib/listamedica/tipos';

const HOY = () => new Date().toISOString().slice(0, 10);

/**
 * Alta y edición de profesional, en un solo formulario largo.
 *
 * La meta es capturar un perfil en menos de tres minutos, así que todo lo
 * obligatorio va arriba y el resto se puede dejar para después. El borrador
 * se guarda solo en el navegador: si se cae la pestaña a media captura, no se
 * pierde nada.
 */
export default function FormularioProfesional({
  inicial,
  catalogo,
}: {
  inicial: ValoresFormulario | null;
  catalogo: Especialidad[];
}) {
  const [v, setV] = useState<ValoresFormulario>(inicial ?? formularioVacio());
  const [especialidades, setEspecialidades] = useState(catalogo);
  const [slugEditado, setSlugEditado] = useState(Boolean(inicial?.slug));
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState<{ tono: 'ok' | 'error'; texto: string } | null>(null);
  const [borradorLocal, setBorradorLocal] = useState(false);
  const claveBorrador = `lm-borrador-${inicial?.id || 'nuevo'}`;
  const montado = useRef(false);

  const set = <K extends keyof ValoresFormulario>(clave: K, valor: ValoresFormulario[K]) =>
    setV((actual) => ({ ...actual, [clave]: valor }));

  /* ── Borrador local ───────────────────────────────────── */

  useEffect(() => {
    try {
      const crudo = window.localStorage.getItem(claveBorrador);
      if (crudo) {
        setV(JSON.parse(crudo) as ValoresFormulario);
        setBorradorLocal(true);
      }
    } catch {
      // Sin almacenamiento local el formulario sigue funcionando igual.
    }
    montado.current = true;
    // Solo al montar: restaurar más de una vez pisaría lo que se está escribiendo.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!montado.current) return;
    const id = window.setTimeout(() => {
      try {
        window.localStorage.setItem(claveBorrador, JSON.stringify(v));
      } catch {
        // Cuota llena: no vale la pena interrumpir la captura por esto.
      }
    }, 600);
    return () => window.clearTimeout(id);
  }, [v, claveBorrador]);

  /* ── Slug ─────────────────────────────────────────────── */

  const nombreEspecialidad =
    especialidades.find((e) => e.id === (v.especialidad_principal_id || v.especialidad_ids[0]))
      ?.nombre ?? '';

  useEffect(() => {
    if (slugEditado) return;
    const sugerido = slugSugerido(v, nombreEspecialidad);
    if (sugerido && sugerido !== v.slug) setV((actual) => ({ ...actual, slug: sugerido }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [v.nombre, v.apellidos, nombreEspecialidad, v.consultorios[0]?.ciudad, slugEditado]);

  /* ── Completitud en vivo ──────────────────────────────── */

  const entrada = useMemo(() => aEntrada(v), [v]);

  const completitud = useMemo(
    () =>
      calcularCompletitud({
        profesional: { ...entrada.profesional, completitud_pct: 0, fecha_alta: '', orden: 0 },
        consultorios: entrada.consultorios.map((c, i) => ({ ...c, id: String(i), profesional_id: '' })),
        servicios: entrada.servicios.map((s, i) => ({ ...s, id: String(i), profesional_id: '' })),
        faqs: entrada.faqs.map((f, i) => ({ ...f, id: String(i), profesional_id: '' })),
        especialidades: v.especialidad_ids.length,
      }),
    [entrada, v.especialidad_ids.length],
  );

  const pendientes = useMemo(
    () =>
      faltantes({
        profesional: { ...entrada.profesional, completitud_pct: 0, fecha_alta: '', orden: 0 },
        consultorios: entrada.consultorios.map((c, i) => ({ ...c, id: String(i), profesional_id: '' })),
        servicios: entrada.servicios.map((s, i) => ({ ...s, id: String(i), profesional_id: '' })),
        faqs: entrada.faqs.map((f, i) => ({ ...f, id: String(i), profesional_id: '' })),
        especialidades: v.especialidad_ids.length,
      }),
    [entrada, v.especialidad_ids.length],
  );

  const errorCedula = v.cedula ? validarCedula(v.cedula) : null;

  /* ── Guardar ──────────────────────────────────────────── */

  async function guardar(estatus?: ValoresFormulario['estatus']) {
    setGuardando(true);
    setMensaje(null);
    const valores = estatus ? { ...v, estatus } : v;

    try {
      const respuesta = await fetch('/api/listamedica/admin/guardar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aEntrada(valores)),
      });
      const datos = await respuesta.json();

      if (!datos.ok) {
        setMensaje({ tono: 'error', texto: datos.error ?? 'No se pudo guardar.' });
        return null;
      }

      setV((actual) => ({ ...actual, id: datos.profesional.id, estatus: datos.profesional.estatus }));
      try {
        window.localStorage.removeItem(claveBorrador);
      } catch {
        /* sin almacenamiento local */
      }
      setBorradorLocal(false);
      setMensaje({
        tono: 'ok',
        texto: `Guardado. Completitud ${datos.profesional.completitud_pct}%.`,
      });
      return datos.profesional as { id: string; slug: string };
    } catch {
      setMensaje({ tono: 'error', texto: 'Error de red. Intenta de nuevo.' });
      return null;
    } finally {
      setGuardando(false);
    }
  }

  async function vistaPrevia() {
    const guardado = await guardar();
    if (guardado) window.open(`${rutas.admin()}/vista-previa/${guardado.id}`, '_blank');
  }

  /* ── Subidas ──────────────────────────────────────────── */

  async function subir(tipo: 'foto' | 'evidencia', dataUrl: string) {
    const id = v.id || `tmp-${slugify(`${v.nombre}-${v.apellidos}`) || 'perfil'}`;
    const respuesta = await fetch('/api/listamedica/admin/subir', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tipo, id, dataUrl }),
    });
    const datos = await respuesta.json();
    if (!datos.ok) {
      setMensaje({ tono: 'error', texto: datos.error ?? 'No se pudo subir el archivo.' });
      return null;
    }
    return datos.url as string;
  }

  async function subirEvidencia(archivo: File) {
    const dataUrl = await reducirImagen(archivo, 1400);
    const url = await subir('evidencia', dataUrl);
    if (url) {
      setV((actual) => ({
        ...actual,
        evidencia_verificacion_url: url,
        verificado_en: actual.verificado_en || HOY(),
      }));
      setMensaje({ tono: 'ok', texto: 'Evidencia cargada. Ya puedes marcar la cédula verificada.' });
    }
  }

  /* ── Repetidores ──────────────────────────────────────── */

  const actualizarConsultorio = (i: number, cambios: Partial<ConsultorioForm>) =>
    setV((actual) => ({
      ...actual,
      consultorios: actual.consultorios.map((c, j) => (j === i ? { ...c, ...cambios } : c)),
    }));

  return (
    <>
      {borradorLocal && (
        <div className="lm-aviso" style={{ marginBottom: 16 }}>
          Se recuperó un borrador guardado en este navegador. Si prefieres empezar de nuevo,{' '}
          <button
            type="button"
            className="lm-btn lm-btn--texto"
            onClick={() => {
              window.localStorage.removeItem(claveBorrador);
              setV(inicial ?? formularioVacio());
              setBorradorLocal(false);
            }}
          >
            descártalo
          </button>
          .
        </div>
      )}

      <form onSubmit={(e) => e.preventDefault()}>
        {/* ── Identidad ─────────────────────────────────── */}
        <section className="lm-grupo">
          <h2>Identidad</h2>
          <p className="lm-grupo__intro">Lo mínimo para que el perfil exista.</p>

          <div className="lm-rejilla">
            <label className="lm-campo">
              <span className="lm-campo__etiqueta">Título</span>
              <select
                className="lm-select"
                value={v.titulo}
                onChange={(e) => set('titulo', e.target.value)}
              >
                {['Dr.', 'Dra.', 'Lic.', 'L.N.', 'Mtro.', 'Mtra.', ''].map((t) => (
                  <option key={t || 'sin'} value={t}>
                    {t || 'Sin título'}
                  </option>
                ))}
              </select>
            </label>

            <label className="lm-campo">
              <span className="lm-campo__etiqueta">Nombre *</span>
              <input
                className="lm-input"
                required
                value={v.nombre}
                onChange={(e) => set('nombre', e.target.value)}
              />
            </label>

            <label className="lm-campo">
              <span className="lm-campo__etiqueta">Apellidos *</span>
              <input
                className="lm-input"
                required
                value={v.apellidos}
                onChange={(e) => set('apellidos', e.target.value)}
              />
            </label>

            <label className="lm-campo">
              <span className="lm-campo__etiqueta">Género</span>
              <select
                className="lm-select"
                value={v.genero}
                onChange={(e) => set('genero', e.target.value as ValoresFormulario['genero'])}
              >
                <option value="no_especificado">Sin especificar</option>
                <option value="femenino">Mujer</option>
                <option value="masculino">Hombre</option>
              </select>
            </label>

            <label className="lm-campo">
              <span className="lm-campo__etiqueta">WhatsApp *</span>
              <input
                className="lm-input"
                inputMode="tel"
                placeholder="222 123 4567"
                value={v.whatsapp}
                onChange={(e) => set('whatsapp', e.target.value)}
              />
              <span className="lm-campo__ayuda">Es el número al que llegan los pacientes.</span>
            </label>

            <label className="lm-campo">
              <span className="lm-campo__etiqueta">Teléfono de consultorio</span>
              <input
                className="lm-input"
                inputMode="tel"
                value={v.telefono}
                onChange={(e) => set('telefono', e.target.value)}
              />
            </label>
          </div>

          <label className="lm-campo">
            <span className="lm-campo__etiqueta">Dirección del perfil (slug)</span>
            <input
              className="lm-input"
              value={v.slug}
              onChange={(e) => {
                setSlugEditado(true);
                set('slug', slugify(e.target.value));
              }}
            />
            <span className="lm-campo__ayuda">
              Se genera solo a partir del nombre, la especialidad y la ciudad. Quedará en{' '}
              <code>{rutas.perfil(v.slug || 'nombre-apellido')}</code>
            </span>
          </label>
        </section>

        {/* ── Cédula y verificación ─────────────────────── */}
        <section className="lm-grupo">
          <h2>Cédula profesional y verificación</h2>
          <p className="lm-grupo__intro">
            Esto es lo que el producto promete. Un perfil no se publica sin este paso.
          </p>

          <div className="lm-rejilla">
            <label className="lm-campo">
              <span className="lm-campo__etiqueta">Cédula profesional *</span>
              <input
                className="lm-input"
                inputMode="numeric"
                value={v.cedula}
                onChange={(e) => set('cedula', e.target.value.replace(/\D/g, ''))}
                aria-invalid={Boolean(errorCedula)}
                aria-describedby="lm-error-cedula"
              />
              {errorCedula ? (
                <span className="lm-campo__error" id="lm-error-cedula">
                  {errorCedula}
                </span>
              ) : (
                <span className="lm-campo__ayuda" id="lm-error-cedula">
                  {v.cedula ? 'Formato correcto.' : '7 u 8 dígitos, sin letras.'}
                </span>
              )}
            </label>

            <label className="lm-campo">
              <span className="lm-campo__etiqueta">Cédula de especialidad</span>
              <input
                className="lm-input"
                inputMode="numeric"
                value={v.cedula_especialidad}
                onChange={(e) => set('cedula_especialidad', e.target.value.replace(/\D/g, ''))}
              />
            </label>
          </div>

          <p style={{ fontSize: 14 }}>
            <a href={URL_SEP} target="_blank" rel="noopener noreferrer">
              Abrir el Registro Nacional de Profesionistas de la SEP
            </a>{' '}
            <span className="lm-gris">
              — se abre en otra pestaña, sin perder lo capturado aquí.
            </span>
          </p>

          <label className="lm-campo" style={{ marginTop: 14 }}>
            <span className="lm-campo__etiqueta">Captura de la consulta a la SEP</span>
            <input
              type="file"
              accept="image/*"
              className="lm-input"
              onChange={(e) => {
                const archivo = e.target.files?.[0];
                if (archivo) void subirEvidencia(archivo);
              }}
            />
            <span className="lm-campo__ayuda">
              Sin esta evidencia no se puede marcar la casilla de verificación.
            </span>
          </label>

          {v.evidencia_verificacion_url && (
            <p style={{ fontSize: 14 }}>
              <a href={v.evidencia_verificacion_url} target="_blank" rel="noopener noreferrer">
                Ver la evidencia cargada
              </a>
            </p>
          )}

          <label className="lm-check" style={{ marginTop: 10 }}>
            <input
              type="checkbox"
              checked={Boolean(v.verificado_en)}
              disabled={!v.evidencia_verificacion_url}
              onChange={(e) => set('verificado_en', e.target.checked ? HOY() : '')}
            />
            <span>
              Cédula verificada en el Registro Nacional de Profesionistas
              {v.verificado_en && <> — fecha estampada: {v.verificado_en}</>}
              {!v.evidencia_verificacion_url && (
                <span className="lm-gris"> (falta cargar la evidencia)</span>
              )}
            </span>
          </label>
        </section>

        {/* ── Especialidades ────────────────────────────── */}
        <section className="lm-grupo">
          <h2>Especialidades</h2>
          <p className="lm-grupo__intro">
            La principal define la dirección del perfil y la página de listado donde aparece.
          </p>

          <div className="lm-chips" style={{ marginBottom: 14 }}>
            {especialidades.map((e) => {
              const activa = v.especialidad_ids.includes(e.id);
              return (
                <button
                  key={e.id}
                  type="button"
                  className={activa ? 'lm-chip lm-chip--activo' : 'lm-chip'}
                  aria-pressed={activa}
                  onClick={() =>
                    setV((actual) => {
                      const ids = activa
                        ? actual.especialidad_ids.filter((id) => id !== e.id)
                        : [...actual.especialidad_ids, e.id];
                      return {
                        ...actual,
                        especialidad_ids: ids,
                        especialidad_principal_id: ids.includes(actual.especialidad_principal_id)
                          ? actual.especialidad_principal_id
                          : ids[0] ?? '',
                      };
                    })
                  }
                >
                  {e.nombre}
                </button>
              );
            })}
          </div>

          {v.especialidad_ids.length > 1 && (
            <label className="lm-campo" style={{ maxWidth: 340 }}>
              <span className="lm-campo__etiqueta">Especialidad principal</span>
              <select
                className="lm-select"
                value={v.especialidad_principal_id}
                onChange={(e) => set('especialidad_principal_id', e.target.value)}
              >
                {v.especialidad_ids.map((id) => (
                  <option key={id} value={id}>
                    {especialidades.find((e) => e.id === id)?.nombre ?? id}
                  </option>
                ))}
              </select>
            </label>
          )}

          <NuevaEspecialidad
            onCreada={(nueva) => {
              setEspecialidades((lista) => [...lista, nueva]);
              setV((actual) => ({
                ...actual,
                especialidad_ids: [...actual.especialidad_ids, nueva.id],
                especialidad_principal_id: actual.especialidad_principal_id || nueva.id,
              }));
            }}
          />
        </section>

        {/* ── Consultorios ──────────────────────────────── */}
        <section className="lm-grupo">
          <h2>Consultorio</h2>
          <p className="lm-grupo__intro">
            La dirección y las referencias de cómo llegar son lo que más preguntan los pacientes.
          </p>

          {v.consultorios.map((c, i) => (
            <div className="lm-repetidor" key={i}>
              <BuscadorDireccion
                onElegir={(s) =>
                  actualizarConsultorio(i, {
                    lat: String(s.lat),
                    lng: String(s.lng),
                    colonia: s.colonia || c.colonia,
                    cp: s.cp || c.cp,
                  })
                }
              />

              <div className="lm-rejilla">
                <label className="lm-campo">
                  <span className="lm-campo__etiqueta">Calle</span>
                  <input
                    className="lm-input"
                    value={c.calle}
                    onChange={(e) => actualizarConsultorio(i, { calle: e.target.value })}
                  />
                </label>
                <label className="lm-campo">
                  <span className="lm-campo__etiqueta">Número</span>
                  <input
                    className="lm-input"
                    value={c.numero}
                    onChange={(e) => actualizarConsultorio(i, { numero: e.target.value })}
                  />
                </label>
                <label className="lm-campo">
                  <span className="lm-campo__etiqueta">Torre o edificio</span>
                  <input
                    className="lm-input"
                    value={c.torre}
                    onChange={(e) => actualizarConsultorio(i, { torre: e.target.value })}
                  />
                </label>
                <label className="lm-campo">
                  <span className="lm-campo__etiqueta">Piso</span>
                  <input
                    className="lm-input"
                    value={c.piso}
                    onChange={(e) => actualizarConsultorio(i, { piso: e.target.value })}
                  />
                </label>
                <label className="lm-campo">
                  <span className="lm-campo__etiqueta">Consultorio</span>
                  <input
                    className="lm-input"
                    value={c.consultorio}
                    onChange={(e) => actualizarConsultorio(i, { consultorio: e.target.value })}
                  />
                </label>
                <label className="lm-campo">
                  <span className="lm-campo__etiqueta">Colonia</span>
                  <input
                    className="lm-input"
                    value={c.colonia}
                    onChange={(e) => actualizarConsultorio(i, { colonia: e.target.value })}
                  />
                </label>
                <label className="lm-campo">
                  <span className="lm-campo__etiqueta">Código postal</span>
                  <input
                    className="lm-input"
                    inputMode="numeric"
                    value={c.cp}
                    onChange={(e) => actualizarConsultorio(i, { cp: e.target.value })}
                  />
                </label>
                <label className="lm-campo">
                  <span className="lm-campo__etiqueta">Ciudad</span>
                  <select
                    className="lm-select"
                    value={c.ciudad}
                    onChange={(e) =>
                      actualizarConsultorio(i, { ciudad: e.target.value as ConsultorioForm['ciudad'] })
                    }
                  >
                    {ciudadesDisponibles().map((ciudad) => (
                      <option key={ciudad.slug} value={ciudad.slug}>
                        {ciudad.nombre}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="lm-campo">
                  <span className="lm-campo__etiqueta">Latitud</span>
                  <input
                    className="lm-input"
                    value={c.lat}
                    onChange={(e) => actualizarConsultorio(i, { lat: e.target.value })}
                  />
                </label>
                <label className="lm-campo">
                  <span className="lm-campo__etiqueta">Longitud</span>
                  <input
                    className="lm-input"
                    value={c.lng}
                    onChange={(e) => actualizarConsultorio(i, { lng: e.target.value })}
                  />
                </label>
              </div>

              {c.lat && c.lng && (
                <iframe
                  title="Ubicación del consultorio"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${Number(c.lng) - 0.004}%2C${Number(c.lat) - 0.004}%2C${Number(c.lng) + 0.004}%2C${Number(c.lat) + 0.004}&layer=mapnik&marker=${c.lat}%2C${c.lng}`}
                  style={{
                    width: '100%',
                    height: 200,
                    border: '1px solid var(--linea)',
                    borderRadius: 'var(--r-campo)',
                    marginBottom: 12,
                  }}
                />
              )}

              <label className="lm-campo">
                <span className="lm-campo__etiqueta">Referencias de cómo llegar</span>
                <textarea
                  className="lm-textarea"
                  value={c.referencias}
                  onChange={(e) => actualizarConsultorio(i, { referencias: e.target.value })}
                />
              </label>

              <div className="lm-rejilla--dos lm-rejilla">
                <label className="lm-campo">
                  <span className="lm-campo__etiqueta">Estacionamiento</span>
                  <input
                    className="lm-input"
                    value={c.estacionamiento}
                    onChange={(e) => actualizarConsultorio(i, { estacionamiento: e.target.value })}
                  />
                </label>
                <label className="lm-campo">
                  <span className="lm-campo__etiqueta">Horario de atención</span>
                  <input
                    className="lm-input"
                    placeholder="Lunes a viernes de 9:00 a 14:00"
                    value={c.horario_texto}
                    onChange={(e) => actualizarConsultorio(i, { horario_texto: e.target.value })}
                  />
                </label>
              </div>

              <label className="lm-check">
                <input
                  type="checkbox"
                  checked={c.atiende_fin_semana}
                  onChange={(e) => actualizarConsultorio(i, { atiende_fin_semana: e.target.checked })}
                />
                <span>Atiende en fin de semana</span>
              </label>

              {v.consultorios.length > 1 && (
                <button
                  type="button"
                  className="lm-btn lm-btn--texto"
                  onClick={() =>
                    setV((actual) => ({
                      ...actual,
                      consultorios: actual.consultorios.filter((_, j) => j !== i),
                    }))
                  }
                >
                  Quitar este consultorio
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            className="lm-btn lm-btn--contorno lm-btn--chico"
            onClick={() =>
              setV((actual) => ({ ...actual, consultorios: [...actual.consultorios, consultorioVacio()] }))
            }
          >
            Agregar otro consultorio
          </button>
        </section>

        {/* ── Perfil público ────────────────────────────── */}
        <section className="lm-grupo">
          <h2>Perfil público</h2>
          <p className="lm-grupo__intro">Lo que el paciente lee antes de decidir escribir.</p>

          <RecorteFoto
            fotoActual={v.foto_url}
            onListo={async (dataUrl) => {
              const url = await subir('foto', dataUrl);
              if (url) set('foto_url', url);
            }}
          />

          <label className="lm-campo" style={{ marginTop: 14 }}>
            <span className="lm-campo__etiqueta">Biografía</span>
            <textarea
              className="lm-textarea"
              value={v.bio}
              onChange={(e) => set('bio', e.target.value)}
            />
            <span className="lm-campo__ayuda">
              {v.bio.trim().length} caracteres. A partir de 120 cuenta para la completitud.
            </span>
          </label>

          <div className="lm-rejilla">
            <label className="lm-campo">
              <span className="lm-campo__etiqueta">Universidad de licenciatura</span>
              <input
                className="lm-input"
                value={v.universidad}
                onChange={(e) => set('universidad', e.target.value)}
              />
            </label>
            <label className="lm-campo">
              <span className="lm-campo__etiqueta">Institución de la especialidad</span>
              <input
                className="lm-input"
                value={v.universidad_especialidad}
                onChange={(e) => set('universidad_especialidad', e.target.value)}
              />
            </label>
            <label className="lm-campo">
              <span className="lm-campo__etiqueta">Certificación de consejo</span>
              <input
                className="lm-input"
                value={v.certificacion_consejo}
                onChange={(e) => set('certificacion_consejo', e.target.value)}
              />
            </label>
            <label className="lm-campo">
              <span className="lm-campo__etiqueta">Vigencia de la certificación</span>
              <input
                className="lm-input"
                placeholder="2028"
                value={v.vigencia_certificacion}
                onChange={(e) => set('vigencia_certificacion', e.target.value)}
              />
            </label>
            <label className="lm-campo">
              <span className="lm-campo__etiqueta">Años de experiencia</span>
              <input
                className="lm-input"
                inputMode="numeric"
                value={v.anios_experiencia}
                onChange={(e) => set('anios_experiencia', e.target.value)}
              />
            </label>
            <label className="lm-campo">
              <span className="lm-campo__etiqueta">Idiomas</span>
              <input
                className="lm-input"
                placeholder="Español, Inglés"
                value={v.idiomas}
                onChange={(e) => set('idiomas', e.target.value)}
              />
              <span className="lm-campo__ayuda">Separados por comas.</span>
            </label>
            <label className="lm-campo">
              <span className="lm-campo__etiqueta">Aseguradoras</span>
              <input
                className="lm-input"
                placeholder="GNP, AXA"
                value={v.aseguradoras}
                onChange={(e) => set('aseguradoras', e.target.value)}
              />
              <span className="lm-campo__ayuda">Separadas por comas.</span>
            </label>
            <label className="lm-campo">
              <span className="lm-campo__etiqueta">Google Place ID</span>
              <input
                className="lm-input"
                value={v.google_place_id}
                onChange={(e) => set('google_place_id', e.target.value)}
              />
              <span className="lm-campo__ayuda">
                Para traer su calificación de Google. Se puede dejar vacío.
              </span>
            </label>
          </div>
        </section>

        {/* ── Servicios ─────────────────────────────────── */}
        <section className="lm-grupo">
          <h2>Servicios y precios</h2>
          <p className="lm-grupo__intro">
            El precio desde es de los datos que más filtra el paciente. Se publica solo si él
            quiere.
          </p>

          {v.servicios.map((s, i) => (
            <div key={i} className="lm-rejilla" style={{ alignItems: 'end' }}>
              <label className="lm-campo">
                <span className="lm-campo__etiqueta">Servicio</span>
                <input
                  className="lm-input"
                  value={s.nombre}
                  onChange={(e) =>
                    setV((actual) => ({
                      ...actual,
                      servicios: actual.servicios.map((x, j) =>
                        j === i ? { ...x, nombre: e.target.value } : x,
                      ),
                    }))
                  }
                />
              </label>
              <label className="lm-campo">
                <span className="lm-campo__etiqueta">Precio desde (MXN)</span>
                <input
                  className="lm-input"
                  inputMode="numeric"
                  value={s.precio_desde}
                  onChange={(e) =>
                    setV((actual) => ({
                      ...actual,
                      servicios: actual.servicios.map((x, j) =>
                        j === i ? { ...x, precio_desde: e.target.value } : x,
                      ),
                    }))
                  }
                />
              </label>
              <div className="lm-campo">
                <label className="lm-check">
                  <input
                    type="checkbox"
                    checked={s.publicar_precio}
                    onChange={(e) =>
                      setV((actual) => ({
                        ...actual,
                        servicios: actual.servicios.map((x, j) =>
                          j === i ? { ...x, publicar_precio: e.target.checked } : x,
                        ),
                      }))
                    }
                  />
                  <span>Publicar el precio</span>
                </label>
                <button
                  type="button"
                  className="lm-btn lm-btn--texto"
                  onClick={() =>
                    setV((actual) => ({
                      ...actual,
                      servicios: actual.servicios.filter((_, j) => j !== i),
                    }))
                  }
                >
                  Quitar
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            className="lm-btn lm-btn--contorno lm-btn--chico"
            onClick={() =>
              setV((actual) => ({
                ...actual,
                servicios: [...actual.servicios, { nombre: '', precio_desde: '', publicar_precio: true }],
              }))
            }
          >
            Agregar servicio
          </button>
        </section>

        {/* ── Preguntas frecuentes ──────────────────────── */}
        <section className="lm-grupo">
          <h2>Preguntas frecuentes</h2>
          <p className="lm-grupo__intro">
            Las que el profesional contesta todos los días por teléfono.
          </p>

          {v.faqs.map((f, i) => (
            <div className="lm-repetidor" key={i}>
              <label className="lm-campo">
                <span className="lm-campo__etiqueta">Pregunta</span>
                <input
                  className="lm-input"
                  value={f.pregunta}
                  onChange={(e) =>
                    setV((actual) => ({
                      ...actual,
                      faqs: actual.faqs.map((x, j) =>
                        j === i ? { ...x, pregunta: e.target.value } : x,
                      ),
                    }))
                  }
                />
              </label>
              <label className="lm-campo">
                <span className="lm-campo__etiqueta">Respuesta</span>
                <textarea
                  className="lm-textarea"
                  value={f.respuesta}
                  onChange={(e) =>
                    setV((actual) => ({
                      ...actual,
                      faqs: actual.faqs.map((x, j) =>
                        j === i ? { ...x, respuesta: e.target.value } : x,
                      ),
                    }))
                  }
                />
              </label>
              <button
                type="button"
                className="lm-btn lm-btn--texto"
                onClick={() =>
                  setV((actual) => ({ ...actual, faqs: actual.faqs.filter((_, j) => j !== i) }))
                }
              >
                Quitar esta pregunta
              </button>
            </div>
          ))}

          <button
            type="button"
            className="lm-btn lm-btn--contorno lm-btn--chico"
            onClick={() =>
              setV((actual) => ({
                ...actual,
                faqs: [...actual.faqs, { pregunta: '', respuesta: '', orden: actual.faqs.length + 1 }],
              }))
            }
          >
            Agregar pregunta
          </button>
        </section>

        {/* ── Publicación ───────────────────────────────── */}
        <section className="lm-grupo">
          <h2>Publicación</h2>

          <div className="lm-rejilla">
            <label className="lm-campo">
              <span className="lm-campo__etiqueta">Estado del perfil</span>
              <select
                className="lm-select"
                value={v.estatus}
                onChange={(e) => set('estatus', e.target.value as ValoresFormulario['estatus'])}
              >
                <option value="borrador">Borrador</option>
                <option value="publicado">Publicado</option>
                <option value="pausado">Pausado</option>
              </select>
              {!v.verificado_en && (
                <span className="lm-campo__ayuda">
                  Para publicar hace falta la cédula verificada.
                </span>
              )}
            </label>

            <div className="lm-campo">
              <span className="lm-campo__etiqueta">Distintivo</span>
              <label className="lm-check">
                <input
                  type="checkbox"
                  checked={v.es_fundador}
                  onChange={(e) => set('es_fundador', e.target.checked)}
                />
                <span>Conserva el precio de fundador</span>
              </label>
            </div>
          </div>
        </section>

        {/* ── Barra de acciones ─────────────────────────── */}
        <div className="lm-barra-acciones">
          <div style={{ flex: '1 1 220px', minWidth: 200 }}>
            <div
              style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5, marginBottom: 4 }}
            >
              <span>Completitud del perfil</span>
              <strong className="lm-num">{completitud}%</strong>
            </div>
            <div className="lm-barra">
              <div
                className={`lm-barra__relleno${completitud < 70 ? ' lm-barra__relleno--bajo' : ''}${completitud === 100 ? ' lm-barra__relleno--completo' : ''}`}
                style={{ width: `${completitud}%` }}
              />
            </div>
            {pendientes.length > 0 && (
              <p className="lm-nota" style={{ marginTop: 5 }}>
                Falta: {pendientes.slice(0, 3).join(', ')}
                {pendientes.length > 3 && ` y ${pendientes.length - 3} más`}
              </p>
            )}
          </div>

          <button
            type="button"
            className="lm-btn lm-btn--primario"
            disabled={guardando}
            onClick={() => void guardar()}
          >
            {guardando ? 'Guardando…' : 'Guardar'}
          </button>

          <button
            type="button"
            className="lm-btn lm-btn--contorno"
            disabled={guardando}
            onClick={() => void vistaPrevia()}
          >
            Guardar y ver vista previa
          </button>

          {v.estatus !== 'publicado' && (
            <button
              type="button"
              className="lm-btn lm-btn--contorno"
              disabled={guardando || !v.verificado_en}
              onClick={() => void guardar('publicado')}
            >
              Publicar
            </button>
          )}

          {v.id && (
            <Link href={rutas.adminProfesionales()} className="lm-btn lm-btn--texto">
              Volver al listado
            </Link>
          )}
        </div>

        {mensaje && (
          <div
            className={mensaje.tono === 'ok' ? 'lm-aviso lm-aviso--sello' : 'lm-aviso lm-aviso--alerta'}
            role="status"
            style={{ marginTop: 12 }}
          >
            {mensaje.texto}
          </div>
        )}
      </form>
    </>
  );
}

/* ── Piezas auxiliares ──────────────────────────────────── */

function NuevaEspecialidad({ onCreada }: { onCreada: (e: Especialidad) => void }) {
  const [abierto, setAbierto] = useState(false);
  const [nombre, setNombre] = useState('');
  const [plural, setPlural] = useState('');

  if (!abierto) {
    return (
      <button type="button" className="lm-btn lm-btn--texto" onClick={() => setAbierto(true)}>
        ¿Falta una especialidad? Agrégala al catálogo
      </button>
    );
  }

  return (
    <div className="lm-repetidor">
      <div className="lm-rejilla">
        <label className="lm-campo">
          <span className="lm-campo__etiqueta">Especialidad</span>
          <input
            className="lm-input"
            placeholder="Reumatología"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </label>
        <label className="lm-campo">
          <span className="lm-campo__etiqueta">Cómo se le llama a quien la ejerce</span>
          <input
            className="lm-input"
            placeholder="Reumatólogos"
            value={plural}
            onChange={(e) => setPlural(e.target.value)}
          />
        </label>
      </div>
      <button
        type="button"
        className="lm-btn lm-btn--primario lm-btn--chico"
        onClick={async () => {
          const respuesta = await fetch('/api/listamedica/admin/especialidad', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, plural }),
          });
          const datos = await respuesta.json();
          if (datos.ok) {
            onCreada(datos.especialidad);
            setNombre('');
            setPlural('');
            setAbierto(false);
          }
        }}
      >
        Agregar al catálogo
      </button>
    </div>
  );
}

interface Sugerencia {
  etiqueta: string;
  lat: number;
  lng: number;
  colonia: string;
  cp: string;
}

function BuscadorDireccion({ onElegir }: { onElegir: (s: Sugerencia) => void }) {
  const [consulta, setConsulta] = useState('');
  const [sugerencias, setSugerencias] = useState<Sugerencia[]>([]);
  const [buscando, setBuscando] = useState(false);

  async function buscar() {
    if (consulta.trim().length < 5) return;
    setBuscando(true);
    try {
      const respuesta = await fetch(
        `/api/listamedica/admin/geocodificar?q=${encodeURIComponent(consulta)}`,
      );
      const datos = await respuesta.json();
      setSugerencias(datos.sugerencias ?? []);
    } finally {
      setBuscando(false);
    }
  }

  return (
    <div style={{ marginBottom: 12 }}>
      <label className="lm-campo">
        <span className="lm-campo__etiqueta">Buscar la dirección en el mapa</span>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            className="lm-input"
            placeholder="Boulevard del Niño Poblano 2901, Angelópolis"
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                void buscar();
              }
            }}
          />
          <button
            type="button"
            className="lm-btn lm-btn--contorno lm-btn--chico"
            onClick={() => void buscar()}
            disabled={buscando}
          >
            {buscando ? 'Buscando…' : 'Buscar'}
          </button>
        </div>
        <span className="lm-campo__ayuda">
          Al elegir un resultado se fijan las coordenadas, la colonia y el código postal.
        </span>
      </label>

      {sugerencias.length > 0 && (
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {sugerencias.map((s, i) => (
            <li key={i}>
              <button
                type="button"
                className="lm-sugerencia"
                onClick={() => {
                  onElegir(s);
                  setSugerencias([]);
                }}
              >
                {s.etiqueta}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Reduce y comprime una imagen en el navegador antes de subirla. */
async function reducirImagen(archivo: File, anchoMaximo: number): Promise<string> {
  const dataUrl = await new Promise<string>((resolver) => {
    const lector = new FileReader();
    lector.onload = () => resolver(String(lector.result));
    lector.readAsDataURL(archivo);
  });

  const imagen = await new Promise<HTMLImageElement>((resolver) => {
    const img = new Image();
    img.onload = () => resolver(img);
    img.src = dataUrl;
  });

  const escala = Math.min(1, anchoMaximo / imagen.width);
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(imagen.width * escala);
  canvas.height = Math.round(imagen.height * escala);
  canvas.getContext('2d')?.drawImage(imagen, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL('image/jpeg', 0.8);
}
