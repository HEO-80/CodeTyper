# CodeTyper — Settings Modal (Light Mode) Design Spec

Aplica la MISMA escala de grises + profundidad 3D del light mode, pero dentro del modal de Settings.
Regla: **el modal es una app en miniatura** → header/footer = chrome gris; cuerpo = gris claro; cada grupo (`// apariencia`, `// editor`, `// comportamiento`) = card blanca elevada; los controles seleccionables = blancos con sombra, y el activo se rellena con su color de acento.

Reutiliza los tokens de `theme-light.css` que ya tienes. Este archivo solo añade los del modal.

---

## 1. Estructura de zonas del modal

| Parte | Background | Borde | Nota |
|-------|-----------|-------|------|
| Overlay de fondo | `rgba(30,38,52,.32)` + `backdrop-filter: blur(2px)` | — | oscurece la app detrás |
| Contenedor del modal | `#e4e7ec` | `1px solid #adb4c0`, radius `18px` | sombra grande (§3) |
| **Header** (icono + "Settings" + ✕) | `#ced4dd` | inferior `#adb4c0` | chrome gris tenue |
| **Cuerpo** (scroll) | `#eef0f3` | — | gris claro |
| **Cards de grupo** | `#ffffff` | `1px solid #bcc3ce`, radius `14px` | elevadas (§3), `flex-shrink:0` |
| Cabecera de cada card (`// apariencia`) | `#f7f8fa` | inferior `1px solid #eceef2` | franja de etiqueta |
| **Footer** (Restablecer / Guardar) | `#ced4dd` | superior `#adb4c0` | chrome gris tenue |

⚠️ IMPORTANTE: las cards de grupo son hijas de un contenedor `display:flex; flex-direction:column`. Ponles **`flex-shrink:0`** para que no se aplasten y el cuerpo del modal haga scroll (`overflow-y:auto`, `max-height:88vh`). Sin esto, las filas de dentro se recortan.

---

## 2. Controles seleccionables (segmentos)

Base (reposo):
```
background:#ffffff; color:#3c434e; border:1px solid #a9b0bc;
border-radius:9px; padding:8px 15px; font-weight:600;
box-shadow:0 3px 7px rgba(30,41,59,.16), 0 1px 2px rgba(30,41,59,.1);
```
Activo (rellena con el color según el control):
```
background:<color-bg>; color:<color>; border:1px solid <color>;
box-shadow:0 3px 9px <color>30;
```

Mapeo de activos:
- **Tema → Claro (activo):** ámbar. bg `#fbedcf`, color/borde `#b8791b`.
- **Tema → Oscuro:** base blanca.
- **Tamaño de fuente / Cursor (activo):** azul. bg `#e8f0fe`, color/borde `#2f6fed`.
- **Números de línea → ON (activo):** verde. bg `#dcf5e4`, color/borde `#15974e`.
- **Números de línea → OFF (activo):** rosa. bg `#fbe4ee`, color/borde `#d24d8a`.
- **Fuente (lista vertical, item activo):** azul. bg `#e8f0fe`, color/borde `#2f6fed`; los inactivos blancos con sombra suave `0 2px 5px rgba(30,41,59,.12)`, texto alineado a la izquierda.

### Color de acento (swatches redondos)
- Cada swatch: `30px` círculo del color, `padding:0`.
- Inactivo: `border:2px solid transparent`, `box-shadow:0 2px 5px rgba(30,41,59,.22)`.
- Activo: `border:2px solid #fff` + `box-shadow:0 0 0 2px <color>, 0 3px 8px <color>44` (anillo blanco + halo).
- Colores: azul `#2f6fed`, verde `#15974e`, morado `#7b52e0`, ámbar `#b8791b`, naranja `#e07a3f`, rojo `#d0392b`.

---

## 3. Sombras

- **Modal completo:** `0 24px 60px rgba(20,30,55,.34), 0 4px 12px rgba(20,30,55,.2)`
- **Card de grupo:** `0 4px 12px rgba(30,41,59,.11), 0 1px 3px rgba(30,41,59,.07)`
- **Botón ✕ / segmentos / Restablecer:** `0 3px 7px rgba(30,41,59,.16), 0 1px 2px rgba(30,41,59,.1)`
- **Botón "Guardar cambios" (azul sólido):** fondo `#2f6fed`, borde `#2258c9`, texto blanco, `box-shadow:0 4px 12px rgba(47,111,237,.36)`

---

## 4. Texto (igual que el resto del light mode)
- Título de fila (Tema, Fuente…): `700`, `#15181d`, 15px.
- Descripción bajo el título: `#8b929c`, 12.5px.
- Etiquetas `// ...`: `#5b626c`, 13px.
- Título "Settings" del header: fuente display (Chakra Petch), `700`, `#15181d`.
