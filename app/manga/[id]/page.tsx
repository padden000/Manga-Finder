import { getManga } from "@/lib/mangadex";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function MangaDetailPage({ params }: Props) {
  const { id } = await params;
  const manga = await getManga(id);

  const title =
    manga.attributes.title.en ?? Object.values(manga.attributes.title)[0];

  const coverArt = manga.relationships.find((r) => r.type === "cover_art");
  const coverArtFileName = coverArt?.attributes?.fileName;
  const coverUrl = coverArtFileName
    ? `https://uploads.mangadex.org/covers/${manga.id}/${coverArtFileName}`
    : null;

  const description =
    manga.attributes.description.en ??
    Object.values(manga.attributes.description)[0];

  return (
    <main className="min-h-screen bg-[#F8F7F4] p-8">
      <div className="mx-auto max-w-2xl">
        {coverUrl && (
          <img
            src={coverUrl}
            alt={String(title)}
            className="mb-6 w-48 rounded-xl shadow"
          />
        )}
        <h1 className="text-3xl font-bold">{String(title)}</h1>
        <p className="mt-2 text-sm text-gray-500">
          ステータス: {manga.attributes.status}
        </p>
        <p className="mt-4 whitespace-pre-line text-gray-700">
          {description}
        </p>
      </div>
    </main>
  );
}
