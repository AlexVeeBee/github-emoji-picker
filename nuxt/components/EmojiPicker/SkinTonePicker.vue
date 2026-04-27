<script setup lang="ts">
/** Skin tone swatches following the Fitzpatrick scale (index 0 = neutral). */
const SKIN_TONES = [
    { index: 0, label: "Default", color: "#FFD93B" },
    { index: 1, label: "Light", color: "#FDDBB4" },
    { index: 2, label: "Medium-Light", color: "#E0BB95" },
    { index: 3, label: "Medium", color: "#BF8B5E" },
    { index: 4, label: "Medium-Dark", color: "#9B6A38" },
    { index: 5, label: "Dark", color: "#5D3A1A" },
];

const props = defineProps<{
    modelValue: number;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: number): void;
}>();
</script>

<template>
    <div class="flex items-center gap-1 p-1" role="group" aria-label="Skin tone">
        <button
            v-for="tone in SKIN_TONES"
            :key="tone.index"
            type="button"
            :title="tone.label"
            :aria-label="tone.label"
            :aria-pressed="tone.index === props.modelValue"
            class="w-5 h-5 rounded-full transition-all border-2
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                   hc:rounded-none"
            :class="tone.index === props.modelValue
                ? 'border-blue-500 scale-110'
                : 'border-transparent hover:border-gray-300 dark:hover:border-gray-500 oled:hover:border-oled-500'"
            :style="{ backgroundColor: tone.color }"
            @click="emit('update:modelValue', tone.index)"
        />
    </div>
</template>
