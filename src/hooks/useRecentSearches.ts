// hooks/useRecentSearches.ts
import { useState, useEffect, useCallback } from 'react';
import { getRecentSearches, deleteSearchHistory, deleteAllSearchHistory } from '@api';
import type { HistoryItem } from '@types';
import { useNavigate } from 'react-router-dom';

export const useRecentSearches = () => {
    const navigate = useNavigate();
    const [histories, setHistories] = useState<HistoryItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 데이터 페칭
    const fetchHistories = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getRecentSearches();
            setHistories(data);
        } catch (err) {
            setError('최근 검색어 로드에 실패했습니다.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    // 단일 삭제
    const handleRemove = useCallback(async (historyId: number) => {
        try {
            await deleteSearchHistory(historyId);
            setHistories(prev => prev.filter(item => item.historyId !== historyId));
        } catch (err) {
            console.error('검색어 삭제 실패:', err);
        }
    }, []);

    // 전체 삭제
    const handleRemoveAll = useCallback(async () => {
        try {
            await deleteAllSearchHistory();
            setHistories([]);
        } catch (err) {
            console.error('전체 삭제 실패:', err);
        }
    }, []);

    // 검색어 클릭
    const handleClick = useCallback((keyword: string) => {
        navigate(`/search/${encodeURIComponent(keyword)}`);
    }, [navigate]);

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
