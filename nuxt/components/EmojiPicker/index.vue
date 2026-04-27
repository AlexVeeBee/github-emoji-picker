<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { categories, searchEmojis, categoryNames } from "./Data";
import type { EmojiEntry } from "./Data";

// ── Public API ────────────────────────────────────────────────────────────────

/** Emoji payload emitted on selection — matches the shape pages/index.vue expects. */
export interface Emoji {
    id: string;
    name: string;
    shortcodes: string;
    unified?: string;
    native?: string;
    src?: string;
    [key: string]: unknown;
}

withDefaults(
    defineProps<{
        locale?: string;
        theme?: string;
    }>(),
    { locale: "en", theme: "light" },
);

const emit = defineEmits<{
    (e: "emoji-select", emoji: Emoji, event: PointerEvent): void;
}>();

// ── State ─────────────────────────────────────────────────────────────────────

const searchQuery = ref("");
const activeCategory = ref(categories[0]?.id ?? "people");
const skinToneIndex = ref(0);
const hoveredEmoji = ref<EmojiEntry | null>(null);

// ── Lifecycle ─────────────────────────────────────────────────────────────────

onMounted(() => {
    const stored = localStorage.getItem("emojiSkinTone");
    if (stored !== null) {
        const parsed = parseInt(stored, 10);
        if (parsed >= 0 && parsed <= 5) skinToneIndex.value = parsed;
    }
});

// ── Computed ──────────────────────────────────────────────────────────────────

const isSearching = computed(() => searchQuery.value.trim().length > 0);

const displayedEmojis = computed<EmojiEntry[]>(() => {
    if (isSearching.value) return searchEmojis(searchQuery.value);
    const cat = categories.find((c) => c.id === activeCategory.value);
    return cat?.emojis ?? [];
});

const gridLabel = computed(() => {
    if (isSearching.value) return `Search results for "${searchQuery.value}"`;
    return categoryNames[activeCategory.value] ?? activeCategory.value;
});

/** Returns the emoji selected with current skin tone applied. */
function resolveEmoji(entry: EmojiEntry): Emoji {
    const idx = entry.skins.length > 1 ? skinToneIndex.value : 0;
    const skin = entry.skins[idx] ?? entry.skins[0];
    return {
        id: entry.id,
        name: entry.name,
        shortcodes: `:${entry.id}:`,
        unified: skin?.unified,
        native: skin?.native,
        src: skin?.src,
    };
}

// ── Handlers ──────────────────────────────────────────────────────────────────

function handleEmojiClick(entry: EmojiEntry, event: PointerEvent) {
    emit("emoji-select", resolveEmoji(entry), event);
}

function handleCategorySelect(id: string) {
    activeCategory.value = id;
    searchQuery.value = "";
}

function handleSkinToneChange(idx: number) {
    skinToneIndex.value = idx;
    localStorage.setItem("emojiSkinTone", String(idx));
}
</script>

<template>
    <div
        class="flex flex-col overflow-hidden shadow-lg
               w-[352px]
               rounded-xl hc:rounded-none
               bg-white dark:bg-gray-800 oled:bg-oled-200 hc:bg-transparent
               border border-gray-200 dark:border-gray-700 oled:border-oled-300 hc:border hc:border-white"
        role="dialog"
        aria-label="Emoji picker"
    >
        <!-- Search bar -->
        <div class="px-2 pt-2 pb-1">
            <EmojiPickerSearch v-model="searchQuery" />
        </div>

        <!-- Category tabs (hidden while searching) -->
        <EmojiPickerCategoryTabs
            v-if="!isSearching"
            :categories="categories"
            :active="activeCategory"
            @select="handleCategorySelect"
        />

        <!-- Emoji grid -->
        <div
            class="flex-1 overflow-y-auto"
            style="height: 320px;"
        >
            <EmojiPickerGrid
                :emojis="displayedEmojis"
                :skin-tone-index="skinToneIndex"
                :label="gridLabel"
                @emoji-click="handleEmojiClick"
                @emoji-hover="hoveredEmoji = $event"
            />
        </div>

        <!-- Footer: preview + skin tone picker -->
        <div
            class="flex items-center justify-between gap-2 px-2 py-1 border-t
                   border-gray-200 dark:border-gray-600 oled:border-oled-300 hc:border-t hc:border-white"
        >
            <!-- Hovered emoji preview -->
            <div class="flex items-center gap-2 min-w-0">
                <span
                    v-if="hoveredEmoji"
                    class="text-2xl leading-none flex-none"
                    aria-hidden="true"
                >
                    <template v-if="hoveredEmoji.skins[0]?.src">
                        <img
                            :src="hoveredEmoji.skins[0].src"
                            :alt="hoveredEmoji.name"
                            width="28"
                            height="28"
                            class="w-7 h-7 object-contain"
                        />
                    </template>
                    <template v-else>
                        {{ hoveredEmoji.skins[Math.min(skinToneIndex, hoveredEmoji.skins.length - 1)]?.native }}
                    </template>
                </span>
                <span
                    class="text-xs truncate text-gray-600 dark:text-gray-300 oled:text-gray-300"
                    :title="hoveredEmoji?.name"
                >
                    {{ hoveredEmoji ? `:${hoveredEmoji.id}:` : '' }}
                </span>
            </div>

            <!-- Skin tone selector -->
            <EmojiPickerSkinTonePicker
                :model-value="skinToneIndex"
                @update:model-value="handleSkinToneChange"
            />
        </div>
    </div>
</template>
