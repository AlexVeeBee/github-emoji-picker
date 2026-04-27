<template>
  <div
    v-if="open"
    class="snackbar"
    role="status"
    aria-live="polite"
    :class="{ 'snackbar--visible': open }"
  >
    <div class="snackbar__content">
      <span>{{ message }}</span>
      <button
        type="button"
        class="snackbar__close"
        aria-label="Close"
        @click="emit('close')"
      >
        ×
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean;
  message?: string;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();
</script>

<style scoped>
.snackbar {
  position: fixed;
  right: 16px;
  bottom: 16px;
  background: #1f883d;
  color: #fff;
  padding: 10px 12px;
  border-radius: 8px;
  min-width: 240px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
  z-index: 1400;
  animation: snack-in 0.2s ease;
}

@keyframes snack-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.snackbar__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.snackbar__close {
  border: 0;
  background: transparent;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  line-height: 1;
  padding: 0 2px;
}
</style>
