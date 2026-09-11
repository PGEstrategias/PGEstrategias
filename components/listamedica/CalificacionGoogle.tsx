/**
 * Reputación traída de Google.
 *
 * Solo mostramos calificación, conteo y el enlace a la ficha pública. El texto
 * de las reseñas no se copia ni se guarda: los términos de la API de Google lo
 * restringen, y no alojarlo nos deja fuera de cualquier reclamo por lo que
 * alguien escribió.
 *
 * Si el profesional no tiene ficha en Google, este bloque no existe. Nada de
 * estrellas grises ni de huecos.
 */
export default function CalificacionGoogle({
  rating,
  total,
  placeId,
  compacto = false,
}: {
  rating: number | null;
  total: number | null;
  placeId: string;
  compacto?: boolean;
}) {
  if (rating === null || total === null || total === 0) return null;

  const enlace = placeId
    ? `https://search.google.com/local/reviews?placeid=${encodeURIComponent(placeId)}`
    : null;

  return (
    <span className="lm-google">
      <LogoGoogle />
      <span className="lm-google__calif">{rating.toFixed(1)}</span>
      <span className="lm-google__nota">
        {total} {total === 1 ? 'reseña' : 'reseñas'}
      </span>
      {!compacto && enlace && (
        <a href={enlace} target="_blank" rel="noopener noreferrer">
          Ver reseñas en Google
        </a>
      )}
    </span>
  );
}

function LogoGoogle() {
  return (
    <svg width="15" height="15" viewBox="0 0 48 48" aria-label="Google" role="img">
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84a10.13 10.13 0 0 1-4.39 6.65v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.18Z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.32l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7A22 22 0 0 0 24 46Z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.19a13.2 13.2 0 0 1 0-8.38v-5.7H4.34a22 22 0 0 0 0 19.78l7.35-5.7Z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.94 4.34 14.11l7.35 5.7c1.73-5.2 6.58-9.06 12.31-9.06Z"
      />
    </svg>
  );
}
