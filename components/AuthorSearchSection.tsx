"use client";

import Link from "next/link";
import { useState } from "react";
import type { Author } from "@/types/manga";

export default function AuthorSearchSection() {
  const [name, setName] = useState("");
  const [authors, setAuthors] = useState<Author[]>([]);

  const handleSearch = async () => {
    const res = await fetch(`/api/authors?name=${encodeURIComponent(name)}`);
    const results: Author[] = await res.json();

    setAuthors(results);
  };

  return (
    <>
      <div className="mt-6 flex gap-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="作者名を入力..."
          className="flex-1 rounded-xl border border-gray-300 p-4 text-gray-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
        />

        <button
          onClick={handleSearch}
          className="shrink-0 whitespace-nowrap rounded-xl bg-teal-600 px-6 font-medium text-white transition hover:bg-teal-700"
        >
          検索
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {authors.map((author) => (
          <Link
            key={author.id}
            href={`/authors/${author.id}`}
            className="rounded-full bg-teal-100 px-4 py-2 text-sm font-medium text-teal-700 transition hover:bg-teal-200"
          >
            {author.attributes.name}
          </Link>
        ))}
      </div>
    </>
  );
}
