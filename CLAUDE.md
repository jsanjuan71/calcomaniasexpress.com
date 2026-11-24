# CLAUDE.md

Guía para trabajar en este repo con Claude Code. El repo es **público**: no agregues aquí credenciales, accesos de servidor/FTP/cPanel ni notas internas del cliente.

## Qué es

Sitio web de **Calcomanías Express** (`calcomaniasexpress.com`): impresión de calcomanías, stickers, señalética y rotulación en vinil. Zona de atención: Guadalajara, Zapopan y Tlajomulco. Idioma del sitio: español (México).

Estado actual: la raíz muestra una portada temporal de "Sitio en construcción" y hay 4 propuestas de landing (`demo1`..`demo4`) para que el cliente elija. Aún no existe el sitio definitivo.

## Stack y reglas

- HTML, CSS y JavaScript **planos**. Sin framework, sin bundler, sin dependencias de npm.
- Las únicas dependencias externas son fuentes de Google Fonts, cargadas por `<link>`.
- Todas las rutas son **relativas**. Las demos viven en subcarpetas y usan `../img/...`.
- Responsive y accesible: respetar `prefers-reduced-motion`, poner `alt` en imágenes y probar a ancho móvil (≈ 390–520 px) y escritorio.
- Los efectos con mouse (sticker que sigue al cursor) solo se activan con `(pointer: fine)`; en táctil se desactivan.

## Estructura

```
index.html, css/styles.css   portada temporal "Sitio en construcción"
img/                         imágenes compartidas por la portada y las demos
  1.jpg 2.jpg 3.jpg          fotos de trabajos
  sticker-tu-marca.webp      sticker con fondo transparente (usado en demo2/3/4)
demo1/                       pop: amarillo, bordes gruesos, stickers rotados
demo2/                       oscuro premium: degradados, sticker que sigue al mouse
demo3/                       landing completa y sobria (negro, rojo, amarillo)
demo4/                       fusión de las tres + galería tipo tabla de corte
```

Cada demo es autocontenida: `index.html`, `style.css` y, si lo necesita, `script.js`.

## Datos del negocio usados en el sitio

- WhatsApp: `https://wa.me/523331678104?text=Hola%2C%20quiero%20cotizar%20calcoman%C3%ADas` (número mexicano sin el prefijo móvil `1`).
- Los textos de ventajas y preguntas frecuentes de demo3 y demo4 son **genéricos** y deben confirmarse con el cliente antes de publicar. No inventar precios, tiempos de entrega, años de experiencia ni clientes.

## Cómo verlo en local

Abrir `index.html` (o `demoN/index.html`) en el navegador, o servir la carpeta:

```
npx serve .
```

## Despliegue

El despliegue es **manual por FTP**. Sube solo los archivos del sitio: `index.html`, `css/`, `img/` y `demoN/`. **No subas** `CLAUDE.md`, `README.md`, `.gitignore`, `.git/` ni `CLAUDE.local.md`, porque quedarían públicos en el dominio. `img/` va en la raíz del sitio, no dentro de cada demo.

## Pendientes

- El cliente debe elegir una demo (o una combinación) y dar feedback.
- Construir el sitio definitivo a partir de la demo elegida y quitar `<meta name="robots" content="noindex">` de la portada y de la demo elegida al publicarlo.
