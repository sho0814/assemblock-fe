import { authApi } from '@api';
import type { NewBlockData, BlockType, TechPart, SearchResultBlock } from '@types';

export const createBlock = async (blockData: NewBlockData): Promise<any> => {
    const response = await authApi.post('/blocks', blockData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const addBlockToBoard = async (boardId: number, blockId: number): Promise<any> => {
    const response = await authApi.post(`/boards/${boardId}/blocks`,
        { blockId },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    return response.data;
}

export const searchBlocks = async (keyword: string): Promise<SearchResultBlock[]> => {
    const response = await authApi.get('/search/blocks', {
        params: { q: keyword }
    });
    return response.data;
};

export const fetchTypeBlocks = async (blockType: BlockType, page: number, size: number, sort: string,): Promise<any> => {
    const response = await authApi.get('/blocks', {
        params: {
            blockType,
            pageable: {
                page,
                size,
                sort
            }
        }
    });
    return response.data;
}

export const fetchCategoryBlocks = async (techPart: TechPart, category: string, page: number, size: number, sort: string): Promise<any> => {
    const response = await authApi.get('/blocks', {
        params: {
            techPart,
            category,
            pageable: {
                page,
                size,
                sort
            }
        }
    });
    return response.data;
}