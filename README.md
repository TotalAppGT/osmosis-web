# Osmosis Premium — Sitio web

Sitio estático para **Osmosis Premium**, producción técnica de eventos: audio, iluminación, pantallas LED, escenarios, festivales y conciertos.

## Ver en local

Abrí `index.html` con doble clic o levantá un servidor:

```bash
python -m http.server 8080
```

## Configuración

- **WhatsApp, correo e Instagram:** en `script.js` (objeto `OSMOSIS`) y en el HTML visible (`index.html`).
- **Logo:** `assets/logo.svg` es una recreación del logo original. Reemplazar por el PNG/SVG oficial cuando esté disponible.
- **Fotos de shows:** las tarjetas de “Shows” usan visuales abstractos como placeholder. Reemplazar por fotos reales de eventos.
- **Formulario:** arma el mensaje y abre WhatsApp. Requiere el número real en `OSMOSIS.whatsapp`.

## Deploy

```bash
docker build -t osmosis-web .
docker run -d --name osmosis-web -p 8080:80 osmosis-web
```

Producción: `osmosis.totalappgt.com` (Docker + Traefik en el VPS).

## Notas

Los contactos actuales son placeholders (`+502 0000 0000`, `hola@osmosispremium.com`, `@osmosispremium`). Cambiarlos antes de campañas pagas.
