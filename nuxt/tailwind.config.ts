import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
    darkMode: ["selector", '[data-theme="dark"]'],
    content: [
        "./components/**/*.{vue,ts}",
        "./composables/**/*.ts",
        "./pages/**/*.vue",
        "./app.vue",
    ],
    theme: {
        extend: {
            colors: {
                oled: {
                    DEFAULT: "#000000",
                    100: "#111111",
                    200: "#222222",
                    300: "#333333",
                    400: "#444444",
                    500: "#555555",
                    600: "#666666",
                },
            },
        },
    },
    corePlugins: {
        // Disable Preflight so existing scoped CSS is not affected.
        preflight: false,
    },
    plugins: [
        plugin(({ addVariant }) => {
            addVariant("oled", '[data-theme="oled"] &');
            addVariant("hc", '[data-theme="hc"] &');
        }),
    ],
} satisfies Config;
