# Lista Médica

Directorio de profesionales de la salud para Puebla capital, Cholula y Atlixco.
Producto de PG Estrategias.

Hoy vive en `pgestrategias.com/listamedicamx`. El destino es `listamedica.mx`.

---

## Qué es y qué deliberadamente no es

Es un directorio consultable con perfiles ricos y filtros. Nada más.

No tiene —y es decisión de arquitectura, no olvido— agenda ni sistema de citas,
cuentas de paciente, panel para el profesional, telemedicina, ni ningún dato
clínico.

Consecuencia directa: **la plataforma no almacena datos personales de
pacientes.** No hay formulario de cita ni nombre o teléfono de paciente en
ninguna tabla. De un visitante solo queda analítica agregada y anónima. Si
alguna vez se piensa en agregar un formulario de contacto que capture datos del
paciente, la respuesta es no.

El único usuario con sesión es el administrador.

---

## Cómo arrancarlo

```bash
npm install
npm run listamedica:semilla     # escribe data/listamedica/*.json si no existen
npm run dev
```

- Sitio: http://localhost:3000/listamedicamx
- Panel: http://localhost:3000/listamedicamx/admin (pide la sesión de `/login`)

`npm run listamedica:semilla -- --forzar` reescribe los datos desde cero con los
doce perfiles de demostración.

---

## Variables de entorno

| Variable | Obligatoria | Para qué |
|---|---|---|
| `PANEL_USER`, `PANEL_PASSWORD` | sí, para el panel | Sesión del administrador. Ya las usa `/enviar`. |
| `LISTAMEDICA_DOMICILIO_FISCAL` | sí, para producción | Domicilio del responsable en el Aviso de Privacidad y en Términos. Sin ella el aviso sale marcado como incompleto. |
| `NEXT_PUBLIC_SITE_URL` | recomendable | Origen para canonical, JSON-LD y sitemap. Por omisión `https://pgestrategias.com`. |
| `NEXT_PUBLIC_LISTAMEDICA_BASE_PATH` | no | Subpath del directorio. Por omisión `/listamedicamx`. |
| `LISTAMEDICA_DATA_DIR` | según el hosting | Carpeta con permiso de escritura donde viven los JSON y las evidencias. |
| `NEXT_PUBLIC_META_PIXEL_ID` | no | Píxel de Meta. Sin ella el píxel no se monta. |
| `META_CAPI_TOKEN` | no | API de Conversiones. Manda `clic_whatsapp` desde el servidor. |
| `GOOGLE_PLACES_API_KEY` | no | Calificación y número de reseñas de Google. |
| `GOOGLE_MAPS_API_KEY` | no | Geocodificación en el panel. Sin ella se usa Nominatim de OpenStreetMap, que no pide llave. |

---

## Dónde vive cada cosa

```
app/listamedicamx/
  page.tsx                      Home con buscador, índice y destacados
  [listado]/page.tsx            /dermatologos-en-puebla y sus 50 hermanas
  dr/[slug]/page.tsx            El perfil. La página que genera el dinero
  w/[id]/route.ts               Registra el clic y redirige a WhatsApp
  buscar/page.tsx               Puente del buscador; deja registro de búsquedas
  registro/ precios/            Captación de profesionales
  como-verificamos/             Contenido de marca sobre el sello
  aviso-de-privacidad/ terminos/
  sitemap.xml/route.ts
  admin/                        Panel (protegido por middleware)
  listamedica.css               Todo el sistema visual, bajo la clase .lm

components/listamedica/         Sello, fila del padrón, buscador, CTA, perfil
components/listamedica/admin/   Formulario de alta, recorte de foto, importador

lib/listamedica/
  tipos.ts        Modelo de datos
  almacen.ts      Lectura y escritura (JSON hoy, SQL mañana)
  datos.ts        Consultas y escrituras del dominio
  metricas.ts     Todo lo que muestra el panel
  csv.ts          Importación masiva y exportaciones
  google.ts       Sincronización con Google Places
  rutas.ts        Todas las URLs salen de aquí
  marca.ts        Textos legales fijos y datos de contacto

data/listamedica/*.json         La base
docs/listamedica-esquema.sql    El mismo modelo en PostgreSQL
```

