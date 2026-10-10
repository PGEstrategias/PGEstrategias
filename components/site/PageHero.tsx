import Breadcrumbs, { type Miga } from "./Breadcrumbs";
import s from "@/components/home/home.module.css";

/* Encabezado de subpágina. El título entra con animación CSS (no espera a
   JavaScript) para no retrasar el LCP. */
export default function PageHero({
  migas,
  eyebrow,
  titulo,
  sub,
  children,
}: {
  migas: Miga[];
  eyebrow?: string;
  titulo: string;
  sub?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className={s.pageHero}>
      <div className={s.container}>
        <Breadcrumbs items={migas} />
        {eyebrow && <p className={`${s.eyebrow} ${s.enter}`}>{eyebrow}</p>}
        <h1 className={`${s.pageTitle} ${s.enter}`}>{titulo}</h1>
        {sub && <p className={`${s.sub} ${s.enter} ${s.enterLate}`}>{sub}</p>}
        {children}
      </div>
    </section>
  );
}
