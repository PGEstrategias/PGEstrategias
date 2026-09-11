'use client';

import { useEffect } from 'react';

/**
 * Registra una vista de perfil sin bloquear el renderizado.
 *
 * Va del lado del cliente a propósito: así no contamos los pases de robots
 * ni rompemos el cacheo de la página en el servidor. Solo se manda el id del
 * profesional y el tipo; ningún dato del visitante.
 */
export default function RegistroDeVista({ profesionalId }: { profesionalId: string }) {
  useEffect(() => {
    registrarClic(profesionalId, 'vista_perfil');
  }, [profesionalId]);

  return null;
}

export function registrarClic(
  profesionalId: string,
  tipo: 'telefono' | 'mapa' | 'vista_perfil',
): void {
  if (typeof window === 'undefined') return;
  const parametros = new URLSearchParams(window.location.search);
  const cuerpo = JSON.stringify({
    profesional_id: profesionalId,
    tipo,
    utm_source: parametros.get('utm_source') ?? '',
    utm_campaign: parametros.get('utm_campaign') ?? '',
    referrer: document.referrer || '',
  });

  try {
    const url = '/api/listamedica/clic';
    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, new Blob([cuerpo], { type: 'application/json' }));
      return;
    }
    void fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: cuerpo,
      keepalive: true,
    });
  } catch {
    // La métrica nunca debe estorbarle al visitante.
  }
}
