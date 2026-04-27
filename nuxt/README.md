# GitHub Emoji Picker — Nuxt 3 app

A **Nuxt 3 / Vue 3** reimplementation of the React app found in `src/`, built with TypeScript and `@nuxtjs/i18n`.

## Getting started

```bash
cd nuxt
npm install
npm run dev
```

Then open <http://localhost:3000>.

## Other scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (hot-reload) |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |
| `npm run typecheck` | Run TypeScript checks |

## Project layout

```
nuxt/
├── app.vue              # Root layout + global CSS variables
├── pages/
│   └── index.vue        # Main page (App.tsx equivalent)
├── components/
│   ├── EmojiPicker.vue  # emoji-mart web-component wrapper
│   ├── Header.vue
│   ├── Footer.vue
│   ├── Loading.vue
│   ├── Snackbar.vue
│   ├── ThemeSwitch.vue
│   └── LocaleSelector.vue
├── composables/
│   └── useAppSettings.ts  # Shared theme/locale state (localStorage)
├── utils/
│   ├── utils.ts           # parseShortCodes, unifiedToUnicodeEmoji
│   └── getEmojiFlag.ts    # Locale → flag emoji helper
├── data/                  # Emoji datasets (copied from src/data)
│   ├── github_emojis.json
│   └── github_custom_emojis.json
├── i18n/                  # @nuxtjs/i18n v9 convention
│   ├── locales/           # Translation files
│   │   ├── en.json
│   │   ├── nl.json
│   │   └── is.json
│   └── i18n.config.ts     # vue-i18n runtime config (legacy: false)
├── nuxt.config.ts
└── package.json
```

## Locale & emoji data notes

* **Emoji datasets** (`data/`) are copied unchanged from `src/data/` in the React app.
* **Locale files** (`i18n/locales/`) are adapted from the React app's `public/locales/` translations.
  The Icelandic locale (`is.json`) is a new addition.
* Adding a new locale: add the JSON file to `locales/`, register it in `nuxt.config.ts` under
  `i18n.locales`, and add a flag mapping to `utils/getEmojiFlag.ts` if needed.

## Behaviour parity with the React app

| Feature | React app | Nuxt app |
|---------|-----------|----------|
| Theme (light/dark) | `localStorage` + `prefers-color-scheme` | ✅ same |
| Locale persistence | `localStorage` | ✅ same |
| Copy type via URL | `?copy_type=unicode\|shortcode` | ✅ same |
| Shift-key copy swap | ✅ | ✅ same |
| Snackbar queue | MUI Snackbar + `snackPack` | ✅ same logic |
| i18n | react-i18next | @nuxtjs/i18n (vue-i18n) |
| Emoji picker | @emoji-mart/react | @emoji-mart/vue |
