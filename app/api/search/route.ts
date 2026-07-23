import { searchManga } from "@/lib/mangadex";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "";

  const results = await searchManga(title);

  return Response.json(results);
}
