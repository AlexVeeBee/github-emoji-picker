<template>
  <footer class="footer">
    <small>
      {{ t("footer.description") }}
      <a
        href="https://github.com/AlexVeeBee/github-emoji-picker"
        target="_blank"
        rel="noreferrer"
      >
        GitHub Emoji Picker 🐙
      </a>
      .
    </small>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<style scoped>
.footer {
  width: 100%;
  padding: 12px 16px;
  text-align: center;
  opacity: 0.8;
}

.footer a {
  color: inherit;
  text-decoration: underline;
}
</style>
