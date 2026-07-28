import MangaCard from "@/components/MangaCard";
import { getGenreTags, getMangaByTag } from "@/lib/mangadex";

type Props = {
  params: Promise<{ tagId: string }>;
};

export default async function GenreDetailPage({ params }: Props) {
  const { tagId } = await params;

  const [manga, tags] = await Promise.all([
    getMangaByTag(tagId),
    getGenreTags(),
  ]);

  const tag = tags.find((t) => t.id === tagId);
  const tagName = tag
    ? (tag.attributes.name.en ?? Object.values(tag.attributes.name)[0])
    : "ジャンル";

  return (
    <main className="min-h-screen bg-[#F8F7F4] p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-[#6366F1]">{tagName}</h1>

        <div className="mt-8 grid gap-4">
          {manga.map((m) => (
            <MangaCard key={m.id} manga={m} />
          ))}
        </div>
      </div>
    </main>
  );
}
