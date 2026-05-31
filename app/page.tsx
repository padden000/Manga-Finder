"use client";

import { useState } from "react";
import { searchManga } from "@/lib/mangadex";
import MangaCard from "@/components/MangaCard";

export default function Home() {
  const [title, setTitle] = useState("");
  const [mangaResults, setMangaResults] = useState([]);

  const handleSearch = async () => {
    const results = await searchManga(title);
    setMangaResults(results);

    console.log(title);
  };

  return (
    <main className="min-h-screen bg-[#F8F7F4] p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-5xl font-bold text-[#6366F1]">Manga Finder</h1>

        <p className="mt-4 text-lg text-gray-600">
          漫画タイトルを検索して、配信サービスを探そう
        </p>

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
          {mangaResults.map((manga: any) => (
            <MangaCard key={manga.id} manga={manga} />
          ))}
        </div>
      </div>
    </main>
  );
}
