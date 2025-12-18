// src/hooks/useFetchBlocks.ts
import { useState, useCallback } from "react";
import {
    fetchKeywordBlocks,
    fetchTypeBlocks,
    fetchCategoryBlocks,
} from "@api";
import type { BlockData, BlockType } from "@types";

type UseFetchBlocksReturn = {
    blocks: BlockData[];
    loading: boolean;
    error: string | null;
    fetchByKeyword: (keyword: string) => Promise<void>;
    fetchByType: (blockType: BlockType) => Promise<void>;
    fetchByCategory: (category: string) => Promise<void>;
};

export const useFetchBlocks = (): UseFetchBlocksReturn => {
    const [blocks, setBlocks] = useState<BlockData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const createFetcher = useCallback(
        <T,>(fetchFn: (arg: T) => Promise<BlockData[]>, errorMessage: string) =>
            async (arg: T) => {
                setLoading(true);
                setError(null);
                try {
                    const data = await fetchFn(arg);
                    setBlocks(data);
                } catch (err) {
                    console.error(errorMessage, err);
                    setError(errorMessage);
                    setBlocks([]);
                } finally {
                    setLoading(false);
                }
            },
        []
    );

    const fetchByKeyword = useCallback(
        createFetcher<string>(fetchKeywordBlocks, "검색 결과를 불러오지 못했습니다."),
        [createFetcher]
    );

    const fetchByType = useCallback(
        createFetcher<BlockType>(fetchTypeBlocks, "블록을 불러오지 못했습니다."),
        [createFetcher]
    );

    const fetchByCategory = useCallback(
        createFetcher<string>(fetchCategoryBlocks, "카테고리별 블록을 불러오지 못했습니다."),
        [createFetcher]
    );

    return {
        blocks,
        loading,
        error,
        fetchByKeyword,
        fetchByType,
        fetchByCategory,
    };
};
