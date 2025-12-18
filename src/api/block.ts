import { authApi } from '@api';
import type { NewBlockData, BlockData,BlockType } from '@types';

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

const fetchBlocksBase = async (params: any): Promise<BlockData[]> => {
  const response = await authApi.get('/blocks', { params });
  return response.data;
};

export const fetchKeywordBlocks = (keyword: string) =>
  fetchBlocksBase({ keyword });

export const fetchTypeBlocks = (blockType: BlockType) =>
  fetchBlocksBase({ blockType });

export const fetchCategoryBlocks = (category: string) =>
  fetchBlocksBase({ category });
