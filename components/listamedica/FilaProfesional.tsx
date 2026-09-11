import Link from 'next/link';
import BotonWhatsApp from './BotonWhatsApp';
import CalificacionGoogle from './CalificacionGoogle';
import Retrato from './Retrato';
import Sello from './Sello';
import { precioDesde } from '@/lib/listamedica/datos';
import { rutas } from '@/lib/listamedica/rutas';
import { nombreCompleto, precioMXN } from '@/lib/listamedica/texto';
import { zonaLegible } from '@/lib/listamedica/consultorio';
import type { ProfesionalCompleto } from '@/lib/listamedica/tipos';

/**
 * Una fila del padrón. Nunca una tarjeta: separador fino, fila alterna y la
 * jerarquía puesta en el tipo.
 *
 * Lleva el botón de WhatsApp aquí mismo a propósito. Obligar a entrar al
 * perfil para escribir es fricción, y la fricción es el enemigo.
 */
export default function FilaProfesional({ profesional }: { profesional: ProfesionalCompleto }) {
  const consultorio = profesional.consultorios[0];
  const desde = precioDesde(profesional);
  const especialidades = profesional.especialidades.map((e) => e.nombre).join(', ');

  return (
    <article className="lm-fila">
      <Link href={rutas.perfil(profesional.slug)} aria-hidden="true" tabIndex={-1}>
        <Retrato profesional={profesional} />
      </Link>

      <div>
        <Link href={rutas.perfil(profesional.slug)} className="lm-fila__nombre">
          {nombreCompleto(profesional)}
        </Link>

        {especialidades && <div className="lm-fila__especialidad">{especialidades}</div>}

        {consultorio && <div className="lm-fila__meta">{zonaLegible(consultorio)}</div>}

        <div className="lm-fila__datos">
          {desde !== null && (
            <span className="lm-fila__dato">
              Consulta desde <strong className="lm-num">{precioMXN(desde)}</strong>
            </span>
          )}
          <CalificacionGoogle
            rating={profesional.google_rating}
            total={profesional.google_reviews_count}
            placeId={profesional.google_place_id}
            compacto
          />
          {profesional.es_fundador && <span className="lm-marbete lm-marbete--fundador">Fundador</span>}
        </div>

        {profesional.verificado_en && (
          <div style={{ marginTop: 10 }}>
            <Sello fecha={profesional.verificado_en} tamano="chico" />
          </div>
        )}
      </div>

      <div className="lm-fila__acciones">
        <BotonWhatsApp profesionalId={profesional.id} variante="fila" />
        <Link href={rutas.perfil(profesional.slug)} className="lm-btn lm-btn--contorno lm-btn--chico">
          Ver perfil
        </Link>
      </div>
    </article>
  );
}
