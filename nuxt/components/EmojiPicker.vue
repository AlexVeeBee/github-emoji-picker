<template>
  <!-- emoji-mart mounts the Shadow DOM picker into this div -->
  <div ref="pickerRef" />
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
// emoji-mart v5 ships as a Web Component; Picker is the constructor.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore – emoji-mart typings are loose; the class API is stable
import { Picker } from "emoji-mart";
import emojiData from "~/data/github_emojis.json";
import customGithubEmojis from "~/data/github_custom_emojis.json";

/** Emoji object returned by emoji-mart. */
export interface Emoji {
  shortcodes: string;
  unified?: string;
  [key: string]: unknown;
}

const props = withDefaults(
  defineProps<{
    locale?: string;
    theme?: "light" | "dark";
  }>(),
  {
    locale: "en",
    theme: "light",
  },
);

const emit = defineEmits<{
  (e: "emoji-select", emoji: Emoji, event: PointerEvent): void;
}>();

const pickerRef = ref<HTMLElement | null>(null);

const categoryIcons = {
  github: {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="1 1 22 22">
      <path d="M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.28.73-.55v-1.84c-3.03.64-3.67-1.46-3.67-1.46-.55-1.29-1.28-1.65-1.28-1.65-.92-.65.1-.65.1-.65 1.1 0 1.73 1.1 1.73 1.1.92 1.65 2.57 1.2 3.21.92a2 2 0 01.64-1.47c-2.47-.27-5.04-1.19-5.04-5.5 0-1.1.46-2.1 1.2-2.84a3.76 3.76 0 010-2.93s.91-.28 3.11 1.1c1.8-.49 3.7-.49 5.5 0 2.1-1.38 3.02-1.1 3.02-1.1a3.76 3.76 0 010 2.93c.83.74 1.2 1.74 1.2 2.94 0 4.21-2.57 5.13-5.04 5.4.45.37.82.92.82 2.02v3.03c0 .27.1.64.73.55A11 11 0 0012 1.27"/>
    </svg>`,
  },
};

/** Tear down any existing picker and mount a fresh one. */
function mountPicker() {
  if (!pickerRef.value) return;
  // Remove any previously mounted picker node.
  pickerRef.value.innerHTML = "";

  // eslint-disable-next-line no-new
  new Picker({
    data: emojiData,
    custom: [customGithubEmojis],
    categoryIcons,
    theme: props.theme,
    locale: props.locale,
    onEmojiSelect(emoji: unknown, event: unknown) {
      emit(
        "emoji-select",
        emoji as Emoji,
        (event as PointerEvent) ?? new PointerEvent("pointerup"),
      );
    },
    parent: pickerRef.value,
  });
}

onMounted(mountPicker);

// Remount when theme or locale changes so the picker reflects the new config.
watch([() => props.theme, () => props.locale], mountPicker);
</script>
