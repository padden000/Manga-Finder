export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F7F4] p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-5xl font-bold text-[#6366F1]">
          Manga Finder
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          漫画タイトルを検索して、どの配信サービスで読めるか確認しよう
        </p>

        <div className="mt-10">
          <input
            type="text"
            placeholder="作品名を入力..."
            className="w-full rounded-xl border border-gray-300 p-4 text-lg"
          />
        </div>
      </div>
    </main>
  );
}