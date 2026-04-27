// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-04-27",

    modules: ["@nuxtjs/tailwindcss", "@nuxtjs/i18n"],

    i18n: {
        strategy: "no_prefix",
        defaultLocale: "en",
        // langDir is resolved relative to {rootDir}/i18n/ (the v9 restructureDir default)
        langDir: "locales",
        locales: [
            { code: "en", language: "en-US", file: "en.json", name: "English" },
            { code: "nl", language: "nl-NL", file: "nl.json", name: "Nederlands" },
            { code: "is", language: "is-IS", file: "is.json", name: "Íslenska" },
        ],
        // i18n.config.ts lives inside the i18n/ restructureDir
        vueI18n: "./i18n.config.ts",
        bundle: {
            optimizeTranslationDirective: false,
        },
    },

    typescript: {
        strict: true,
    },
});

