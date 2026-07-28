import Link from "next/link";
import { getGenreTags } from "@/lib/mangadex";
import { genreColor } from "@/lib/genreColors";
import { getLocalizedText } from "@/lib/localized";

export default async function GenresPage() {
  const tags = await getGenreTags();

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 via-[#F8F7F4] to-[#F8F7F4] p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-[#6366F1]">ジャンルで探す</h1>

        <div className="mt-8 flex flex-wrap gap-2">
          {tags.map((tag) => {
            const name = getLocalizedText(tag.attributes.name);

            return (
              <Link
                key={tag.id}
                href={`/genres/${tag.id}`}
                className={`rounded-full px-4 py-2 text-sm font-medium transition hover:opacity-80 ${genreColor(tag.id)}`}
              >
                {name}
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
