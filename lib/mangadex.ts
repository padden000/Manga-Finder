import type { Manga } from "@/types/manga";

type SearchMangaResponse = {
  data: Manga[];
};

export async function searchManga(title: string): Promise<Manga[]> {
  const res = await fetch(
    `https://api.mangadex.org/manga?title=${encodeURIComponent(title)}&limit=10&includes[]=cover_art`,
  );

  const data: SearchMangaResponse = await res.json();

  return data.data;
}

type GetMangaResponse = {
  data: Manga;
};

export async function getManga(id: string): Promise<Manga> {
  const res = await fetch(
    `https://api.mangadex.org/manga/${id}?includes[]=cover_art`,
  );

  const data: GetMangaResponse = await res.json();

  return data.data;
}
