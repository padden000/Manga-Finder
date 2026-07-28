"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { clearHistory, getHistory, type HistoryManga } from "@/lib/history";

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryManga[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleClear = () => {
    clearHistory();
    setHistory([]);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-[#F8F7F4] to-[#F8F7F4] p-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-blue-600">閲覧履歴</h1>
          {history.length > 0 && (
            <button
              onClick={handleClear}
              className="rounded-lg border px-3 py-1 text-sm text-gray-600 hover:bg-gray-100"
            >
              履歴を消去
            </button>
          )}
        </div>

        {history.length === 0 && (
          <p className="mt-4 text-gray-600">
            閲覧履歴はまだありません。作品ページを開くと記録されます。
          </p>
        )}

        <div className="mt-8 grid gap-4">
          {history.map((manga) => (
            <Link
              key={manga.id}
              href={`/manga/${manga.id}`}
              className="block rounded-xl border border-gray-200 bg-white p-4 shadow transition hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-lg"
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
