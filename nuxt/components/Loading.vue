<template>
  <div class="loading">
    <div class="spinner" />
  </div>
</template>

<style scoped>
.loading {
  min-height: 100vh;
  display: grid;
  place-items: center;
}

.spinner {
  width: 48px;
  height: 48px;
  border-radius: 999px;
  border: 4px solid rgba(0, 0, 0, 0.15);
  border-top-color: rgba(0, 0, 0, 0.65);
  animation: spin 0.9s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
