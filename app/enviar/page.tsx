'use client';

import { useState } from 'react';

interface FormState {
  para: string;
  asunto: string;
  cco: string;
  badge: string;
  titulo: string;
  subtitulo: string;
  saludo: string;
  parrafos: string; // una línea por párrafo
  ctaTexto: string;
  ctaEnlace: string;
  heroImagen: string;
  seccionTitulo: string;
  features: string; // "Título | Descripción" por línea
  cierre: string;
  preheader: string;
}

const inicial: FormState = {
  para: '',
  asunto: '',
  cco: '',
  badge: 'Propuesta sin costo',
  titulo: '',
  subtitulo: '',
  saludo: 'Hola,',
  parrafos: '',
  ctaTexto: 'Quiero saber más',
  ctaEnlace: 'https://wa.me/5212221234567',
  heroImagen: '',
  seccionTitulo: '¿Qué incluye?',
  features: '',
  cierre: '',
  preheader: '',
};

/** Construye el objeto `props` que espera la plantilla a partir del formulario. */
function construirProps(f: FormState) {
  const parrafos = f.parrafos
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  const features = f.features
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const [title, descripcion] = l.split('|').map((s) => s.trim());
      return { title, descripcion: descripcion || undefined };
    });

  return {
    badge: f.badge || undefined,
    titulo: f.titulo,
    subtitulo: f.subtitulo || undefined,
    saludo: f.saludo || undefined,
    parrafos,
    ctaTexto: f.ctaTexto,
    ctaEnlace: f.ctaEnlace,
    heroImagen: f.heroImagen || undefined,
    seccionTitulo: f.seccionTitulo || undefined,
    features: features.length ? features : undefined,
    cierre: f.cierre || undefined,
    preheader: f.preheader || undefined,
  };
}

