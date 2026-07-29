import MangaCard from "@/components/MangaCard";
import { getAuthor, getMangaByAuthor } from "@/lib/mangadex";

type Props = {
  params: Promise<{ authorId: string }>;
};

export default async function AuthorDetailPage({ params }: Props) {
  const { authorId } = await params;

  const [author, manga] = await Promise.all([
    getAuthor(authorId),
    getMangaByAuthor(authorId),
  ]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-teal-50 via-[#F8F7F4] to-[#F8F7F4] p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-teal-600">
          {author.attributes.name}
        </h1>

        <div className="mt-8 grid gap-4">
          {manga.map((m) => (
            <MangaCard key={m.id} manga={m} />
          ))}
        </div>
      </div>
    </main>
  );
}
