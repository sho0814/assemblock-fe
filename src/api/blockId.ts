import { authApi } from '@api';
import type { NewBlockData, BlockType } from '@types';
import { getCategoryValue } from '@utils/getCategoryLabel';

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
  writerId: number;
  writerNickname: string;
  writerProfileType: string;
  createdAt: string;
  updatedAt: string;
}


export const getBlockDetail = async (blockId: number): Promise<BlockDetailResponse> => {
  const response = await authApi.get(`/blocks/${blockId}`);
  return response.data;
};

export const updateBlock = async (blockId: number, blockData: NewBlockData, fileBase64: string): Promise<void> => {
  // categoryName을 label에서 value로 변환 (백엔드가 value 형식을 기대)
  const categoryValue = getCategoryValue(blockData.categoryName);
  
  // createBlock과 동일한 형식: blockData를 그대로 사용하되 categoryName만 변환하고 resultFile은 빈 문자열
  const dto = {
    ...blockData,
    categoryName: categoryValue,
    resultFile: "", // createBlock과 동일하게 빈 문자열
  };
  
  const formData = new FormData();
  
  formData.append('dto', new Blob([JSON.stringify(dto)], { 
    type: 'application/json' 
  }));
  
  formData.append('file', fileBase64);
  
  await authApi.put(`/blocks/${blockId}`, formData);
};

export const deleteBlock = async (blockId: number): Promise<void> => {
  await authApi.delete(`/blocks/${blockId}`);
};

