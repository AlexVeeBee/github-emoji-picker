/**
 * EmojiPicker data module.
 * Parses the two JSON datasets into typed, searchable structures.
 */

// ── Raw JSON interfaces ──────────────────────────────────────────────────────

interface RawSkin {
    unified?: string;
    native?: string;
    src?: string;
}

interface RawEmoji {
    id: string;
    name: string;
    keywords?: string[];
    skins: RawSkin[];
    version?: number;
    emoticons?: string[];
}

interface RawEmojiData {
    categories: Array<{ id: string; emojis: string[] }>;
    emojis: Record<string, RawEmoji>;
}

interface RawCustomData {
    id: string;
    name: string;
    emojis: Array<{
        id: string;
        name: string;
        keywords: string[];
        skins: RawSkin[];
    }>;
}

// ── Public types ─────────────────────────────────────────────────────────────

export interface Skin {
    unified?: string;
    native?: string;
    src?: string;
}

export interface EmojiEntry {
    id: string;
    name: string;
    keywords: string[];
    skins: Skin[];
    isCustom: boolean;
}

export interface EmojiCategory {
    id: string;
    emojis: EmojiEntry[];
}

// ── Build index ──────────────────────────────────────────────────────────────

// JSON imports – cast through unknown to avoid TypeScript's huge literal inference.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import emojiDataJson from "~/data/github_emojis.json";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import customDataJson from "~/data/github_custom_emojis.json";

const emojiData = emojiDataJson as unknown as RawEmojiData;
const customData = customDataJson as unknown as RawCustomData;

// Build a map of all standard emojis.
const emojiMap = new Map<string, EmojiEntry>();
for (const [, raw] of Object.entries(emojiData.emojis)) {
    emojiMap.set(raw.id, {
        id: raw.id,
        name: raw.name,
        keywords: raw.keywords ?? [],
        skins: raw.skins as Skin[],
        isCustom: false,
    });
}

// Build standard categories preserving original order.
export const categories: EmojiCategory[] = emojiData.categories.map((cat) => ({
    id: cat.id,
    emojis: cat.emojis.map((id) => emojiMap.get(id)).filter((e): e is EmojiEntry => e !== undefined),
}));

// Append GitHub custom emoji category.
const githubCategory: EmojiCategory = {
    id: customData.id,
    emojis: customData.emojis.map((raw) => ({
        id: raw.id,
        name: raw.name,
        keywords: raw.keywords ?? [],
        skins: raw.skins as Skin[],
        isCustom: true,
    })),
};
categories.push(githubCategory);

// ── Search ───────────────────────────────────────────────────────────────────

/**
 * Returns emojis whose id, name, or keywords contain the query string.
 * Case-insensitive. Returns an empty array for an empty query.
 */
export function searchEmojis(query: string): EmojiEntry[] {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    const results: EmojiEntry[] = [];
    for (const cat of categories) {
        for (const emoji of cat.emojis) {
            if (
                emoji.id.includes(q) ||
                emoji.name.toLowerCase().includes(q) ||
                emoji.keywords.some((k) => k.includes(q))
            ) {
                results.push(emoji);
            }
        }
    }
    return results;
}

// ── Category icon map ─────────────────────────────────────────────────────────

/** Native emoji used as tab icons for each standard category. */
export const categoryIcons: Record<string, string> = {
    people: "😀",
    nature: "🌿",
    foods: "🍔",
    activity: "⚽",
    places: "🌍",
    objects: "💡",
    symbols: "🔤",
    flags: "🏳️",
    github: "🐙",
};

/** Display name for each category (English fallback). */
export const categoryNames: Record<string, string> = {
    people: "People & Emotion",
    nature: "Animals & Nature",
    foods: "Food & Drink",
    activity: "Activities",
    places: "Travel & Places",
    objects: "Objects",
    symbols: "Symbols",
    flags: "Flags",
    github: "GitHub",
};
