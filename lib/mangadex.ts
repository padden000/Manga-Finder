import type { Manga, Tag } from "@/types/manga";

type SearchMangaResponse = {
  data: Manga[];
};

type TagListResponse = {
  data: Tag[];
};

export async function getGenreTags(): Promise<Tag[]> {
  const res = await fetch("https://api.mangadex.org/manga/tag");
  const data: TagListResponse = await res.json();

  return data.data.filter((tag) => tag.attributes.group === "genre");
}

export async function getMangaByTag(tagId: string): Promise<Manga[]> {
  const res = await fetch(
    `https://api.mangadex.org/manga?limit=10&includedTags[]=${tagId}&contentRating[]=safe&includes[]=cover_art`,
  );

  const data: SearchMangaResponse = await res.json();

  return data.data;
}

export async function searchManga(title: string): Promise<Manga[]> {
  const res = await fetch(
    `https://api.mangadex.org/manga?title=${encodeURIComponent(title)}&limit=10&includes[]=cover_art`,
  );

  const data: SearchMangaResponse = await res.json();

  return data.data;
}

export async function getPopularManga(): Promise<Manga[]> {
  const res = await fetch(
    `https://api.mangadex.org/manga?limit=10&order[followedCount]=desc&contentRating[]=safe&includes[]=cover_art`,
  );

  const data: SearchMangaResponse = await res.json();

  return data.data;
}

export async function getLatestManga(): Promise<Manga[]> {
  const res = await fetch(
    `https://api.mangadex.org/manga?limit=10&order[latestUploadedChapter]=desc&contentRating[]=safe&includes[]=cover_art`,
  );

  const data: SearchMangaResponse = await res.json();

  return data.data;
}

type GetMangaResponse = {
  data: Manga;
};

export async function getManga(id: string): Promise<Manga> {
  const res = await fetch(
    `https://api.mangadex.org/manga/${id}?includes[]=cover_art&includes[]=author`,
  );

  const data: GetMangaResponse = await res.json();

  return data.data;
}
