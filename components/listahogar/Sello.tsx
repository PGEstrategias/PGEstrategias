import { fechaLarga } from '@/lib/listahogar/datos';

type Tamano = 'chico' | 'mediano' | 'grande';

/**
 * Sello de profesional verificado. Mismo lenguaje que el de Lista Médica
 * —timbre de documento, no badge—, pero rectangular, como placa de taller.
 */
export default function Sello({
  fecha,
  tamano = 'mediano',
  dibuja = false,
}: {
  fecha: string;
  tamano?: Tamano;
  dibuja?: boolean;
}) {
  const clases = ['lh-sello', `lh-sello--${tamano}`];
  if (dibuja) clases.push('lh-sello--dibuja');

  return (
    <span
      className={clases.join(' ')}
      role="img"
      aria-label={`Profesional verificado por Lista Hogar el ${fechaLarga(fecha)}`}
    >
      <svg className="lh-sello__marco" viewBox="0 0 300 120" aria-hidden="true">
        <rect className="lh-sello__externo" x="2" y="2" width="296" height="116" rx="14" />
        <rect className="lh-sello__interno" x="9" y="9" width="282" height="102" rx="9" />
      </svg>
      <span className="lh-sello__texto">
        <span className="lh-sello__titulo">Verificado</span>
        <span className="lh-sello__fuente">INE · domicilio · referencias</span>
        {tamano !== 'chico' && <span className="lh-sello__fecha">{fechaLarga(fecha)}</span>}
      </span>
    </span>
  );
}
