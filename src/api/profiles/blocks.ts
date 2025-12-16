import { authApi } from '../client';

// 타인 블록 목록 조회 응답 타입
export interface UserBlock {
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

// 타인 블록 목록 조회
// GET /api/profiles/{userId}/blocks
// type: 'ALL' (기본값), 'TECHNOLOGY' (기술), 'IDEA' (아이디어)
export const getUserBlocks = async (
  userId: number,
  type: 'ALL' | 'TECHNOLOGY' | 'IDEA' = 'ALL'
): Promise<UserBlock[]> => {
  const response = await authApi.get(`/profiles/${userId}/blocks`, {
    params: { type },
  });
  return response.data;
};

