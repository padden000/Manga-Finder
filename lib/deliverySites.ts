export type DeliverySite = {
  name: string;
  searchUrl: (title: string) => string;
};

export const deliverySites: DeliverySite[] = [
  {
    name: "Kindle",
    searchUrl: (title) =>
      `https://www.amazon.co.jp/s?k=${encodeURIComponent(title)}&i=digital-text`,
  },
  {
    name: "ebookjapan",
    searchUrl: (title) =>
      `https://ebookjapan.yahoo.co.jp/search/?keyword=${encodeURIComponent(title)}`,
  },
  {
    name: "コミックシーモア",
    searchUrl: (title) =>
      `https://www.cmoa.jp/search/result/?word=${encodeURIComponent(title)}`,
  },
  {
    name: "DMMブックス",
    searchUrl: (title) =>
      `https://book.dmm.com/list/?keyword=${encodeURIComponent(title)}`,
  },
  {
    name: "BookLive!",
    searchUrl: (title) =>
      `https://booklive.jp/search/word?word=${encodeURIComponent(title)}`,
  },
  {
    name: "楽天Kobo",
    searchUrl: (title) =>
      `https://books.rakuten.co.jp/search?g=&sitem=${encodeURIComponent(title)}`,
  },
  {
    name: "BOOK☆WALKER",
    searchUrl: (title) =>
      `https://bookwalker.jp/search/?word=${encodeURIComponent(title)}`,
  },
];
