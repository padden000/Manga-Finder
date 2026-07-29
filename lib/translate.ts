// 無料・APIキー不要の翻訳API(MyMemory)を使う。
// 1回のリクエストで送れる文字数に制限があるため、文単位で分割してから翻訳し、後でつなげる。
const MAX_CHUNK_LENGTH = 450;

function splitIntoChunks(text: string): string[] {
  const sentences = text.split(/(?<=[.!?])\s+/);
  const chunks: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    if (current && (current + sentence).length > MAX_CHUNK_LENGTH) {
      chunks.push(current.trim());
      current = "";
    }
    current += `${sentence} `;
  }
  if (current.trim()) chunks.push(current.trim());

  return chunks.length > 0 ? chunks : [text];
}

type MyMemoryResponse = {
  responseData?: {
    translatedText?: string;
  };
};

export async function translateToJapanese(text: string): Promise<string> {
  if (!text) return text;

  try {
    const chunks = splitIntoChunks(text);

    const translatedChunks = await Promise.all(
      chunks.map(async (chunk) => {
        const res = await fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(chunk)}&langpair=en|ja`,
        );
        const data: MyMemoryResponse = await res.json();
        return data.responseData?.translatedText ?? chunk;
      }),
    );

    return translatedChunks.join(" ");
  } catch {
    return text;
  }
}
