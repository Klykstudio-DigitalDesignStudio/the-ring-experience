# The Ring Experience - Sri Lanka

Sito Vue + Vite per promuovere esperienze turistiche in Sri Lanka dedicate alla creazione di anelli in argento sterling con pietre naturali.

## Stack

- Vue 3
- Vue Router
- Vite
- Tailwind CSS
- Unhead (`@unhead/vue`) per meta tag SEO/social

## Setup locale

```bash
npm install
npm run dev
```

Build produzione:

```bash
npm run build
npm run preview
```

## SEO e Social Preview

Configurazione implementata:

- Meta `robots` con `index, follow`
- Meta Open Graph (Facebook, WhatsApp, Instagram)
- Meta Twitter Card
- Canonical dinamico per route tramite Unhead
- Meta title/description specifici per route in `src/router.js`

File principali SEO:

- `index.html`
- `src/main.js`
- `src/App.vue`
- `public/robots.txt`
- `public/sitemap.xml`

Miniature social in:

- `public/social/og-facebook.svg`
- `public/social/og-whatsapp.svg`
- `public/social/og-instagram.svg`
- `public/social/og-twitter.svg`

## Content Workflow

Il frontend e completamente statico client-side e deployabile su Cloudflare Pages.

La gestione contenuti avviene tramite Sanity Studio deployato separatamente su `cms.<dominio>`.

## Prossimi step consigliati

1. Sostituire le immagini social con asset brandizzati.
2. Configurare dominio definitivo e aggiornare URL canonici/sitemap.
3. Collegare i contenuti del CMS headless alle pagine Vue.
