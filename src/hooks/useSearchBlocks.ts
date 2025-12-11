// src/hooks/useSearchBlocks.ts
import { useState, useEffect, useCallback } from "react";
import { searchBlocks } from "@api";
import type { BlockData } from "@types";

export const useSearchBlocks = (keyword: string) => {
    const [blocks, setBlocks] = useState<BlockData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBlocks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await searchBlocks(keyword);
            setBlocks(data);
        } catch (err) {
            setError('검색 결과를 불러오지 못했습니다.');
            console.error('Search failed:', err);
            setBlocks([]);
        } finally {
            setLoading(false)
        }
    }, [keyword]);

    useEffect(() => {
        fetchBlocks();
    }, [fetchBlocks]);

    return { blocks, loading, error, refetch: fetchBlocks };
};
