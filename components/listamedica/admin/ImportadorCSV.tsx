'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Revisada {
  linea: number;
  nombre: string;
  valida: boolean;
  problemas: string[];
}

/**
 * Importador de CSV en dos pasos: primero se revisa el archivo y se muestra
 * fila por fila qué entraría, y solo entonces se escribe. Subir ochenta
 * perfiles a ciegas no se puede deshacer.
 */
export default function ImportadorCSV() {
  const router = useRouter();
  const [csv, setCsv] = useState('');
  const [nombreArchivo, setNombreArchivo] = useState('');
  const [revisadas, setRevisadas] = useState<Revisada[] | null>(null);
  const [trabajando, setTrabajando] = useState(false);
  const [mensaje, setMensaje] = useState<{ tono: 'ok' | 'error'; texto: string } | null>(null);

  const validas = revisadas?.filter((r) => r.valida).length ?? 0;

  async function enviar(revisar: boolean) {
    setTrabajando(true);
    setMensaje(null);
    try {
      const respuesta = await fetch('/api/listamedica/admin/importar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ csv, revisar }),
      });
      const datos = await respuesta.json();

      if (!datos.ok) {
        setMensaje({ tono: 'error', texto: datos.error ?? 'No se pudo procesar el archivo.' });
        return;
      }

      setRevisadas(datos.revisadas);
      if (!revisar) {
        setMensaje({
          tono: 'ok',
          texto: `Se dieron de alta ${datos.guardados} perfiles como borrador. Ninguno queda publicado hasta verificar su cédula.`,
        });
        router.refresh();
      }
    } catch {
      setMensaje({ tono: 'error', texto: 'Error de red. Intenta de nuevo.' });
    } finally {
      setTrabajando(false);
    }
  }

  return (
    <>
      <section className="lm-grupo">
        <h2>1. El archivo</h2>
        <p className="lm-grupo__intro">
          Una fila por profesional, con las columnas de la plantilla. Los perfiles entran como
          borrador y sin verificar: la cédula se marca a mano, con la captura de la SEP enfrente.
        </p>

        <p>
          <a className="lm-btn lm-btn--contorno lm-btn--chico" href="/api/listamedica/admin/importar">
            Descargar la plantilla
          </a>
        </p>

        <label className="lm-campo" style={{ marginTop: 14 }}>
          <span className="lm-campo__etiqueta">Archivo CSV</span>
          <input
            type="file"
            accept=".csv,text/csv"
            className="lm-input"
            onChange={async (e) => {
              const archivo = e.target.files?.[0];
              if (!archivo) return;
              setNombreArchivo(archivo.name);
              setCsv(await archivo.text());
              setRevisadas(null);
              setMensaje(null);
            }}
          />
          {nombreArchivo && <span className="lm-campo__ayuda">{nombreArchivo}</span>}
        </label>

        <button
          type="button"
          className="lm-btn lm-btn--primario lm-btn--chico"
          disabled={!csv || trabajando}
          onClick={() => void enviar(true)}
        >
          {trabajando ? 'Revisando…' : 'Revisar el archivo'}
        </button>
      </section>

      {revisadas && (
        <section className="lm-grupo">
          <h2>2. Qué entraría</h2>
          <p className="lm-grupo__intro">
            {validas} de {revisadas.length} filas se pueden dar de alta.
          </p>

          <div className="lm-tabla-marco">
            <table className="lm-tabla">
              <thead>
                <tr>
                  <th scope="col" className="lm-num">
                    Línea
                  </th>
                  <th scope="col">Profesional</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Observaciones</th>
                </tr>
              </thead>
              <tbody>
                {revisadas.map((r) => (
                  <tr key={r.linea}>
                    <td className="lm-num">{r.linea}</td>
                    <td>{r.nombre || '—'}</td>
                    <td>
                      <span
                        className={r.valida ? 'lm-estatus lm-estatus--publicado' : 'lm-estatus lm-estatus--borrador'}
                      >
                        {r.valida ? 'entra' : 'se omite'}
                      </span>
                    </td>
                    <td className="lm-gris" style={{ fontSize: 13.5 }}>
                      {r.problemas.join(' ') || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            type="button"
            className="lm-btn lm-btn--primario"
            style={{ marginTop: 14 }}
            disabled={validas === 0 || trabajando}
            onClick={() => void enviar(false)}
          >
            {trabajando ? 'Importando…' : `Importar ${validas} perfiles como borrador`}
          </button>
        </section>
      )}

      {mensaje && (
        <div
          className={mensaje.tono === 'ok' ? 'lm-aviso lm-aviso--sello' : 'lm-aviso lm-aviso--alerta'}
          role="status"
        >
          {mensaje.texto}
        </div>
      )}
    </>
  );
}
