<template>
  <div class="page">
    <Header />

    <main class="page__main">
      <ClientOnly>
        <template #fallback>
          <Loading />
        </template>
        <EmojiPicker
          :locale="martLocale"
          :theme="mode"
          @emoji-select="handleEmojiSelect"
        />
      </ClientOnly>
    </main>

    <Footer />

    <Snackbar :open="snackbarOpen" :message="snackbarMessage" @close="handleSnackClose" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useAppSettings } from "~/composables/useAppSettings";
import { parseShortCodes, unifiedToUnicodeEmoji } from "~/utils/utils";
import type { Emoji } from "~/components/EmojiPicker/index.vue";

// ── Theme / locale ─────────────────────────────────────────────────────────
const { mode, locale } = useAppSettings();

/**
 * emoji-mart uses "kr" instead of the universal "ko" for Korean.
 */
const martLocale = computed(() =>
  locale.value === "ko" ? "kr" : locale.value,
);

// ── Copy-type (unicode vs shortcode) ──────────────────────────────────────
const copyUnicode = ref(false);

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  let copyType = urlParams.get("copy_type");

  if (copyType) {
    copyType = copyType.toLowerCase();
    if (copyType === "unicode") {
      localStorage.setItem("copyType", "unicode");
      copyUnicode.value = true;
    } else {
      localStorage.setItem("copyType", "shortcode");
      copyUnicode.value = false;
    }
    return;
  }

  copyType = localStorage.getItem("copyType");
  copyUnicode.value = copyType === "unicode";
});

// ── Snackbar queue (mirrors React snackPack logic) ─────────────────────────
interface SnackbarMessage {
  message: string;
  key: number;
}

const snackPack = ref<SnackbarMessage[]>([]);
const snackbarOpen = ref(false);
const snackbarMessage = ref<string | undefined>(undefined);

/** Drain the queue: show next message, or close current when a new one arrives. */
watch(
  snackPack,
  () => {
    if (snackPack.value.length && !snackbarMessage.value) {
      // No active snack — dequeue and show.
      const next = snackPack.value.shift()!;
      snackbarMessage.value = next.message;
      snackbarOpen.value = true;
    } else if (snackPack.value.length && snackbarMessage.value && snackbarOpen.value) {
      // Active snack with a new one waiting — close it so the watcher below
      // will clear the message and trigger re-evaluation.
      snackbarOpen.value = false;
    }
  },
  { deep: true },
);

/** When the snackbar closes, clear the message (mirrors onExited) and
 *  auto-trigger the next item in the queue via the watcher above. */
watch(snackbarOpen, (open) => {
  if (open) {
    // Auto-hide after 2 s.
    window.setTimeout(() => {
      snackbarOpen.value = false;
    }, 2000);
  } else {
    snackbarMessage.value = undefined;
  }
});

function handleSnackClose() {
  snackbarOpen.value = false;
}

// ── Emoji selection ────────────────────────────────────────────────────────
function handleEmojiSelect(selectedEmoji: Emoji, event: PointerEvent) {
  let copyText: string;

  // Shift key swaps the copy type.
  if (event.shiftKey) {
    copyText = copyUnicode.value
      ? (parseShortCodes(selectedEmoji.shortcodes)[0] ?? "")
      : unifiedToUnicodeEmoji(selectedEmoji.unified ?? "");
  } else {
    copyText = copyUnicode.value
      ? unifiedToUnicodeEmoji(selectedEmoji.unified ?? "")
      : (parseShortCodes(selectedEmoji.shortcodes)[0] ?? "");
  }

  // Build snackbar message.
  let snackMsg: string;
  if (copyText === "") {
    // Fallback: unicode not available, copy shortcode instead.
    copyText = selectedEmoji.shortcodes;
    snackMsg =
      "Emoji 'shortcode' copied to clipboard since 'unicode' is not available.";
  } else {
    const [primary, secondary] = copyUnicode.value
      ? ["unicode", "shortcode"]
      : ["shortcode", "unicode"];

    if (event.shiftKey) {
      snackMsg = `Emoji '${secondary}' copied to clipboard.`;
    } else {
      snackMsg = `Emoji '${primary}' copied to clipboard.${
        selectedEmoji.unified ? ` Hold shift for '${secondary}'.` : ""
      }`;
    }
  }

  navigator.clipboard.writeText(copyText);
  snackPack.value.push({ message: snackMsg, key: Date.now() });
}
</script>

<style scoped>
.page {
  width: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
}

.page__main {
  display: grid;
  place-items: center;
  padding: 8px 12px 20px;
}
</style>
