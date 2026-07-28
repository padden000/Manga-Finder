import type { LocalizedString } from "@/types/manga";

export function getLocalizedText(text: LocalizedString): string {
  return text.ja ?? text.en ?? Object.values(text)[0] ?? "";
}

export function getLocalizedTitle(
  title: LocalizedString,
  altTitles: LocalizedString[],
): string {
  if (title.ja) return title.ja;

  const altJa = altTitles.find((alt) => alt.ja)?.ja;
  if (altJa) return altJa;

  return getLocalizedText(title);
}
