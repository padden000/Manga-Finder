import Link from "next/link";
import type { Manga } from "@/types/manga";

type Props = {
  manga: Manga;
};

export default function MangaCard({ manga }: Props) {
  const title =
    manga.attributes.title.en ?? Object.values(manga.attributes.title)[0];

  const coverArt = manga.relationships.find((r) => r.type === "cover_art");
  const coverArtFileName = coverArt?.attributes?.fileName;
  const coverUrl = coverArtFileName
    ? `https://uploads.mangadex.org/covers/${manga.id}/${coverArtFileName}`
    : null;

  return (
    <Link
      href={`/manga/${manga.id}`}
      className="block rounded-xl border bg-white p-4 shadow"
    >
      {coverUrl && (
        <img src={coverUrl} alt={String(title)} className="mb-4 w-32 rounded" />
      )}
      <h2 className="text-lg font-bold">{String(title)}</h2>
    </Link>
  );
}
