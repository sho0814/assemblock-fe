// api/search.ts
import { authApi } from '@api';

export interface HistoryItem {
    historyId: number;
    keyword: string;
}

export const getRecentSearches = async (): Promise<HistoryItem[]> => {
    const response = await authApi.get('/search/history');
    return response.data; // HistoryItem[] 배열 반환 가정
};

export const deleteSearchHistory = async (historyId: number): Promise<void> => {
    await authApi.delete(`/search/history/${historyId}`);
};

export const deleteAllSearchHistory = async (): Promise<void> => {
    await authApi.delete('/search/history');
};
