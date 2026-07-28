"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Manga } from "@/types/manga";
import { addFavorite, isFavorite, removeFavorite } from "@/lib/favorites";

type Props = {
  manga: Manga;
};

export default function MangaCard({ manga }: Props) {
  const title =
    manga.attributes.title.en ?? Object.values(manga.attributes.title)[0];

  const coverArt = manga.relationships.find((r) => r.type === "cover_art");
  const coverArtFileName = coverArt?.attributes?.fileName;
  const coverUrl = coverArtFileName
    ? `https://uploads.mangadex.org/covers/${manga.id}/${coverArtFileName}`
    : null;

  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite(manga.id));
  }, [manga.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (favorite) {
      removeFavorite(manga.id);
    } else {
      addFavorite({ id: manga.id, title: String(title), coverUrl });
    }
    setFavorite(!favorite);
  };

  return (
    <Link
      href={`/manga/${manga.id}`}
      className="relative block rounded-xl border bg-white p-4 shadow"
    >
      <button
        onClick={toggleFavorite}
        aria-label="お気に入り"
        className="absolute right-3 top-3 text-xl text-yellow-500"
      >
        {favorite ? "★" : "☆"}
      </button>
      {coverUrl && (
        <img src={coverUrl} alt={String(title)} className="mb-4 w-32 rounded" />
      )}
      <h2 className="text-lg font-bold">{String(title)}</h2>
    </Link>
  );
}
