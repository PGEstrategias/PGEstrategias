import { nombreCompleto } from '@/lib/listamedica/texto';

/**
 * Foto del profesional. Cuando todavía no hay foto cargada, en lugar de un
 * placeholder de silueta se ponen las iniciales: se lee como un padrón, no
 * como un perfil incompleto.
 */
export default function Retrato({
  profesional,
  grande = false,
}: {
  profesional: { nombre: string; apellidos: string; titulo?: string; foto_url: string };
  grande?: boolean;
}) {
  const iniciales = `${profesional.nombre.charAt(0)}${profesional.apellidos.charAt(0)}`.toUpperCase();

  return (
    <span className={`lm-retrato${grande ? ' lm-retrato--grande' : ''}`}>
      {profesional.foto_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={profesional.foto_url}
          alt={`Fotografía de ${nombreCompleto(profesional)}`}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <span className="lm-retrato__iniciales" aria-hidden="true">
          {iniciales}
        </span>
      )}
    </span>
  );
}
