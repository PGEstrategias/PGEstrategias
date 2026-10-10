import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import s from "@/components/home/home.module.css";

export type Miga = { label: string; href: string };

/* Migas de pan visibles + schema BreadcrumbList. */
export default function Breadcrumbs({ items }: { items: Miga[] }) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: m.label,
      item: `${SITE_URL}${m.href === "/" ? "" : m.href}`,
    })),
  };
  return (
    <nav aria-label="Ruta de navegación" className={s.crumbs}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <ol>
        {items.map((m, i) =>
          i === items.length - 1 ? (
            <li key={m.href} aria-current="page">
              {m.label}
            </li>
          ) : (
            <li key={m.href}>
              <Link prefetch={false} href={m.href}>
                {m.label}
              </Link>
            </li>
          )
        )}
      </ol>
    </nav>
  );
}
