export async function searchManga(title: string) {
  const res = await fetch(
    `https://api.mangadex.org/manga?title=${encodeURIComponent(title)}&limit=10`
  );

  const data = await res.json();

  return data.data;
}