/* Cinta con los tipos de evento, en movimiento continuo. */
const ITEMS = ["Bodas", "XV años", "Brindis", "Bautizos", "Aniversarios", "Comuniones", "Pedidas de mano"];

export default function Ticker() {
  const fila = (
    <div aria-hidden className="items-center">
      {ITEMS.map((t) => (
        <span key={t} className="bodas-heading italic text-3xl md:text-5xl px-6 md:px-10 flex items-center gap-6 md:gap-10" style={{ color: "rgba(247,242,234,0.85)" }}>
          {t}
          <span style={{ color: "#D2AE6D", fontSize: "0.5em" }}>✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <section className="bodas-dark py-8 md:py-10 border-y" style={{ borderColor: "rgba(210,174,109,0.2)" }}>
      <p className="sr-only">Filmamos bodas, XV años, brindis, bautizos, aniversarios, comuniones y pedidas de mano.</p>
      <div className="bodas-ticker">
        {fila}
        {fila}
      </div>
    </section>
  );
}
