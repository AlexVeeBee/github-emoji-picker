<script setup lang="ts">
import { categoryIcons } from "./Data";
import type { EmojiCategory } from "./Data";

const props = defineProps<{
    categories: EmojiCategory[];
    active: string;
}>();

const emit = defineEmits<{
    (e: "select", id: string): void;
}>();

const githubSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="1 1 22 22" class="w-4 h-4 fill-current">
  <path d="M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.28.73-.55v-1.84c-3.03.64-3.67-1.46-3.67-1.46-.55-1.29-1.28-1.65-1.28-1.65-.92-.65.1-.65.1-.65 1.1 0 1.73 1.1 1.73 1.1.92 1.65 2.57 1.2 3.21.92a2 2 0 01.64-1.47c-2.47-.27-5.04-1.19-5.04-5.5 0-1.1.46-2.1 1.2-2.84a3.76 3.76 0 010-2.93s.91-.28 3.11 1.1c1.8-.49 3.7-.49 5.5 0 2.1-1.38 3.02-1.1 3.02-1.1a3.76 3.76 0 010 2.93c.83.74 1.2 1.74 1.2 2.94 0 4.21-2.57 5.13-5.04 5.4.45.37.82.92.82 2.02v3.03c0 .27.1.64.73.55A11 11 0 0012 1.27"/>
</svg>`;
</script>

<template>
    <div
        class="flex items-center gap-0.5 overflow-x-auto scrollbar-hide border-b
               border-gray-200 dark:border-gray-600 oled:border-oled-300
               hc:border-b hc:border-white"
        role="tablist"
        aria-label="Emoji categories"
    >
        <button
            v-for="cat in props.categories"
            :key="cat.id"
            type="button"
            role="tab"
            :aria-selected="cat.id === props.active"
            :aria-label="cat.id"
            :title="cat.id"
            class="flex-none flex items-center justify-center w-8 h-8 rounded text-base transition-colors
                   text-gray-500 dark:text-gray-400 oled:text-gray-400
                   hover:bg-gray-100 dark:hover:bg-gray-700 oled:hover:bg-oled-300
                   hc:rounded-none"
            :class="cat.id === props.active
                ? 'bg-gray-200 dark:bg-gray-600 oled:bg-oled-400 text-gray-900 dark:text-white oled:text-white'
                : ''"
            @click="emit('select', cat.id)"
        >
            <!-- GitHub category gets the SVG icon; others get a native emoji -->
            <span v-if="cat.id !== 'github'" class="leading-none select-none" aria-hidden="true">
                {{ categoryIcons[cat.id] ?? '🙂' }}
            </span>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span v-else class="leading-none select-none text-current" aria-hidden="true" v-html="githubSvg" />
        </button>
    </div>
</template>

<style scoped>
/* Hide scrollbar while keeping scroll functionality */
.scrollbar-hide {
    scrollbar-width: none;
    -ms-overflow-style: none;
}
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
</style>
