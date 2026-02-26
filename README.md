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

## Setup Sanity (Free Plan)

1. Crea il progetto Sanity (free):
```bash
npm create sanity@latest
```
2. Nel progetto Studio, importa lo schema homepage:
- copia `sanity/schemaTypes/homepage.js`
- copia `sanity/schemaTypes/index.js`
- registra `schemaTypes` nel tuo `sanity.config.*`
3. Deploy Studio su `cms.<dominio>` (es. Sanity Hosted Studio o hosting esterno).
4. Inserisci le variabili del frontend:
- duplica `.env.example` in `.env`
- valorizza `VITE_SANITY_PROJECT_ID` con l'ID reale del progetto

## Integrazione Homepage

- La homepage ora tenta prima il fetch da Sanity (`src/utils/sanity.js`).
- Se Sanity non e configurato o non risponde, usa fallback locale da `content/homepage.json`.
- Il cliente puo aggiornare da Sanity:
  - Hero (testi, CTA, immagine)
  - A Moment (testi, immagine)
  - Experience Cards (titoli, linee, immagini)
  - Values (heading, background, 4 item)
  - Follow Us (testi, background, link social)
  - Reviews (heading, descrizioni, lista recensioni)

## Prossimi step consigliati

1. Sostituire le immagini social con asset brandizzati.
2. Configurare dominio definitivo e aggiornare URL canonici/sitemap.
3. Collegare i contenuti del CMS headless alle pagine Vue.
