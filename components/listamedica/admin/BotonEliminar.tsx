'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

/** Borra un perfil y todo lo que cuelga de él. Pide confirmación escrita. */
export default function BotonEliminar({ id, nombre }: { id: string; nombre: string }) {
  const router = useRouter();
  const [confirmando, setConfirmando] = useState(false);
  const [borrando, setBorrando] = useState(false);

  if (!confirmando) {
    return (
      <button type="button" className="lm-btn lm-btn--texto" onClick={() => setConfirmando(true)}>
        Eliminar
      </button>
    );
  }

  return (
    <span className="lm-fila-flex">
      <span style={{ fontSize: 13 }}>¿Eliminar a {nombre}?</span>
      <button
        type="button"
        className="lm-btn lm-btn--urgente lm-btn--chico"
        disabled={borrando}
        onClick={async () => {
          setBorrando(true);
          await fetch('/api/listamedica/admin/eliminar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
          });
          router.refresh();
        }}
      >
        Sí, eliminar
      </button>
      <button type="button" className="lm-btn lm-btn--texto" onClick={() => setConfirmando(false)}>
        Cancelar
      </button>
    </span>
  );
}
