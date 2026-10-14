import Link from 'next/link';
import Buscador from '@/components/listahogar/Buscador';
import FilaProfesional from '@/components/listahogar/FilaProfesional';
import Sello from '@/components/listahogar/Sello';
import { PROFESIONALES, TEXTO_SELLO, conteos, rutas } from '@/lib/listahogar/datos';

const CHIPS = ['plomeros', 'electricistas', 'cerrajeros', 'carpinteros', 'tecnicos-minisplit', 'pintores'];

const PASOS: [string, string][] = [
  ['Identidad', 'Revisamos su INE contra la persona que va a llegar a tu casa, con videollamada.'],
  ['Domicilio', 'Confirmamos con comprobante que vive donde dice. Nadie aparece sin dirección conocida.'],
  ['Referencias', 'Llamamos a tres clientes a quienes ya les trabajó y preguntamos si lo volverían a contratar.'],
  ['Precios a la vista', 'Publica cuánto cobra la visita y desde cuánto cada servicio, antes de que le escribas.'],
];

export default function HomePage() {
  const todos = conteos();
  const chips = CHIPS.map((slug) => todos.find((c) => c.oficio.slug === slug)!);
  const destacados = [...PROFESIONALES]
    .sort((a, b) => b.resenas - a.resenas)
    .slice(0, 5);

  return (
    <>
      <section className="lh-hero">
        <div className="lh-marco">
          <h1>
            Alguien de confianza para <span>arreglarlo</span>.
          </h1>
          <p className="lh-hero__sub">
            Plomeros, electricistas, cerrajeros y más oficios en Puebla, Cholula y Atlixco. Antes de
            publicar a alguien verificamos su identidad, su domicilio y hablamos con sus clientes.
          </p>

          <div className="lh-hero__buscador">
            <Buscador />
          </div>

          <div className="lh-chips" style={{ marginTop: 18 }}>
            {chips.map(({ oficio, total }) => (
              <Link key={oficio.slug} href={rutas.listado(oficio.slug, 'puebla')} className="lh-chip">
                {oficio.plural}
                <span className="lh-gris lh-num">{total}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="lh-seccion lh-seccion--alt lh-seccion--linea" id="como-verificamos">
        <div className="lh-marco">
          <div className="lh-sello-bloque" style={{ background: '#fff', marginBottom: 30 }}>
            <Sello fecha="2026-10-01" tamano="grande" dibuja />
            <div>
              <h2>Qué significa el sello</h2>
              <p style={{ marginTop: 10 }}>{TEXTO_SELLO}</p>
            </div>
          </div>

          <div className="lh-pasos">
            {PASOS.map(([titulo, texto], i) => (
              <div key={titulo} className="lh-paso">
                <div className="lh-paso__numero">{String(i + 1).padStart(2, '0')}</div>
                <h3>{titulo}</h3>
                <p>{texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lh-seccion" id="oficios">
        <div className="lh-marco">
          <div className="lh-encabezado">
            <h2>Todos los oficios</h2>
            <p>
              {PROFESIONALES.length} profesionales verificados en Puebla, Cholula y Atlixco.
            </p>
          </div>
          <div className="lh-indice">
            {todos.map(({ oficio, total }) => (
              <Link
                key={oficio.slug}
                href={rutas.listado(oficio.slug, 'puebla')}
                className="lh-indice__fila"
              >
                <span>{oficio.plural}</span>
                <span className="lh-indice__guia" aria-hidden="true" />
                <span className="lh-indice__conteo">{total}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="lh-seccion lh-seccion--linea">
        <div className="lh-marco">
          <div className="lh-encabezado">
            <h2>Los más recomendados</h2>
            <p>Escríbeles por WhatsApp desde aquí, sin entrar al perfil.</p>
          </div>
          <div className="lh-lista">
            {destacados.map((p) => (
              <FilaProfesional key={p.slug} p={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="lh-seccion lh-seccion--alt lh-seccion--linea">
        <div className="lh-marco">
          <div className="lh-fila-flex" style={{ justifyContent: 'space-between', gap: 24 }}>
            <div style={{ flex: '1 1 380px' }}>
              <h2>¿Tienes un oficio?</h2>
              <p style={{ marginTop: 10 }}>
                Mándanos tus datos por WhatsApp y armamos tu perfil. Los clientes te escriben
                directo a ti, sin comisiones por trabajo.
              </p>
            </div>
            <Link href={rutas.profesionales()} className="lh-btn lh-btn--primario">
              Ver cómo aparecer
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
