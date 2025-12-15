import { authApi } from '@api';
import type { NewBlockData, BlockType } from '@types';

export interface UserResponseDto {
  userId: number;
  nickname: string;
  roles: string[];
  reviewSentCnt: number;
  reviewReceivedCnt: number;
  isPublishing: boolean;
}

export interface BlockDetailResponse {
  blockId: number;
  user: UserResponseDto;
  blockTitle: string;
  categoryName: string;
  techPart: string | null;
  blockType: BlockType;
  contributionScore: number;
  toolsText: string | null;
  oneLineSummary: string;
  improvementPoint: string | null;
  resultUrl: string | null;
  resultFile: string | null;
}


export const getBlockDetail = async (blockId: number): Promise<BlockDetailResponse> => {
  const response = await authApi.get(`/blocks/${blockId}`);
  return response.data;
};

export const updateBlock = async (blockId: number, blockData: NewBlockData): Promise<void> => {
  await authApi.put(`/blocks/${blockId}`, blockData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const deleteBlock = async (blockId: number): Promise<void> => {
  await authApi.delete(`/blocks/${blockId}`);
};

