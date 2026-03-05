# The Ring Experience

Vue + Vite website with Sanity CMS content and a separate Studio mounted at `/admin`.

## Tech Stack

- Vue 3
- Vue Router
- Vite
- Tailwind CSS
- GSAP
- Sanity CMS

## Local Development

Install dependencies:

```bash
npm install
```

Run frontend in development mode:

```bash
npm run dev
```

Preview production build locally:

```bash
npx vite build
npm run preview
```

Default build (frontend + embedded `/admin` studio bundle):

```bash
npm run build
```

Frontend-only build (without embedded `/admin`):

```bash
npm run build:frontend
```

## Environment Variables

Create `.env` from `.env.example` and set:

- `VITE_SANITY_PROJECT_ID`
- `VITE_SANITY_DATASET`
- `VITE_GOOGLE_PLACES_API_KEY` (only if using Google reviews)

For Cloudflare form handling (`/api/lead`), set these in Cloudflare Pages variables:

- `GOOGLE_SHEETS_CLIENT_EMAIL` (service account email)
- `GOOGLE_SHEETS_PRIVATE_KEY` (service account private key, keep `\n` line breaks)
- `GOOGLE_SHEETS_SPREADSHEET_ID`
- `GOOGLE_SHEETS_RANGE` (optional, default: `Sheet1!A:I`)

## CMS Notes

- Sanity Studio is configured with `basePath: /admin`.
- Main schema files are under `sanity/schemaTypes`.
- Studio config is in `studio/sanity.config.js`.

## Forms

- Forms submit to internal endpoint `/api/lead` (no `mailto` popup).
- Backend appends lead rows to Google Sheets API.
- Email/phone are written to sheet only when newsletter consent is true.

## Build Notes

- `npm run dev` serves source code with Vite dev server (HMR).
- `npm run preview` serves the built `dist` output.
- If they differ, rebuild first (`npx vite build`) and check environment/config differences.
