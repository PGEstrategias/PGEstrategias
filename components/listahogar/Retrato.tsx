/** Iniciales en lugar de foto: en el demo no hay fotografías de personas reales. */
export default function Retrato({
  nombre,
  apellidos,
  grande = false,
}: {
  nombre: string;
  apellidos: string;
  grande?: boolean;
}) {
  const iniciales = `${nombre.charAt(0)}${apellidos.charAt(0)}`.toUpperCase();
  return (
    <span className={`lh-retrato${grande ? ' lh-retrato--grande' : ''}`} aria-hidden="true">
      {iniciales}
    </span>
  );
}
