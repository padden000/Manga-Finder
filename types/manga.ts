// MangaDexは1つのタイトルを複数言語で保持している。
// 例: { "en": "One Piece", "ja": "ワンピース" }
// キーが言語コード、値がその言語でのタイトルなので Record<言語コード, タイトル> で表す。
export type LocalizedString = Record<string, string>;

export type Relationship = {
  id: string;
  type: string;
  attributes?: {
    fileName: string;
  };
};

export type Manga = {
  id: string;
  attributes: {
    title: LocalizedString;
    description: LocalizedString;
    status: string;
  };
  relationships: Relationship[];
};
