const palette = [
  "bg-pink-100 text-pink-700",
  "bg-purple-100 text-purple-700",
  "bg-blue-100 text-blue-700",
  "bg-teal-100 text-teal-700",
  "bg-green-100 text-green-700",
  "bg-yellow-100 text-yellow-700",
  "bg-orange-100 text-orange-700",
  "bg-red-100 text-red-700",
];

export function genreColor(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) % palette.length;
  }

  return palette[hash];
}
