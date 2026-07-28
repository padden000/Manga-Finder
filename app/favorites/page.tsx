"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getFavorites, type FavoriteManga } from "@/lib/favorites";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteManga[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  return (
    <main className="min-h-screen bg-[#F8F7F4] p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-[#6366F1]">お気に入り</h1>

        {favorites.length === 0 && (
          <p className="mt-4 text-gray-600">
            お気に入りはまだありません。作品カードの☆から追加できます。
          </p>
        )}

        <div className="mt-8 grid gap-4">
          {favorites.map((manga) => (
            <Link
              key={manga.id}
              href={`/manga/${manga.id}`}
              className="block rounded-xl border bg-white p-4 shadow"
            >
              {manga.coverUrl && (
                <img
                  src={manga.coverUrl}
                  alt={manga.title}
                  className="mb-4 w-32 rounded"
                />
              )}
              <h2 className="text-lg font-bold">{manga.title}</h2>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
