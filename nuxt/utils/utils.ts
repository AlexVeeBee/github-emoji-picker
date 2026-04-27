/**
 * Convert a unified codepoint string to a unicode emoji.
 * @param unified - dash-separated hex codepoints e.g. "1F600" or "1F1FA-1F1F8"
 * @returns the rendered emoji string, or "" if unified is falsy
 */
export const unifiedToUnicodeEmoji = (unified: string): string => {
  if (!unified) return "";
  return String.fromCodePoint(
    ...unified.split("-").map((str: string) => parseInt(str, 16)),
  );
};

/**
 * Parse shortcodes out of a string.
 * @param str - e.g. ":octocat:" or ":octocat::wave:"
 * @returns array of matched shortcodes, or [str] if none found
 */
export const parseShortCodes = (str: string): string[] => {
  const shortCodes = str.match(/:[^:\s]+:/g);
  return shortCodes ? shortCodes : [str];
};
