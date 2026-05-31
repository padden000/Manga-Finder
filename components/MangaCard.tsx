type Props = {
  manga: any;
};

export default function MangaCard({ manga }: Props) {
  const title =
    manga.attributes.title.en ?? Object.values(manga.attributes.title)[0];

  return (
    <div className="rounded-xl border bg-white p-4 shadow">
      <h2 className="text-lg font-bold">{String(title)}</h2>
    </div>
  );
}
