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

export const updateBlock = async (blockId: number, blockData: NewBlockData): Promise<void> => {
  // 백엔드 형식에 맞게 dto와 file을 분리
  const { resultFile, ...dtoData } = blockData;
  
  const requestBody = {
    dto: {
      blockTitle: dtoData.blockTitle,
      categoryName: dtoData.categoryName,
      techPart: dtoData.techPart,
      blockType: dtoData.blockType,
      contributionScore: dtoData.contributionScore,
      toolsText: dtoData.toolsText,
      oneLineSummary: dtoData.oneLineSummary,
      improvementPoint: dtoData.improvementPoint,
      resultFileName: dtoData.resultFileName,
      resultUrl: dtoData.resultUrl,
      resultFile: resultFile, // dto 안에도 포함
    },
    file: resultFile !== 'dummy-pdf-base64-string-for-testing' ? resultFile : '', // file 필드에는 base64 문자열 또는 빈 문자열
  };
  
  await authApi.put(`/blocks/${blockId}`, requestBody, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const deleteBlock = async (blockId: number): Promise<void> => {
  await authApi.delete(`/blocks/${blockId}`);
};

