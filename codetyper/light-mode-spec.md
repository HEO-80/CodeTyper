# CodeTyper — Light Mode Design Spec

Objetivo: un light mode con **jerarquía por escala de grises** + **profundidad 3D minimalista con sombras**.
Regla mental: **los paneles (chrome) son gris tenue; el centro es casi blanco; lo interactivo es blanco elevado con sombra.**

---

## 1. Escala de zonas (de más oscuro a más claro)

| Zona | Background | Borde | Nota |
|------|-----------|-------|------|
| Fondo raíz de la app | `#e4e7ec` | — | se ve solo en los bordes/gaps |
| **Navbar (top bar)** | `#ced4dd` | inferior `#adb4c0` | gris tenue = chrome |
| **Sidebar izquierdo** | `#ced4dd` | derecho `#adb4c0` | gris tenue = chrome |
| **Panel de instrucciones (derecho)** | `#ced4dd` | izquierdo `#adb4c0` | gris tenue = chrome |
| Pie del sidebar (logout) | `#c4cbd5` | superior `#adb4c0` | un punto más oscuro |
| **Área central (main)** | `#f4f6f9` | — | casi blanco → contrasta con los laterales |
| **Cards / botones / recuadros** | `#ffffff` | ver §3 | lo más claro, "iluminado", elevado |

Idea clave que pediste: **navbar + laterales más apagados que el centro; lo seleccionable es más claro que su panel** y se levanta con sombra.

---

## 2. Sombras (profundidad 3D)

Usa sombra grisácea en dos capas, no solo borde:

- **Botón / pill / control:** `box-shadow: 0 3px 7px rgba(30,41,59,.16), 0 1px 2px rgba(30,41,59,.1);`
- **Card de snippet:** `box-shadow: 0 5px 16px rgba(30,41,59,.13), 0 2px 4px rgba(30,41,59,.08);`
- **Barra de comentarios / paneles blancos grandes:** `box-shadow: 0 4px 12px rgba(30,41,59,.11), 0 1px 3px rgba(30,41,59,.07);`
- **Botón TERMINAL (oscuro sólido):** `box-shadow: 0 4px 12px rgba(20,30,55,.28);`
- **Card de snippet en hover:** `transform: translateY(-3px);` + `box-shadow: 0 10px 26px rgba(21,151,78,.18);` + borde superior verde.

---

## 3. Bordes y tipografía

- Borde en cards/paneles blancos: `1px solid #bcc3ce`
- Borde en botones blancos: `1px solid #a9b0bc` (más oscuro → recorta sobre el gris)
- Card de snippet: además `border-top: 3px solid #b4bbc6` (pasa a verde en hover)
- Fuente: `JetBrains Mono` (cuerpo/UI) + `Chakra Petch` (logo/títulos grandes)

### Colores de texto
- Principal (ink): `#15181d`
- Secundario (sub): `#3c434e`
- Tenue / captions: `#9aa1ac`
- Etiquetas `// ...`: `#5b626c`

---

## 4. Colores de acento (estado activo)

| Uso | Color | Fondo activo | Borde activo |
|-----|-------|-------------|-------------|
| Azul (editor, links, best CPM) | `#2f6fed` | `#e8f0fe` | `#2f6fed` |
| Verde (idioma activo, precisión, OK) | `#15974e` | `#dcf5e4` | `#a9e3bf` |
| Ámbar (dificultad activa, tiempo) | `#b8791b` | `#fbedcf` | `#eecf8f` |
| Morado (instrucción activa, mindset) | `#7b52e0` | — | `#7b52e0` |
| Rosa (mentalidad) | `#d24d8a` | — | — |
| Gris neutro (lenguaje sin empezar) | `#aeb4bd` | — | — |

### Reglas de estado de los botones seleccionables
- **Reposo:** fondo blanco, borde `#a9b0bc`, sombra de botón (§2).
- **Categoría seleccionada:** fondo blanco, borde 1.5px del color de la categoría, halo `0 2px 10px <color>2e`.
- **Idioma seleccionado:** fondo `#dcf5e4`, borde `#15974e`, texto verde.
- **Dificultad seleccionada:** fondo `#fbedcf`, borde `#b8791b`, texto ámbar.
- **Etiquetas de sección** (`// category`, etc.): chip blanco, borde `#c4cad3`, sombra suave — texto rodeado que destaca.

---

## 5. Panel de instrucciones (derecha)

- Fondo del panel `#ced4dd` (chrome, gris tenue).
- Cada card: fondo `#ffffff`, borde `1px solid #bcc3ce`, sombra de panel (§2), icono + título + descripción + flecha `→`.
- **Card activa:** borde `1px solid #7b52e0`, título y flecha en morado, sombra `0 4px 16px #7b52e026`.

---

## 6. Nota sobre "boxear" secciones

En tu versión actual cada sección (category, difficulty, snippets) va dentro de un contenedor blanco grande. Puedes mantenerlo — solo aplícale la sombra de "panel blanco grande" (§2) y el borde `#bcc3ce`, para que también participe de la escala: gris de fondo → contenedor blanco elevado → controles blancos aún más elevados dentro.
