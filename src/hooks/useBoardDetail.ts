import { useEffect, useState, useCallback } from "react";
import { fetchBoardDetail } from "@api";
import type { BoardDetail } from "@types";

export const useBoardDetail = (boardId?: number) => {
  const [data, setData] = useState<BoardDetail | null>(null);
  const [loading, setLoading] = useState(false);

  // refetch 함수
  const refetch = useCallback(async () => {
    if (!boardId) return;

    setLoading(true);
    try {
      const res = await fetchBoardDetail(boardId);
      setData(res);
    } catch (e) {
      console.error("Failed to fetch board detail:", e);
    } finally {
      setLoading(false);
    }
  }, [boardId]);

  // 처음 로드, boardId 변경 시 재조회
  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, refetch };
};