export default function PanelEnviar() {
  const [f, setF] = useState<FormState>(inicial);
  const [previewHtml, setPreviewHtml] = useState('');
  const [cargando, setCargando] = useState(false);
  const [resultado, setResultado] = useState<
    { ok: boolean; texto: string } | null
  >(null);

  const set = (campo: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setF((prev) => ({ ...prev, [campo]: e.target.value }));

  async function verPreview() {
    setResultado(null);
    const res = await fetch('/api/preview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ props: construirProps(f) }),
    });
    if (res.ok) {
      setPreviewHtml(await res.text());
    } else {
      setResultado({ ok: false, texto: await res.text() });
    }
  }

  async function enviar() {
    if (!confirm(`¿Enviar el correo a ${f.para}?`)) return;
    setCargando(true);
    setResultado(null);
    try {
      const res = await fetch('/api/enviar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          para: f.para,
          asunto: f.asunto,
          cco: f.cco || undefined,
          props: construirProps(f),
        }),
      });
      const data = await res.json();
      setResultado({
        ok: data.ok,
        texto: data.ok ? data.mensaje : `Error: ${data.error}`,
      });
    } catch (err) {
      setResultado({
        ok: false,
        texto: err instanceof Error ? err.message : 'Error de red',
      });
    } finally {
      setCargando(false);
    }
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#141312',
        color: '#F5F2EF',
        fontFamily: 'system-ui, sans-serif',
        padding: '32px 16px',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h1 style={{ fontSize: 24, margin: '0 0 4px' }}>
          <span style={{ color: '#D63A27' }}>◆</span> Panel de envío · PGE
        </h1>
        <p style={{ color: '#A9A5A0', margin: '0 0 24px', fontSize: 14 }}>
          Llena los datos, revisa la vista previa y envía la propuesta.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
            gap: 24,
            alignItems: 'start',
          }}
        >
          {/* Formulario */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Campo label="Correo destino *">
              <input style={inp} type="email" value={f.para} onChange={set('para')} placeholder="cliente@empresa.com" />
            </Campo>
            <Campo label="Asunto *">
              <input style={inp} value={f.asunto} onChange={set('asunto')} placeholder="Propuesta de contenido para tu marca" />
            </Campo>
            <Campo label="Copia oculta para ti (opcional)">
              <input style={inp} type="email" value={f.cco} onChange={set('cco')} placeholder="contacto@pgestrategias.com" />
            </Campo>

            <hr style={hr} />

            <Campo label="Badge (pastilla superior)">
              <input style={inp} value={f.badge} onChange={set('badge')} />
            </Campo>
            <Campo label="Título *">
              <input style={inp} value={f.titulo} onChange={set('titulo')} placeholder="Hagamos crecer tu marca" />
            </Campo>
            <Campo label="Subtítulo">
              <input style={inp} value={f.subtitulo} onChange={set('subtitulo')} />
            </Campo>
            <Campo label="Saludo">
              <input style={inp} value={f.saludo} onChange={set('saludo')} placeholder="Estimada Ana," />
            </Campo>
            <Campo label="Párrafos * (uno por línea)">
              <textarea style={{ ...inp, height: 110 }} value={f.parrafos} onChange={set('parrafos')} placeholder={'Primer párrafo de introducción.\nSegundo párrafo con la propuesta.'} />
            </Campo>

            <hr style={hr} />

            <Campo label="Texto del botón *">
              <input style={inp} value={f.ctaTexto} onChange={set('ctaTexto')} />
            </Campo>
            <Campo label="Enlace del botón * (WhatsApp / agenda)">
              <input style={inp} value={f.ctaEnlace} onChange={set('ctaEnlace')} />
            </Campo>
            <Campo label="Imagen hero (URL, opcional)">
              <input style={inp} value={f.heroImagen} onChange={set('heroImagen')} placeholder="https://res.cloudinary.com/..." />
            </Campo>

            <hr style={hr} />

            <Campo label="Título de sección de features">
              <input style={inp} value={f.seccionTitulo} onChange={set('seccionTitulo')} />
            </Campo>
            <Campo label='Features (una por línea, formato "Título | Descripción")'>
              <textarea style={{ ...inp, height: 90 }} value={f.features} onChange={set('features')} placeholder={'Sesión de producto | Fotos y video profesional\nEdición premium | Lista para Reels y TikTok'} />
            </Campo>
            <Campo label="Cierre (frase final)">
              <textarea style={{ ...inp, height: 60 }} value={f.cierre} onChange={set('cierre')} />
            </Campo>
            <Campo label="Preheader (vista previa en la bandeja)">
              <input style={inp} value={f.preheader} onChange={set('preheader')} />
            </Campo>

            <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
              <button style={btnSec} onClick={verPreview} type="button">
                Ver vista previa
              </button>
              <button
                style={{ ...btnPri, opacity: cargando ? 0.6 : 1 }}
                onClick={enviar}
                disabled={cargando}
                type="button"
              >
                {cargando ? 'Enviando…' : 'Enviar correo'}
              </button>
            </div>

            {resultado && (
              <div
                style={{
                  marginTop: 6,
                  padding: '12px 14px',
                  borderRadius: 10,
                  fontSize: 14,
                  background: resultado.ok ? '#12341f' : '#3a1512',
                  border: `1px solid ${resultado.ok ? '#1f7a45' : '#D63A27'}`,
                  color: resultado.ok ? '#7fe0a0' : '#f0a89c',
                }}
              >
                {resultado.ok ? '✓ ' : '✖ '}
                {resultado.texto}
              </div>
            )}
          </div>

          {/* Vista previa */}
          <div
            style={{
              position: 'sticky',
              top: 24,
              border: '1px solid #35322E',
              borderRadius: 12,
              overflow: 'hidden',
              background: '#0d0c0b',
              height: 'calc(100vh - 90px)',
            }}
          >
            {previewHtml ? (
              <iframe
                title="Vista previa del correo"
                srcDoc={previewHtml}
                style={{ width: '100%', height: '100%', border: 0, background: '#fff' }}
              />
            ) : (
              <div
                style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#6E6A66',
                  fontSize: 14,
                  padding: 20,
                  textAlign: 'center',
                }}
              >
                Presiona “Ver vista previa” para ver cómo quedará el correo.
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function Campo({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: 'block' }}>
      <span
        style={{
          display: 'block',
          fontSize: 12,
          color: '#A9A5A0',
          marginBottom: 5,
        }}
      >
        {label}
      </span>
      {children}
    </label>
  );
}

const inp: React.CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  background: '#1E1B1A',
  border: '1px solid #35322E',
  borderRadius: 8,
  color: '#F5F2EF',
  padding: '10px 12px',
  fontSize: 14,
  fontFamily: 'inherit',
  resize: 'vertical',
};

const hr: React.CSSProperties = {
  border: 0,
  borderTop: '1px solid #26221F',
  margin: '4px 0',
};

const btnPri: React.CSSProperties = {
  background: '#D63A27',
  color: '#fff',
  border: 0,
  borderRadius: 999,
  padding: '11px 22px',
  fontSize: 14,
  fontWeight: 700,
  cursor: 'pointer',
};

const btnSec: React.CSSProperties = {
  background: 'transparent',
  color: '#F5F2EF',
  border: '1px solid #35322E',
  borderRadius: 999,
  padding: '11px 22px',
  fontSize: 14,
  fontWeight: 600,
  cursor: 'pointer',
};
