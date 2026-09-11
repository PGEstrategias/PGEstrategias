'use client';

import { registrarClic } from './RegistroDeVista';
import { telefonoLegible, telefonoParaWhatsApp } from '@/lib/listamedica/texto';

/**
 * Llamar y Cómo llegar. Deliberadamente más discretos que el de WhatsApp:
 * el producto vive de la conversación escrita, no de la llamada.
 */
export default function AccionesSecundarias({
  profesionalId,
  telefono,
  mapaUrl,
}: {
  profesionalId: string;
  telefono: string;
  mapaUrl: string | null;
}) {
  return (
    <div className="lm-fila-flex">
      {telefono && (
        <a
          className="lm-btn lm-btn--contorno lm-btn--chico"
          href={`tel:+${telefonoParaWhatsApp(telefono)}`}
          onClick={() => registrarClic(profesionalId, 'telefono')}
        >
          Llamar al {telefonoLegible(telefono)}
        </a>
      )}
      {mapaUrl && (
        <a
          className="lm-btn lm-btn--contorno lm-btn--chico"
          href={mapaUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => registrarClic(profesionalId, 'mapa')}
        >
          Cómo llegar
        </a>
      )}
    </div>
  );
}
