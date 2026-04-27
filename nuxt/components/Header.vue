<template>
  <header class="header">
    <div class="header__title">
      <h1 class="header__h1">GitHub Emoji Picker</h1>
      <img
        alt="OctoCat"
        src="https://github.githubassets.com/images/icons/emoji/octocat.png"
        height="48"
        width="48"
        class="header__octocat"
      />
    </div>

    <p class="header__subtitle">{{ t("header.description") }}</p>

    <div class="header__actions">
      <a
        class="header__btn"
        href="https://github.com/rickstaa/github-emoji-picker"
        target="_blank"
        rel="noreferrer"
      >
        ⭐ Star
      </a>
      <a
        class="header__btn"
        href="https://github.com/rickstaa/github-emoji-picker/fork"
        target="_blank"
        rel="noreferrer"
      >
        🍴 Fork
      </a>
      <a
        class="header__btn"
        href="https://github.com/sponsors/rickstaa"
        target="_blank"
        rel="noreferrer"
      >
        ❤️ Sponsor
      </a>
    </div>

    <div class="header__controls">
      <ThemeSwitch :mode="mode" @toggle="toggleMode" />
      <LocaleSelector />
    </div>

    <p class="header__caption">{{ t("header.themeSwitch.description") }}</p>
  </header>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useAppSettings } from "~/composables/useAppSettings";

const { t } = useI18n();
const { mode, toggleMode } = useAppSettings();
</script>

<style scoped>
.header {
  width: 100%;
  text-align: center;
  padding: 20px 16px 12px;
}

.header__title {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.header__h1 {
  margin: 0;
  font-size: 2rem;
}

.header__octocat {
  width: 3rem;
  height: 3rem;
}

.header__subtitle {
  margin: 0 0 12px;
  font-size: 1rem;
  opacity: 0.9;
}

.header__actions {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 14px;
}

.header__btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border: 1px solid rgba(128, 128, 128, 0.35);
  border-radius: 10px;
  padding: 6px 12px;
  text-decoration: none;
  color: inherit;
  font-size: 14px;
  transition: background 0.15s;
}

.header__btn:hover {
  background: rgba(128, 128, 128, 0.1);
}

.header__controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.header__caption {
  margin: 0;
  font-size: 12px;
  opacity: 0.65;
}
</style>
