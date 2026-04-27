<template>
  <div class="locale">
    <button
      type="button"
      class="locale__button"
      :aria-expanded="open"
      aria-haspopup="menu"
      @click="open = !open"
    >
      🌐
    </button>

    <div v-if="open" class="locale__menu" role="menu">
      <button
        v-for="lng in supportedLocales"
        :key="lng"
        type="button"
        class="locale__opt"
        role="menuitem"
        :disabled="lng === locale"
        @click="handleLocaleChange(lng)"
      >
        <span class="locale__flag">{{ getEmojiFlag(lng) }}</span>
        <span class="locale__name">{{ lng }}</span>
      </button>

      <a
        class="locale__opt locale__link"
        href="https://crowdin.com/project/github-emoji-picker"
        target="_blank"
        rel="noreferrer"
        role="menuitem"
      >
        ➕ {{ t("localeSelector.translate") }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { getEmojiFlag } from "~/utils/getEmojiFlag";
import { useAppSettings } from "~/composables/useAppSettings";

const open = ref(false);
const { t } = useI18n();
const { locale, setLocale, supportedLocales } = useAppSettings();

async function handleLocaleChange(lng: string) {
  await setLocale(lng);
  open.value = false;
}
</script>

<style scoped>
.locale {
  position: relative;
  display: inline-block;
}

.locale__button {
  border: 1px solid rgba(128, 128, 128, 0.3);
  background: transparent;
  border-radius: 8px;
  padding: 6px 10px;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  color: inherit;
}

.locale__menu {
  position: absolute;
  z-index: 20;
  top: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  background: var(--surface);
  border: 1px solid rgba(128, 128, 128, 0.25);
  border-radius: 10px;
  padding: 8px;
  min-width: 200px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.locale__opt {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border-radius: 8px;
  border: 0;
  background: transparent;
  cursor: pointer;
  color: inherit;
  font-size: 14px;
  text-align: left;
  text-decoration: none;
  transition: background 0.15s;
}

.locale__opt:hover:not(:disabled) {
  background: rgba(128, 128, 128, 0.1);
}

.locale__opt:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.locale__flag {
  font-size: 18px;
  line-height: 1;
}
</style>
