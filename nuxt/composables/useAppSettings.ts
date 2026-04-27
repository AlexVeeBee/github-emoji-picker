/**
 * Shared app-settings composable: theme mode + locale, both persisted to localStorage.
 */
import { computed, watch } from "vue";
import { useI18n } from "vue-i18n";

type Mode = "light" | "dark";

// Module-level state so every component shares the same reactive refs.
const _mode = ref<Mode>("dark");
let _modeInitialised = false;

export function useAppSettings() {
  const { locale, availableLocales, setLocale: i18nSetLocale } = useI18n();

  // ── Initialise mode from localStorage / prefers-color-scheme ──────────────
  if (import.meta.client && !_modeInitialised) {
    _modeInitialised = true;
    const stored = localStorage.getItem("mode") as Mode | null;
    const prefersDark =
      window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;
    _mode.value = stored ?? (prefersDark ? "dark" : "light");
  }

  // ── Initialise locale from localStorage ───────────────────────────────────
  onMounted(() => {
    const storedLocale = localStorage.getItem("locale");
    if (storedLocale && (availableLocales as string[]).includes(storedLocale)) {
      i18nSetLocale(storedLocale);
    }
  });

  // ── Persist changes ────────────────────────────────────────────────────────
  watch(_mode, (newMode) => {
    if (import.meta.client) {
      localStorage.setItem("mode", newMode);
    }
  });

  watch(locale, (newLocale) => {
    if (import.meta.client) {
      localStorage.setItem("locale", newLocale);
    }
  });

  function toggleMode() {
    _mode.value = _mode.value === "dark" ? "light" : "dark";
  }

  async function setLocale(lcl: string) {
    await i18nSetLocale(lcl);
  }

  const supportedLocales = computed(() => availableLocales as string[]);

  return {
    mode: _mode,
    toggleMode,
    locale,
    setLocale,
    supportedLocales,
  };
}
