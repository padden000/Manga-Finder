export type HistoryManga = {
  id: string;
  title: string;
  coverUrl: string | null;
  viewedAt: number;
};

const STORAGE_KEY = "history";
const MAX_HISTORY = 20;

export function getHistory(): HistoryManga[] {
  if (typeof window === "undefined") return [];

  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function recordHistory(manga: Omit<HistoryManga, "viewedAt">) {
  const rest = getHistory().filter((entry) => entry.id !== manga.id);
  const updated = [{ ...manga, viewedAt: Date.now() }, ...rest].slice(
    0,
    MAX_HISTORY,
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
}
