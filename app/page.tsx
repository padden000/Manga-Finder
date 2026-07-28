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
    <main className="min-h-screen bg-[#F8F7F4] p-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <h1 className="text-5xl font-bold text-[#6366F1]">Manga Finder</h1>
          <div className="flex gap-4">
            <Link href="/history" className="text-[#6366F1] underline">
              閲覧履歴
            </Link>
            <Link href="/favorites" className="text-[#6366F1] underline">
              お気に入り
            </Link>
          </div>
        </div>

        <p className="mt-4 text-lg text-gray-600">
          漫画タイトルを検索して、配信サービスを探そう
        </p>

        <SearchSection />

        <section className="mt-16">
          <h2 className="text-2xl font-bold">人気の作品</h2>

          <div className="mt-4 grid gap-4">
            {popularManga.map((manga) => (
              <MangaCard key={manga.id} manga={manga} />
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold">新刊・更新</h2>

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
