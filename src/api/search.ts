// api/search.ts
import { authApi } from '@api';
import type { SearchBlock } from '@types';

export const searchBlocks = async (keyword: string): Promise<SearchBlock[]> => {
    const response = await authApi.get('/search/blocks', {
        params: { q: keyword }
    });
    return response.data;
};