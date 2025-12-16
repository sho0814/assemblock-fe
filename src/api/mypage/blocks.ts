import { authApi } from '../client';

// 블록 목록 조회 응답 타입
export interface MyBlock {
  blockId: number;
  blockTitle: string;
  categoryName: string;
  blockType: 'TECHNOLOGY' | 'IDEA';
  contributionScore: number;
  toolsText: string;
  oneLineSummary: string;
  techPart: string;
  improvementPoint: string;
  resultUrl: string;
  resultFile: string;
  writerId: number;
  writerNickname: string;
  writerProfileType: string;
  createdAt: string;
  updatedAt: string;
}

//내 블록 목록 조회
export const getMyBlocks = async (type: 'ALL' | 'TECHNOLOGY' | 'IDEA' = 'ALL'): Promise<MyBlock[]> => {
  const response = await authApi.get('/mypage/blocks', {
    params: { type },
  });
  return response.data;
};

