export default function Estrellas({ valor, total }: { valor: number; total: number }) {
  return (
    <span className="lh-estrellas" aria-label={`${valor} de 5, ${total} reseñas`}>
      <span aria-hidden="true" className="lh-estrellas__icono">
        ★
      </span>
      <strong className="lh-num">{valor.toFixed(1)}</strong>
      <span className="lh-gris lh-num">({total})</span>
    </span>
  );
}
