import Link from "next/link";
import SearchSection from "@/components/SearchSection";
import MangaCard from "@/components/MangaCard";
import { getPopularManga, getLatestManga } from "@/lib/mangadex";

export default async function Home() {
  const [popularManga, latestManga] = await Promise.all([
    getPopularManga(),
    getLatestManga(),
  ]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 via-[#F8F7F4] to-[#F8F7F4] p-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="bg-gradient-to-r from-[#6366F1] to-pink-500 bg-clip-text text-5xl font-bold text-transparent">
            Manga Finder
          </h1>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/genres"
              className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700 transition hover:bg-purple-200"
            >
              ジャンルで探す
            </Link>
            <Link
              href="/authors"
              className="rounded-full bg-teal-100 px-4 py-2 text-sm font-medium text-teal-700 transition hover:bg-teal-200"
            >
              作者で探す
            </Link>
            <Link
              href="/history"
              className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-200"
            >
              閲覧履歴
            </Link>
            <Link
              href="/favorites"
              className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-700 transition hover:bg-yellow-200"
            >
              お気に入り
            </Link>
          </div>
        </div>

        <p className="mt-4 text-lg text-gray-600">
          漫画タイトルを検索して、配信サービスを探そう
        </p>

        <SearchSection />

        <section className="mt-16">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-800">
            <span className="h-6 w-1.5 rounded-full bg-orange-400" />
            人気の作品
          </h2>

          <div className="mt-4 grid gap-4">
            {popularManga.map((manga) => (
              <MangaCard key={manga.id} manga={manga} />
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-800">
            <span className="h-6 w-1.5 rounded-full bg-green-400" />
            新刊・更新
          </h2>

          <div className="mt-4 grid gap-4">
            {latestManga.map((manga) => (
              <MangaCard key={manga.id} manga={manga} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
