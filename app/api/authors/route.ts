import { searchAuthors } from "@/lib/mangadex";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name") ?? "";

  const results = await searchAuthors(name);

  return Response.json(results);
}
