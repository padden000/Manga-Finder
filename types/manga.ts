// MangaDexは1つのタイトルを複数言語で保持している。
// 例: { "en": "One Piece", "ja": "ワンピース" }
// キーが言語コード、値がその言語でのタイトルなので Record<言語コード, タイトル> で表す。
export type LocalizedString = Record<string, string>;

export type Relationship = {
  id: string;
  type: string;
  attributes?: {
    fileName?: string;
    name?: string;
  };
};

export type Tag = {
  id: string;
  attributes: {
    name: LocalizedString;
    group: string;
  };
};

export type Author = {
  id: string;
  attributes: {
    name: string;
  };
};

export type Manga = {
  id: string;
  attributes: {
    title: LocalizedString;
    altTitles: LocalizedString[];
    description: LocalizedString;
    status: string;
    lastVolume: string;
    tags: Tag[];
  };
  relationships: Relationship[];
};
