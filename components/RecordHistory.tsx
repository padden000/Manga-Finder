"use client";

import { useEffect } from "react";
import { recordHistory } from "@/lib/history";

type Props = {
  manga: {
    id: string;
    title: string;
    coverUrl: string | null;
  };
};

export default function RecordHistory({ manga }: Props) {
  const { id, title, coverUrl } = manga;

  useEffect(() => {
    recordHistory({ id, title, coverUrl });
  }, [id, title, coverUrl]);

  return null;
}