---

## Persistencia

Los datos viven en `data/listamedica/*.json`, una tabla por archivo, detrás de
`leerTabla` / `escribirTabla` en `lib/listamedica/almacen.ts`. Son las dos únicas
funciones que tocan el almacenamiento: el día que haya que pasar a Postgres se
reescriben esas dos y el resto del código no se entera. El esquema equivalente
ya está escrito en `docs/listamedica-esquema.sql`.

**Aviso operativo.** En un entorno con sistema de archivos de solo lectura —una
función serverless típica, Vercel incluido— las escrituras se quedan en memoria
del proceso y se pierden al reciclarse. En ese caso hay dos caminos:

1. Apuntar `LISTAMEDICA_DATA_DIR` a un volumen con permiso de escritura.
2. Implementar el adaptador de Postgres con el esquema de `docs/`.

El panel detecta la situación y la avisa arriba de todas sus páginas; no falla
en silencio.

---

## El CTA de WhatsApp

Todo el valor del producto se materializa en un mensaje de WhatsApp, así que el
botón no apunta a `wa.me`: apunta a `/listamedicamx/w/[id]`, que registra el
clic en la tabla `clics` y luego redirige. Sin ese salto no hay forma de saber
cuántos contactos generó la plataforma.

El mensaje va prellenado:

> Hola, doctor(a) [NOMBRE]. Lo encontré en Lista Médica y quisiera información
> sobre una consulta.

Esa frase hace dos trabajos: le baja la fricción al paciente y le demuestra al
profesional, en su propio teléfono, de dónde vino el paciente.

De cada clic se guarda el id del profesional, la fecha, `utm_source`,
`utm_campaign`, el referrer y si el dispositivo es móvil o de escritorio. **No se
guarda IP ni ningún identificador que apunte a una persona**, ni siquiera en la
API de Conversiones de Meta.

---

## Verificación de cédula

Un perfil no se publica sin cédula verificada, y la casilla no se puede marcar
sin haber cargado la captura del Registro Nacional de Profesionistas. Las dos
reglas están en el servidor (`app/api/listamedica/admin/guardar/route.ts`), no
solo en el formulario, y también como `CHECK` en el esquema SQL.

Las evidencias se guardan fuera de `/public`, en `LISTAMEDICA_DATA_DIR/evidencias/`,
y se sirven solo con sesión del panel.

---

## Mudanza a listamedica.mx

1. Cambiar `NEXT_PUBLIC_LISTAMEDICA_BASE_PATH` a cadena vacía y
   `NEXT_PUBLIC_SITE_URL` a `https://listamedica.mx`.
2. Mover `app/listamedicamx/` a la raíz de `app/` del proyecto nuevo, o dejar el
   directorio donde está y apuntar el dominio con un rewrite.
3. Ajustar el `matcher` de `middleware.ts`, que lleva la ruta del panel escrita
   a mano porque Next exige que sea estática.
4. Redirigir 301 de `pgestrategias.com/listamedicamx/*` al dominio nuevo.

Ninguna URL está quemada en los componentes: todas salen de `lib/listamedica/rutas.ts`.

---

## Reglas de copy que no se negocian

Español de México. Tuteo con el visitante, "usted" con el profesional. Frases
cortas. Los botones dicen qué pasa.

Nunca aparece en el sitio: "los mejores médicos", "garantizamos", "certificados
por nosotros", "recomendado", ninguna afirmación terapéutica ni comparativo
clínico, ningún nombre de competidor, y ninguna fecha inventada de fin de la
gratuidad.

La redacción sobre la gratuidad está en `lib/listamedica/marca.ts` como
`TEXTO_GRATUIDAD` y se usa tal cual en `/registro` y `/precios`.
