import AuthorSearchSection from "@/components/AuthorSearchSection";

export default function AuthorsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-teal-50 via-[#F8F7F4] to-[#F8F7F4] p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-teal-600">作者で探す</h1>
        <p className="mt-2 text-gray-600">
          作者名を入力して検索してください。
        </p>

        <AuthorSearchSection />
      </div>
    </main>
  );
}
