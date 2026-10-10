/* Revisa los artículos de /content/blog contra las reglas editoriales.
   Uso: npx tsx scripts/validar-blog.ts */
import { validaciones } from "../lib/blog";
import { SITE_URL } from "../lib/site";

for (const v of validaciones()) {
  console.log(`\n${v.archivo}`);
  console.log(`  slug:   ${v.slug}`);
  console.log(`  estado: ${v.publicado ? "PUBLICADO" : "BLOQUEADO"}`);
  console.log(`  url:    ${v.publicado ? `${SITE_URL}/blog/${v.slug}` : "—"}`);
  v.motivos.forEach((m) => console.log(`  - ${m}`));
  v.lineas.forEach((l) => console.log(`      L${l.n}: ${l.texto}`));
}
