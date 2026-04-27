<script setup lang="ts">
import type { EmojiEntry } from "./Data";

const props = defineProps<{
    emojis: EmojiEntry[];
    skinToneIndex: number;
    /** Optional label shown above the grid (category name or "Search results"). */
    label?: string;
}>();

const emit = defineEmits<{
    (e: "emoji-click", emoji: EmojiEntry, event: PointerEvent): void;
    (e: "emoji-hover", emoji: EmojiEntry | null): void;
}>();

/** Return the skin-aware native character or image src for an emoji. */
function getSkin(emoji: EmojiEntry) {
    const idx = emoji.skins.length > 1 ? props.skinToneIndex : 0;
    return emoji.skins[idx] ?? emoji.skins[0];
}
</script>

<template>
    <div>
        <p
            v-if="props.label"
            class="px-2 py-1 text-xs font-semibold uppercase tracking-wide
                   text-gray-500 dark:text-gray-400 oled:text-gray-400"
        >
            {{ props.label }}
        </p>

        <div
            v-if="props.emojis.length === 0"
            class="flex items-center justify-center h-24 text-sm text-gray-400 dark:text-gray-500 oled:text-gray-500"
        >
            No emojis found
        </div>

        <div
            v-else
            class="grid p-1"
            style="grid-template-columns: repeat(auto-fill, minmax(2.25rem, 1fr)); gap: 1px;"
        >
            <button
                v-for="emoji in props.emojis"
                :key="emoji.id"
                type="button"
                :title="emoji.name"
                :aria-label="emoji.name"
                class="flex items-center justify-center w-9 h-9 rounded text-xl transition-colors
                       hover:bg-gray-100 dark:hover:bg-gray-700 oled:hover:bg-oled-300
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                       hc:rounded-none"
                @pointerup="emit('emoji-click', emoji, $event)"
                @mouseenter="emit('emoji-hover', emoji)"
                @mouseleave="emit('emoji-hover', null)"
            >
                <!-- Custom GitHub emojis use an <img>; standard emojis use native chars -->
                <img
                    v-if="getSkin(emoji).src"
                    :src="getSkin(emoji).src"
                    :alt="emoji.name"
                    width="22"
                    height="22"
                    class="w-[1.375rem] h-[1.375rem] object-contain"
                    loading="lazy"
                />
                <span v-else class="leading-none select-none" aria-hidden="true">
                    {{ getSkin(emoji).native }}
                </span>
            </button>
        </div>
    </div>
</template>
