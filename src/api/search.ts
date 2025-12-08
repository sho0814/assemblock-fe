// api/search.ts
import { authApi } from '@api';
import type { HistoryItem, SearchBlock } from '@types';

export const getRecentSearches = async (): Promise<HistoryItem[]> => {
    const response = await authApi.get('/search/history');
    return response.data;
};

export const deleteSearchHistory = async (historyId: number): Promise<void> => {
    await authApi.delete(`/search/history/${historyId}`);
};

export const deleteAllSearchHistory = async (): Promise<void> => {
    await authApi.delete('/search/history');
};

export const searchBlocks = async (keyword: string): Promise<SearchBlock[]> => {
    const response = await authApi.get('/search/blocks', {
        params: { q: keyword }
    });
    return response.data;
};