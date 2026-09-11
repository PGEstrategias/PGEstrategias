'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

/** Refresca la calificación de Google de todos los perfiles con ficha. */
export default function BotonGoogle() {
  const router = useRouter();
  const [trabajando, setTrabajando] = useState(false);
  const [resultado, setResultado] = useState<string | null>(null);

  return (
    <span className="lm-fila-flex">
      <button
        type="button"
        className="lm-btn lm-btn--contorno lm-btn--chico"
        disabled={trabajando}
        onClick={async () => {
          setTrabajando(true);
          setResultado(null);
          try {
            const respuesta = await fetch('/api/listamedica/admin/google', { method: 'POST' });
            const datos = await respuesta.json();
            if (!datos.ok) {
              setResultado(datos.error ?? 'No se pudo sincronizar.');
              return;
            }
            const errores = (datos.errores ?? []) as { detalle?: string }[];
            setResultado(
              errores.length
                ? `${datos.actualizados} actualizados · ${errores.length} con problema: ${errores[0].detalle ?? ''}`
                : `${datos.actualizados} perfiles actualizados.`,
            );
            router.refresh();
          } catch {
            setResultado('Error de red.');
          } finally {
            setTrabajando(false);
          }
        }}
      >
        {trabajando ? 'Sincronizando…' : 'Sincronizar Google'}
      </button>
      {resultado && (
        <span className="lm-gris" style={{ fontSize: 13 }}>
          {resultado}
        </span>
      )}
    </span>
  );
}
