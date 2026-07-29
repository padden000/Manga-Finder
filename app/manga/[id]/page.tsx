import Link from "next/link";
import { getManga } from "@/lib/mangadex";
import { deliverySites } from "@/lib/deliverySites";
import { genreColor } from "@/lib/genreColors";
import { getLocalizedText, getLocalizedTitle } from "@/lib/localized";
import RecordHistory from "@/components/RecordHistory";
import StatusBadge from "@/components/StatusBadge";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function MangaDetailPage({ params }: Props) {
  const { id } = await params;
  const manga = await getManga(id);

  const title = getLocalizedTitle(
    manga.attributes.title,
    manga.attributes.altTitles,
  );

  const coverArt = manga.relationships.find((r) => r.type === "cover_art");
  const coverArtFileName = coverArt?.attributes?.fileName;
  const coverUrl = coverArtFileName
    ? `https://uploads.mangadex.org/covers/${manga.id}/${coverArtFileName}`
    : null;

  const description = getLocalizedText(manga.attributes.description);

  const author = manga.relationships.find((r) => r.type === "author");
  const authorName = author?.attributes?.name;

  const genres = manga.attributes.tags.filter(
    (tag) => tag.attributes.group === "genre",
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 via-[#F8F7F4] to-[#F8F7F4] p-8">
      <RecordHistory manga={{ id: manga.id, title, coverUrl }} />
      <div className="mx-auto max-w-2xl">
        {coverUrl && (
          <img
            src={coverUrl}
            alt={title}
            referrerPolicy="no-referrer"
            className="mb-6 w-48 rounded-xl shadow-lg"
          />
        )}
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <StatusBadge status={manga.attributes.status} />
          {author && authorName && (
            <span>
              作者:{" "}
              <Link
                href={`/authors/${author.id}`}
                className="text-teal-600 underline"
              >
                {authorName}
              </Link>
            </span>
          )}
          {manga.attributes.lastVolume && (
            <span>既刊: {manga.attributes.lastVolume}巻</span>
          )}
        </div>

        {genres.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {genres.map((tag) => {
              const genreName = getLocalizedText(tag.attributes.name);

              return (
                <Link
                  key={tag.id}
                  href={`/genres/${tag.id}`}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition hover:opacity-80 ${genreColor(tag.id)}`}
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
          <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800">
            <span className="h-5 w-1.5 rounded-full bg-[#6366F1]" />
            配信サイトで探す
          </h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {deliverySites.map((site) => (
              <a
                key={site.name}
                href={site.searchUrl(title)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-indigo-200 bg-white px-3 py-2 text-sm text-indigo-700 transition hover:bg-indigo-50"
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
