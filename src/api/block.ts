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

// 블록 상세 조회 응답 타입
export interface BlockDetailUser {
  userId: number;
  nickname: string;
  roles: string[];
  reviewSentCnt: number;
  reviewReceivedCnt: number;
  isPublishing: boolean;
}

export interface BlockDetailResponse {
  blockId: number;
  user: BlockDetailUser;
  blockTitle: string;
  categoryName: string;
  techPart: string;
  blockType: 'TECHNOLOGY' | 'IDEA';
  contributionScore: number;
  toolsText: string;
  oneLineSummary: string;
  improvementPoint: string;
  resultUrl: string;
  resultFile: string;
}

// 블록 상세 조회
export const getBlockDetail = async (blockId: number): Promise<BlockDetailResponse> => {
  const response = await authApi.get(`/blocks/${blockId}`);
  return response.data;
};

// 블록 수정
export const updateBlock = async (blockId: number, blockData: NewBlockData): Promise<BlockDetailResponse> => {
  const response = await authApi.put(`/blocks/${blockId}`, blockData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

// 블록 삭제
export const deleteBlock = async (blockId: number): Promise<void> => {
  await authApi.delete(`/blocks/${blockId}`);
};

