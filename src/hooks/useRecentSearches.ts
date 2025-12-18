// src/hooks/useRecentSearches.ts
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { HistoryItem } from '@types';
import {
    getRecentSearches,
    addSearchHistory,
    deleteSearchHistory,
    clearAllSearchHistory,
} from '@stores';

export const useRecentSearches = () => {
    const navigate = useNavigate();
    const [histories, setHistories] = useState<HistoryItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 데이터 페칭 (localStorage)
    const fetchHistories = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = getRecentSearches();
            setHistories(data);
        } catch (err) {
            setError('최근 검색어 로드에 실패했습니다.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    // 단일 삭제 (localStorage)
    const handleRemove = useCallback(async (historyId: number) => {
        try {
            const next = deleteSearchHistory(historyId);
            setHistories(next);
        } catch (err) {
            console.error('검색어 삭제 실패:', err);
        }
    }, []);

    // 전체 삭제 (localStorage)
    const handleRemoveAll = useCallback(async () => {
        try {
            clearAllSearchHistory();
            setHistories([]);
        } catch (err) {
            console.error('전체 삭제 실패:', err);
        }
    }, []);

    // 검색어 클릭 → localStorage에 추가 후 navigate
    const handleClick = useCallback(
        (keyword: string) => {
            try {
                const updatedHistories = addSearchHistory(keyword);
                setHistories(updatedHistories);
                navigate(`/search/${encodeURIComponent(keyword)}`);
            } catch (err) {
                console.error('검색어 추가 실패:', err);
                navigate(`/search/${encodeURIComponent(keyword)}`);
            }
        },
        [navigate],
    );

    // 초기 로드
    useEffect(() => {
        fetchHistories();
    }, [fetchHistories]);

    return {
        histories,
        loading,
        error,
        refetch: fetchHistories,
        handleClick,
        handleRemove,
        handleRemoveAll,
    };
};
