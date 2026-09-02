import * as React from 'react';
import { render } from '@react-email/components';
import { writeFileSync, mkdirSync } from 'node:fs';
import { PropuestaProspecto } from '../emails/plantillas/PropuestaProspecto';
import { prospectos } from '../emails/data/prospectos';

/**
 * Renderiza los prospectos a archivos HTML estáticos en ./preview-out
 * para abrirlos en el navegador sin levantar el servidor.
 *   npm run email:render
 */
async function main() {
  mkdirSync('preview-out', { recursive: true });
  for (const p of prospectos) {
    const html = await render(
      React.createElement(PropuestaProspecto, p.props),
    );
    const ruta = `preview-out/${p.id}.html`;
    writeFileSync(ruta, html, 'utf8');
    console.log(`✔ ${ruta}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
