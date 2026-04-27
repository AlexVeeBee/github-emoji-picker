<template>
  <div :data-theme="mode" class="app">
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { useAppSettings } from "~/composables/useAppSettings";

const { mode } = useAppSettings();

useHead({
  htmlAttrs: { "data-theme": mode },
});
</script>

<style>
/* ── CSS custom properties driven by [data-theme] ───────────────────────── */
:root,
[data-theme="light"] {
  --bg: #f6f8fa;
  --surface: #ffffff;
  --text: #24292f;
  --border: rgba(0, 0, 0, 0.15);
}

[data-theme="dark"] {
  --bg: #0d1117;
  --surface: #161b22;
  --text: #e6edf3;
  --border: rgba(255, 255, 255, 0.12);
}

[data-theme="oled"] {
  --bg: #000000;
  --surface: #111111;
  --text: #ffffff;
  --border: rgba(255, 255, 255, 0.15);
}

[data-theme="hc"] {
  --bg: #000000;
  --surface: #000000;
  --text: #ffffff;
  --border: #ffffff;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Helvetica,
    Arial,
    sans-serif;
  background: var(--bg);
  color: var(--text);
  transition:
    background 0.2s,
    color 0.2s;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
