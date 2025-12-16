import { useEffect, useState } from "react";
import { fetchBoardDetail } from "@api";
import type { BoardDetail } from "@types";

export const useBoardDetail = (boardId?: number) => {
  const [data, setData] = useState<BoardDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!boardId) return;

    const run = async () => {
      setLoading(true);
      try {
        const res = await fetchBoardDetail(boardId);
        setData(res);
      } catch (e) {
        console.error("Failed to fetch board detail:", e);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [boardId]);

  return { data, loading };
};
