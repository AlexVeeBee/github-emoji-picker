<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
    modelValue: string;
    placeholder?: string;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: string): void;
}>();

const input = ref(props.modelValue);
let timer: ReturnType<typeof setTimeout> | null = null;

watch(
    () => props.modelValue,
    (v) => {
        input.value = v;
    },
);

function onInput(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    input.value = val;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
        emit("update:modelValue", val);
    }, 180);
}

function onClear() {
    input.value = "";
    emit("update:modelValue", "");
}
</script>

<template>
    <div class="relative flex items-center w-full">
        <span class="absolute left-2.5 text-base leading-none pointer-events-none text-gray-400 dark:text-gray-500 oled:text-gray-500">
            🔍
        </span>
        <input
            type="search"
            autocomplete="off"
            autocorrect="off"
            spellcheck="false"
            :placeholder="placeholder ?? 'Search emojis…'"
            :value="input"
            class="w-full pl-8 pr-7 py-1.5 text-sm rounded-lg border outline-none transition-colors
                   bg-gray-100 dark:bg-gray-700 oled:bg-oled-300
                   text-gray-900 dark:text-white oled:text-white
                   border-gray-200 dark:border-gray-600 oled:border-oled-400
                   placeholder-gray-400 dark:placeholder-gray-500 oled:placeholder-gray-500
                   focus:border-blue-500 dark:focus:border-blue-400 oled:focus:border-blue-400
                   hc:rounded-none hc:border-white"
            @input="onInput"
        />
        <button
            v-if="input"
            type="button"
            aria-label="Clear search"
            class="absolute right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 oled:hover:text-white leading-none"
            @click="onClear"
        >
            ✕
        </button>
    </div>
</template>
