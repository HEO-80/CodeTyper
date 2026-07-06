# CodeTyper — Settings Modal (DARK Mode) Design Spec

Misma estructura y jerarquía que el settings light, pero en dark. El problema actual es que todo es casi el mismo negro → cero contraste entre zonas y sin profundidad.
Regla: **header/footer = chrome (un tono más claro que el cuerpo); cuerpo = lo más oscuro; cada grupo = card "surface" elevada con borde sutil y sombra; el control activo se rellena con su acento atenuado + glow.**

Reutiliza tus clases del light (`.settings-modal`, `.settings-group`, `.seg`, etc.); esto solo define los tokens dark.

---

## 1. Estructura de zonas del modal (dark)

| Parte | Background | Borde | Nota |
|-------|-----------|-------|------|
| Overlay | `rgba(4,7,12,.62)` + `backdrop-filter: blur(3px)` | — | oscurece la app |
| Contenedor del modal | `#14181f` | `1px solid #2a313c`, radius `18px` | sombra grande (§3) |
| **Header** (icono + "Settings" + ✕) | `#1b212b` | inferior `#2a313c` | chrome, un pelín más claro que el cuerpo |
| **Cuerpo** (scroll) | `#0e1218` | — | lo más oscuro |
| **Cards de grupo** | `#1c222c` | `1px solid #2f3742`, radius `14px` | elevadas (§3), `flex-shrink:0` |
| Franja de etiqueta (`// apariencia`) | `#171c24` | inferior `1px solid #262d38` | cabecera de card |
| **Footer** | `#1b212b` | superior `#2a313c` | chrome |

Idea clave: en dark el orden se invierte respecto a "más claro = más arriba" del papel, pero el principio es el mismo → **las superficies interactivas/cards son un paso más CLARAS que su fondo**, y el borde + glow dan la elevación.

---

## 2. Texto (dark)
- Título de fila (Tema, Fuente…): `700`, `#eef1f5`, 15px.
- Descripción: `#8a93a1`, 12.5px.
- Etiquetas `// ...`: `#7b8695`, 13px.
- Título "Settings": display (Chakra Petch), `700`, `#f2f5f8`.

---

## 3. Segmentos / controles seleccionables

Base (reposo):
```
background:#222a35; color:#c2cad6; border:1px solid #3a4453; border-radius:9px;
padding:8px 15px; font-weight:600;
box-shadow:0 2px 6px rgba(0,0,0,.4), 0 1px 2px rgba(0,0,0,.3);
```
(usa borde `#3a4453`)

Activo (rellena atenuado + glow del color):
```
background:<accent>1f;   /* ~12% alpha */
color:<accent-claro>;    /* versión luminosa para leer en dark */
border:1px solid <accent>;
box-shadow:0 0 0 1px <accent>55, 0 3px 10px <accent>33;
```

Mapeo de activos (color base / versión luminosa para texto):
- **Tema → Claro:** ámbar `#b8791b` / texto `#e6ad46`, bg `rgba(184,121,27,.16)`.
- **Tema → Oscuro:** base (reposo).
- **Tamaño de fuente y Cursor:** azul `#2f6fed` / texto `#7aa6ff`, bg `rgba(47,111,237,.18)`.
- **Números de línea / Scroll suave / Sonido de teclas → ON:** verde `#15974e` / texto `#4cd08a`, bg `rgba(21,151,78,.18)`.
- **… → OFF:** rosa `#d24d8a` / texto `#f083b6`, bg `rgba(210,77,138,.18)`.
- Usa `data-variant="theme|blue|on|off"` + `.is-active` como en el light.

### Lista de Fuente (vertical)
- Item reposo: bg `#222a35`, texto `#c2cad6`, borde `#3a4453`, sombra `0 2px 5px rgba(0,0,0,.35)`.
- Item activo: azul → bg `rgba(47,111,237,.18)`, texto `#7aa6ff`, borde `#2f6fed`, glow `0 0 0 1px #2f6fed55, 0 3px 10px #2f6fed33`.

### Swatches de Color de acento
- 30px círculo del color, `padding:0`.
- Inactivo: `border:2px solid transparent`, `box-shadow:0 2px 6px rgba(0,0,0,.5)`.
- Activo: `border:2px solid #0e1218` (recorte contra el fondo) + `box-shadow:0 0 0 2px <color>, 0 3px 10px <color>55`.

---

## 4. Sombras (dark)
- **Modal:** `0 30px 70px rgba(0,0,0,.65), 0 6px 18px rgba(0,0,0,.5)`
- **Card de grupo:** `0 4px 14px rgba(0,0,0,.42), 0 1px 3px rgba(0,0,0,.3)`
- **Segmentos / ✕ / Restablecer:** `0 2px 6px rgba(0,0,0,.4), 0 1px 2px rgba(0,0,0,.3)`
- **Guardar cambios (azul sólido):** bg `#2f6fed`, borde `#5a8bff`, texto `#fff`, `box-shadow:0 4px 14px rgba(47,111,237,.5)`

---

## 5. Botones del footer
- **Restablecer:** bg `#222a35`, texto `#c2cad6`, borde `#3a4453`, sombra de segmento.
- **Guardar cambios:** azul sólido con glow (§4).
