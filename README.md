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

Nota: la connessione dei contenuti CMS alle pagine Vue **non è ancora implementata** (fase successiva).

### Setup GitHub OAuth for Decap (Netlify auth provider)

1. GitHub -> `Settings` -> `Developer settings` -> `OAuth Apps` -> `New OAuth App`.
   - `Homepage URL`: `https://<site>.netlify.app` (o dominio custom)
   - `Authorization callback URL`: `https://api.netlify.com/auth/done`
   - Copiare `Client ID` e `Client Secret`
2. Netlify: configurare il provider di autenticazione GitHub (non usare env vars progetto per questo step).
   - Percorso tipico: `Site configuration` / `Access & security` / `OAuth`
   - In alternativa: Team/User settings -> Applications/OAuth
   - Inserire `Client ID` + `Client Secret`
3. Permessi repository: aggiungere il cliente come collaborator con permesso `Write`.
4. Test: aprire `https://<site>/admin`, login con GitHub, fare `Publish` di una modifica.
   - Il commit deve finire su branch `cms` (non su `main`).

Nota deploy credits: tenere `main` come production branch Netlify e pubblicare da CMS su `cms` evita deploy in produzione durante i test.

## Prossimi step consigliati

1. Sostituire le immagini SVG social con immagini reali brandizzate.
2. Configurare dominio definitivo e aggiornare tutti gli URL canonici/sitemap.
3. Collegare i file `content/*.yml` ai componenti Vue.
4. Verificare login Decap via GitHub su `/admin` dopo deploy.

