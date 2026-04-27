<template>
  <button
    type="button"
    class="theme-switch"
    :title="`Current theme: ${mode}. Click to cycle.`"
    @click="emit('toggle')"
  >
    <span class="theme-switch__icon">{{ modeIcon }}</span>
    <span class="theme-switch__label">{{ modeLabel }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  mode: string;
  /** @deprecated kept for backward-compat; use mode instead */
  checked?: boolean;
}>();

const emit = defineEmits<{
  (e: "toggle"): void;
}>();

const modeIcon = computed(() => {
  if (props.mode === "dark") return "🌙";
  if (props.mode === "oled") return "⬛";
  return "☀️";
});

const modeLabel = computed(() => {
  if (props.mode === "dark") return "Dark";
  if (props.mode === "oled") return "OLED";
  return "Light";
});
</script>

<style scoped>
.theme-switch {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid rgba(128, 128, 128, 0.35);
  border-radius: 10px;
  padding: 6px 10px;
  background: transparent;
  cursor: pointer;
  color: inherit;
  font-size: 14px;
  transition: background 0.15s;
  user-select: none;
}

.theme-switch:hover {
  background: rgba(128, 128, 128, 0.1);
}

.theme-switch__icon {
  font-size: 16px;
  line-height: 1;
}

.theme-switch__label {
  font-size: 13px;
  opacity: 0.85;
}
</style>
