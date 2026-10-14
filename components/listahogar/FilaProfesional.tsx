import Link from 'next/link';
import Estrellas from './Estrellas';
import Retrato from './Retrato';
import Sello from './Sello';
import {
  CIUDADES,
  OFICIOS,
  nombreCompleto,
  precio,
  rutas,
  whatsappPerfil,
  type Profesional,
} from '@/lib/listahogar/datos';

/** Una fila del padrón, con WhatsApp a la mano para no obligar a entrar al perfil. */
export default function FilaProfesional({ p }: { p: Profesional }) {
  const oficios = p.oficios
    .map((slug) => OFICIOS.find((o) => o.slug === slug)?.nombre)
    .filter(Boolean)
    .join(' · ');

  return (
    <article className="lh-fila">
      <Link href={rutas.perfil(p.slug)} tabIndex={-1} aria-hidden="true">
        <Retrato nombre={p.nombre} apellidos={p.apellidos} />
      </Link>

      <div>
        <Link href={rutas.perfil(p.slug)} className="lh-fila__nombre">
          {nombreCompleto(p)}
        </Link>
        <div className="lh-fila__oficio">
          {oficios}
          {p.negocio && <span className="lh-gris"> — {p.negocio}</span>}
        </div>
        <div className="lh-fila__meta">
          {CIUDADES[p.ciudad]} · {p.zonas.slice(0, 3).join(', ')}
          {p.zonas.length > 3 && ' y más'}
        </div>

        <div className="lh-fila__datos">
          <Estrellas valor={p.calificacion} total={p.resenas} />
          {p.visita !== null && (
            <span className="lh-gris">
              Visita <strong className="lh-tinta lh-num">{precio(p.visita)}</strong>
            </span>
          )}
          <span className="lh-gris">
            <strong className="lh-tinta lh-num">{p.anios}</strong> años de oficio
          </span>
        </div>

        <div className="lh-marbetes">
          {p.urgencias && <span className="lh-marbete lh-marbete--urgente">Urgencias 24 h</span>}
          {p.factura && <span className="lh-marbete">Factura</span>}
          <span className="lh-marbete">Garantía {p.garantiaDias} días</span>
          {p.fundador && <span className="lh-marbete lh-marbete--fundador">Fundador</span>}
        </div>

        <div style={{ marginTop: 10 }}>
          <Sello fecha={p.verificado} tamano="chico" />
        </div>
      </div>

      <div className="lh-fila__acciones">
        <a
          className="lh-btn lh-btn--wa lh-btn--chico"
          href={whatsappPerfil(p)}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>
        <Link href={rutas.perfil(p.slug)} className="lh-btn lh-btn--contorno lh-btn--chico">
          Ver perfil
        </Link>
      </div>
    </article>
  );
}
