import * as React from 'react';
import { enviarCorreo } from '../lib/enviarCorreo';
import { PropuestaProspecto } from '../emails/plantillas/PropuestaProspecto';
import { prospectos, buscarProspecto } from '../emails/data/prospectos';

/**
 * Envía una propuesta a un prospecto definido en emails/data/prospectos.ts
 *
 *   npm run email:enviar landrover-puebla
 *   npm run email:enviar landrover-puebla -- --cco=contacto@pgestrategias.com
 *
 * Sin argumento, lista los prospectos disponibles.
 */
async function main() {
  const id = process.argv[2];
  const ccoArg = process.argv.find((a) => a.startsWith('--cco='));
  const cco = ccoArg ? ccoArg.split('=')[1] : undefined;

  if (!id) {
    console.log('\nProspectos disponibles:\n');
    for (const p of prospectos) {
      console.log(`  • ${p.id}  →  ${p.para}`);
    }
    console.log('\nUso:  npm run email:enviar <id>\n');
    return;
  }

  const prospecto = buscarProspecto(id);
  if (!prospecto) {
    console.error(`\n✖ No encontré el prospecto "${id}".`);
    console.error('  Revisa el id en emails/data/prospectos.ts\n');
    process.exit(1);
  }

  console.log(`\nEnviando a ${prospecto.para} …`);
  const info = await enviarCorreo({
    para: prospecto.para,
    asunto: prospecto.asunto,
    componente: React.createElement(PropuestaProspecto, prospecto.props),
    responderA: process.env.GMAIL_USER,
    cco,
  });

  console.log(`✔ Enviado. ID: ${info.messageId}\n`);
}

main().catch((err) => {
  console.error('\n✖ Error al enviar:', err.message, '\n');
  process.exit(1);
});
