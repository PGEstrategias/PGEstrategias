'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const LADO = 512;

/**
 * Recorte cuadrado de la foto, dentro del mismo formulario.
 *
 * Se hace en el navegador y se sube ya en 512×512 JPEG: el perfil en móvil es
 * lo crítico del producto y no vamos a servir un retrato de 4 MB tomado del
 * celular del profesional.
 */
export default function RecorteFoto({
  fotoActual,
  onListo,
}: {
  fotoActual: string;
  onListo: (dataUrl: string) => void;
}) {
  const [imagen, setImagen] = useState<HTMLImageElement | null>(null);
  const [zoom, setZoom] = useState(1);
  const [centro, setCentro] = useState({ x: 0.5, y: 0.5 });
  const lienzo = useRef<HTMLCanvasElement>(null);
  const arrastre = useRef<{ x: number; y: number } | null>(null);

  const pintar = useCallback(() => {
    const canvas = lienzo.current;
    if (!canvas || !imagen) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Recuadro de origen: el lado menor de la imagen, reducido por el zoom.
    const lado = Math.min(imagen.width, imagen.height) / zoom;
    const x = Math.min(Math.max(centro.x * imagen.width - lado / 2, 0), imagen.width - lado);
    const y = Math.min(Math.max(centro.y * imagen.height - lado / 2, 0), imagen.height - lado);

    ctx.fillStyle = '#f0ede7';
    ctx.fillRect(0, 0, LADO, LADO);
    ctx.drawImage(imagen, x, y, lado, lado, 0, 0, LADO, LADO);
  }, [imagen, zoom, centro]);

  useEffect(() => {
    pintar();
  }, [pintar]);

  function cargar(archivo: File) {
    const lector = new FileReader();
    lector.onload = () => {
      const img = new Image();
      img.onload = () => {
        setImagen(img);
        setZoom(1);
        setCentro({ x: 0.5, y: 0.5 });
      };
      img.src = String(lector.result);
    };
    lector.readAsDataURL(archivo);
  }

  function mover(evento: React.PointerEvent<HTMLCanvasElement>) {
    if (!arrastre.current || !imagen) return;
    const dx = evento.clientX - arrastre.current.x;
    const dy = evento.clientY - arrastre.current.y;
    arrastre.current = { x: evento.clientX, y: evento.clientY };
    const caja = lienzo.current?.getBoundingClientRect();
    if (!caja) return;
    setCentro((c) => ({
      x: Math.min(Math.max(c.x - dx / caja.width / zoom, 0), 1),
      y: Math.min(Math.max(c.y - dy / caja.height / zoom, 0), 1),
    }));
  }

  function confirmar() {
    const canvas = lienzo.current;
    if (!canvas) return;
    onListo(canvas.toDataURL('image/jpeg', 0.82));
  }

  return (
    <div>
      <label className="lm-campo">
        <span className="lm-campo__etiqueta">Fotografía del profesional</span>
        <input
          type="file"
          accept="image/*"
          className="lm-input"
          onChange={(e) => {
            const archivo = e.target.files?.[0];
            if (archivo) cargar(archivo);
          }}
        />
        <span className="lm-campo__ayuda">
          Se recorta en cuadrado y se sube optimizada. Arrastra sobre la imagen para encuadrar.
        </span>
      </label>

      {imagen && (
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <canvas
            ref={lienzo}
            width={LADO}
            height={LADO}
            onPointerDown={(e) => {
              arrastre.current = { x: e.clientX, y: e.clientY };
              e.currentTarget.setPointerCapture(e.pointerId);
            }}
            onPointerMove={mover}
            onPointerUp={() => {
              arrastre.current = null;
            }}
            style={{
              width: 180,
              height: 180,
              borderRadius: '50%',
              border: '1px solid var(--linea)',
              cursor: 'grab',
              touchAction: 'none',
            }}
          />
          <div style={{ flex: '1 1 220px', minWidth: 200 }}>
            <label className="lm-campo">
              <span className="lm-campo__etiqueta">Acercamiento</span>
              <input
                type="range"
                min={1}
                max={3}
                step={0.05}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--azul)' }}
              />
            </label>
            <button
              type="button"
              className="lm-btn lm-btn--primario lm-btn--chico"
              onClick={confirmar}
            >
              Usar este recorte
            </button>
          </div>
        </div>
      )}

      {!imagen && fotoActual && (
        <div className="lm-fila-flex">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={fotoActual}
            alt="Fotografía cargada"
            width={90}
            height={90}
            style={{ borderRadius: '50%', border: '1px solid var(--linea)', objectFit: 'cover' }}
          />
          <span className="lm-gris" style={{ fontSize: 13.5 }}>
            Ya hay foto cargada. Sube otra para reemplazarla.
          </span>
        </div>
      )}
    </div>
  );
}
