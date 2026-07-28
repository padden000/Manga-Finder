import Link from "next/link";
import { getGenreTags } from "@/lib/mangadex";

export default async function GenresPage() {
  const tags = await getGenreTags();

  return (
    <main className="min-h-screen bg-[#F8F7F4] p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-[#6366F1]">ジャンルで探す</h1>

        <div className="mt-8 flex flex-wrap gap-2">
          {tags.map((tag) => {
            const name =
              tag.attributes.name.en ?? Object.values(tag.attributes.name)[0];

            return (
              <Link
                key={tag.id}
                href={`/genres/${tag.id}`}
                className="rounded-full border bg-white px-4 py-2 text-sm hover:bg-gray-50"
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
