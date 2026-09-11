import { fechaLarga } from '@/lib/listamedica/texto';

type Tamano = 'chico' | 'mediano' | 'grande';

/**
 * Sello de cédula verificada.
 *
 * La fecha viene siempre del campo verificado_en. Si no hay fecha, no hay
 * sello: el componente devuelve null antes que pintar un timbre sin respaldo.
 */
export default function Sello({
  fecha,
  tamano = 'mediano',
  dibuja = false,
}: {
  fecha: string | null;
  tamano?: Tamano;
  dibuja?: boolean;
}) {
  if (!fecha) return null;

  const clases = ['lm-sello', `lm-sello--${tamano}`];
  if (dibuja) clases.push('lm-sello--dibuja');

  return (
    <span
      className={clases.join(' ')}
      role="img"
      aria-label={`Cédula profesional verificada ante la SEP el ${fechaLarga(fecha)}`}
    >
      <svg className="lm-sello__marco" viewBox="0 0 300 130" aria-hidden="true">
        <ellipse className="lm-sello__externo" cx="150" cy="65" rx="147" ry="62" />
        <ellipse className="lm-sello__interno" cx="150" cy="65" rx="140" ry="55" />
      </svg>
      <span className="lm-sello__texto">
        <span className="lm-sello__titulo">Cédula verificada</span>
        <span className="lm-sello__fuente">SEP</span>
        {tamano !== 'chico' && (
          <span className="lm-sello__fecha">Verificada el {fechaLarga(fecha)}</span>
        )}
      </span>
    </span>
  );
}
