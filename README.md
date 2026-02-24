# The Ring Experience - Sri Lanka

Sito Vue + Vite per promuovere esperienze turistiche in Sri Lanka dedicate alla creazione di anelli in argento sterling con pietre naturali, come alternativa significativa al classico souvenir.

## Stack

- Vue 3
- Vue Router
- Vite
- Unhead (`@unhead/vue`) per gestione meta tag SEO/social

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

## Sitemap e Robots

- Sitemap statica: `public/sitemap.xml`
- Robots: `public/robots.txt`

Ricordati di aggiornare il dominio (`https://the-ring-experience.com`) se usi un dominio diverso in produzione.

## Deploy Netlify

È presente `netlify.toml` con:

- Build command: `npm run build`
- Publish directory: `dist`
- Redirect SPA (`/* -> /index.html`)
- Header base per `robots.txt` e `sitemap.xml`

## Area Admin/CMS (base)

Per permettere in seguito al cliente di caricare contenuti, è stata predisposta una struttura iniziale:

- `public/admin/index.html` (Decap CMS)
- `public/admin/config.yml` (configurazione collection)
- `content/homepage.yml`
- `content/about.yml`
- `content/booking.yml`
- `public/functions/experience-content-schema.yml` (schema placeholder)

Nota: la connessione dei contenuti CMS alle pagine Vue **non è ancora implementata** (fase successiva).

### Auth GitHub corretta (Netlify + Decap)

La configurazione del CMS usa `backend: github` in `public/admin/config.yml`.

Per autenticare il cliente con GitHub nel modo corretto:

1. Crea una GitHub OAuth App con:
	- `Homepage URL`: `https://<site>.netlify.app` (o dominio custom)
	- `Authorization callback URL`: `https://api.netlify.com/auth/done`
2. Su Netlify apri il sito e configura il provider di autenticazione GitHub inserendo:
	- GitHub OAuth App `Client ID`
	- GitHub OAuth App `Client Secret`
3. Aggiungi il cliente come collaborator GitHub del repo con permesso `Write`.

Importante: la `Client Secret` va inserita solo su Netlify, mai nel repository.

## Prossimi step consigliati

1. Sostituire le immagini SVG social con immagini reali brandizzate.
2. Configurare dominio definitivo e aggiornare tutti gli URL canonici/sitemap.
3. Collegare i file `content/*.yml` ai componenti Vue.
4. Verificare login Decap via GitHub su `/admin` dopo deploy.

