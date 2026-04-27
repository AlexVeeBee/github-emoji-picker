<template>
  <label class="switch" :title="checked ? 'Switch to dark' : 'Switch to light'">
    <input type="checkbox" :checked="checked" @change="emit('toggle')" />
    <span class="slider" />
    <span class="switch__label">{{ checked ? "☀️" : "🌙" }}</span>
  </label>
</template>

<script setup lang="ts">
defineProps<{ checked: boolean }>();

const emit = defineEmits<{
  (e: "toggle"): void;
}>();
</script>

<style scoped>
.switch {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}

.switch input {
  display: none;
}

.slider {
  position: relative;
  display: inline-block;
  width: 52px;
  height: 28px;
  background: #8796a5;
  border-radius: 999px;
  transition: background 0.2s ease;
}

.slider::after {
  content: "";
  position: absolute;
  width: 22px;
  height: 22px;
  background: #001e3c;
  border-radius: 999px;
  left: 3px;
  top: 3px;
  transition: transform 0.2s ease;
}

input:checked + .slider {
  background: #aab4be;
}

input:checked + .slider::after {
  transform: translateX(24px);
  background: #003892;
}

.switch__label {
  font-size: 16px;
}
</style>
