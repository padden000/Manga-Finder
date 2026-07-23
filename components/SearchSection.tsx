"use client";

import { useState } from "react";
import MangaCard from "@/components/MangaCard";
import type { Manga } from "@/types/manga";

export default function SearchSection() {
  const [title, setTitle] = useState("");
  const [mangaResults, setMangaResults] = useState<Manga[]>([]);

  const handleSearch = async () => {
    const res = await fetch(`/api/search?title=${encodeURIComponent(title)}`);
    const results: Manga[] = await res.json();

    setMangaResults(results);
  };

  return (
    <>
      <div className="mt-10 flex gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="作品名を入力..."
          className="flex-1 rounded-xl border border-gray-300 p-4 text-gray-900"
        />

        <button
          onClick={handleSearch}
          className="rounded-xl bg-[#6366F1] px-6 text-white"
        >
          検索
        </button>
      </div>

      <p className="mt-4">検索結果: {mangaResults.length} 件</p>

      <div className="mt-8 grid gap-4">
        {mangaResults.map((manga) => (
          <MangaCard key={manga.id} manga={manga} />
        ))}
      </div>
    </>
  );
}
