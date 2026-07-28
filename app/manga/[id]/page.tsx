import Link from "next/link";
import { getManga } from "@/lib/mangadex";
import { deliverySites } from "@/lib/deliverySites";
import RecordHistory from "@/components/RecordHistory";

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

  const author = manga.relationships.find((r) => r.type === "author");
  const authorName = author?.attributes?.name;

  const genres = manga.attributes.tags.filter(
    (tag) => tag.attributes.group === "genre",
  );

  return (
    <main className="min-h-screen bg-[#F8F7F4] p-8">
      <RecordHistory manga={{ id: manga.id, title: String(title), coverUrl }} />
      <div className="mx-auto max-w-2xl">
        {coverUrl && (
          <img
            src={coverUrl}
            alt={String(title)}
            className="mb-6 w-48 rounded-xl shadow"
          />
        )}
        <h1 className="text-3xl font-bold">{String(title)}</h1>

        <div className="mt-2 space-y-1 text-sm text-gray-500">
          <p>ステータス: {manga.attributes.status}</p>
          {authorName && <p>作者: {authorName}</p>}
          {manga.attributes.lastVolume && (
            <p>既刊: {manga.attributes.lastVolume}巻</p>
          )}
        </div>

        {genres.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {genres.map((tag) => {
              const genreName =
                tag.attributes.name.en ?? Object.values(tag.attributes.name)[0];

              return (
                <Link
                  key={tag.id}
                  href={`/genres/${tag.id}`}
                  className="rounded-full bg-gray-200 px-3 py-1 text-xs text-gray-700 hover:bg-gray-300"
                >
                  {genreName}
                </Link>
              );
            })}
          </div>
        )}

        <p className="mt-4 whitespace-pre-line text-gray-700">
          {description}
        </p>

        <div className="mt-8">
          <h2 className="text-lg font-bold">配信サイトで探す</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {deliverySites.map((site) => (
              <a
                key={site.name}
                href={site.searchUrl(String(title))}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border bg-white px-3 py-2 text-sm hover:bg-gray-50"
              >
                {site.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
