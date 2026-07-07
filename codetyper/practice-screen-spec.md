# CodeTyper — Practice Screen (Light Mode) Design Spec

Rediseño del light mode de la pantalla de práctica. Misma lógica que el resto: **escala de grises por zonas + profundidad 3D con sombras**. Reutiliza `theme-light.css` (variables `--ct-*`); este archivo solo añade lo específico de esta pantalla.

Zonas (de chrome oscuro a claro):
**navbar superior (chrome) → sub-navbar (gris claro, casi como el centro) → centro casi blanco → paneles laterales (chrome) → footer (chrome)**. Lo interactivo (botones, teclas, cards) es blanco elevado con sombra; el activo se rellena con su color de acento.

Aplica TODO a tema light únicamente. No toques el dark.

---

## 1. Navbar superior (ya existe, solo confirmar)
Ya está estilado como el resto: fondo chrome `#ced4dd`, botones blancos elevados, "editor" activo azul, "teclado ON" verde. Mantener.

## 2. Sub-navbar (segunda barra)
NO debe verse igual que el navbar de arriba — se diferencia siendo **más claro**:
- Fondo: `#eef0f3` (gris muy claro, un paso por encima del centro), borde inferior `1px solid #cfd4dc`, `box-shadow: 0 1px 4px rgba(20,30,55,.05)`.
- Sus botones sí destacan: blancos con borde `#a9b0bc` y sombra `0 2px 5px rgba(30,41,59,.13)`.
- **Orden de la izquierda:** `← back` → **botón `⇄ traducción`** (NUEVO, ver §6) → título `english / <Lección>`.
- Después del título: **cápsula de stats** ERR/ACC/TIME/NEXT en UNA sola pieza blanca elevada (`border:1px solid #bcc3ce`, radius 10px, `box-shadow:0 3px 8px rgba(30,41,59,.12)`), con separadores internos `1px solid #e7eaef`. Cada valor con su color: ERR rojo `#d0392b`, ACC verde `#15974e`, TIME ámbar `#b8791b`, NEXT morado `#7b52e0`.
- `0/402` en gris tenue, y `siguiente →` como botón activo azul.
- A la derecha, grupo de toggles: `// OFF`, `VOZ OFF`, `editor` (activo azul), `$ terminal`, `STRUCTURE`, `KBD` (activo morado). Todos blancos elevados salvo el activo, que se rellena con su color.

## 3. Área central (texto a escribir)
- Fondo `#f4f6f9` (casi blanco).
- **El texto va CENTRADO**: contenedor `display:flex; flex-direction:column; align-items:center; justify-content:center`, con un wrapper interno `width:100%; max-width:720px`. Esto es clave para que quede equilibrado tanto con los paneles laterales abiertos como sin ellos.
- Número de línea en gris tenue `#b0b6bf` (ancho fijo 20px, alineado a la derecha), gap 22px con el texto.
- Línea activa (la que se escribe): texto `#3c434e`, resto `#aab1bb`. Fuente mono, ~21px, `letter-spacing:.5px`.

## 4. Teclado (panel derecho, propio)
Es un **panel aparte** (chrome), no parte del centro:
- Panel: `width:396px`, fondo `#ced4dd`, borde izquierdo `1px solid #adb4c0`.
- Header: `⌨ KEYBOARD` + toggles `⇧ / EN / ES` (EN activo azul).
- **Teclas (lo importante):** cada tecla es un recuadro **blanco elevado** con sombra, como en el dark. NO planas.
  - Reposo: `background:#fff; color:#3c434e; border:1px solid #b4bbc6; border-radius:7px; box-shadow:0 2px 3px rgba(30,41,59,.18), 0 1px 1px rgba(30,41,59,.12)`.
  - Las filas usan **flexbox** (`display:flex; gap:5px`) y cada tecla `flex:1 1 0; min-width:0` para que la fila completa (incluidos Backspace, `[ ] \`, Enter, Shift derecho) quepa sin cortarse. Las teclas anchas (Tab/Caps/Enter/Space) llevan más `flex-grow` (Space ~6, Caps/Enter ~1.9, Tab/Ctrl ~1.6).
  - **Tecla que toca pulsar (highlight):** ámbar → `background:#fbedcf; color:#b8791b; border:1.5px solid #b8791b; box-shadow:0 0 0 2px rgba(184,121,27,.2), 0 4px 10px rgba(184,121,27,.34)`.
  - Modificadores tipo Shift activos: azul → `background:#e8f0fe; color:#2f6fed; border:1px solid #2f6fed`.
- Abajo del panel: indicador de combo `Shift + t` (Shift azul, t ámbar), y una franja inferior `#c4cbd5` con `▢ prog` / `↑ shift · ↘ AltGr`.

## 5. Footer (barra inferior, la que indica la tecla)
Es un panel chrome (como los laterales), NO parte del centro:
- Fondo `#ced4dd`, borde superior `1px solid #adb4c0`, `box-shadow:0 -2px 8px rgba(20,30,55,.08)`, alto ~96px.
- Muestra ERRORS / ACCURACY / TIME con sus colores (rojo/verde/ámbar), grande (~26px, peso 700).
- Separador vertical `1px #adb4c0`.
- **Bloque "NEXT KEY"**: etiqueta pequeña + `⇧ Shift` (tecla blanca elevada) `+` y la **tecla objetivo iluminada** como tecla física: cuadrado 52px, `background:#fbedcf; color:#b8791b; border:2px solid #b8791b; box-shadow:0 0 0 3px rgba(184,121,27,.18), 0 6px 16px rgba(184,121,27,.32)`. Es el mismo resaltado ámbar que la tecla iluminada del teclado → coherencia visual: "esta es la tecla que debes pulsar".

## 6. Botón + Panel de TRADUCCIÓN (NUEVO)
- **Botón `⇄ traducción`** en el sub-navbar, entre `← back` y el título (ver §2). Reposo: blanco elevado. Activo (panel abierto): azul (`background:#e8f0fe; color:#2f6fed; border:1px solid #2f6fed; box-shadow:0 3px 8px rgba(47,111,237,.22)`).
- **Panel de traducción** a la IZQUIERDA del centro (mismo lado donde va el panel de estadísticas del usuario; son intercambiables/opcionales):
  - Panel chrome: `width:320px; background:#ced4dd; border-right:1px solid #adb4c0`, scrollable.
  - Header sticky: `⇄ traducción · <idioma>` + botón ✕ (blanco elevado, 28px).
  - Contenido: una **card blanca elevada por línea** (`background:#fff; border:1px solid #bcc3ce; border-radius:10px; padding:11px 14px; box-shadow:0 2px 6px rgba(30,41,59,.1)`), cada una con el nº de línea (gris tenue) + la traducción al idioma nativo del texto que se está leyendo. Sirve para practicar idiomas viendo qué significa cada frase.
  - Como el texto central va centrado (§3), abrir/cerrar este panel (o el de stats) no descuadra la lectura.

---

## Resumen de reglas transversales
- Chrome (navbar, laterales, footer) = gris `#ced4dd`. Sub-navbar = gris más claro `#eef0f3`. Centro = `#f4f6f9`.
- Todo lo interactivo (botón, tecla, card) = blanco `#fff` + sombra de elevación. Nunca plano con solo borde.
- Activo = relleno del color de acento + halo. Ámbar para "tecla a pulsar", azul para selección/acción, verde OK, morado estructura, rojo errores.
- Sombras exactas en `practice-light.css`.
