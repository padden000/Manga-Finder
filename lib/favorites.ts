export type FavoriteManga = {
  id: string;
  title: string;
  coverUrl: string | null;
};

const STORAGE_KEY = "favorites";

export function getFavorites(): FavoriteManga[] {
  if (typeof window === "undefined") return [];

  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function isFavorite(id: string): boolean {
  return getFavorites().some((favorite) => favorite.id === id);
}

export function addFavorite(manga: FavoriteManga) {
  const favorites = getFavorites();
  if (favorites.some((favorite) => favorite.id === manga.id)) return;

  localStorage.setItem(STORAGE_KEY, JSON.stringify([...favorites, manga]));
}

export function removeFavorite(id: string) {
  const favorites = getFavorites().filter((favorite) => favorite.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}
