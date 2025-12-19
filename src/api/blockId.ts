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

export const updateBlock = async (blockId: number, blockData: NewBlockData): Promise<void> => {
  // categoryName을 label에서 value로 변환 (백엔드가 value 형식을 기대)
  const categoryValue = getCategoryValue(blockData.categoryName);
  
  // createBlock과 동일한 형식: resultFile을 분리하고 dto에는 빈 문자열로 설정
  const { resultFile, ...dtoData } = blockData;
  
  // 더미 문자열이면 빈 문자열로 처리
  const fileBase64 = resultFile !== 'dummy-pdf-base64-string-for-testing' 
    ? resultFile 
    : '';
  
  // dto 생성: resultFile은 빈 문자열로 설정 (createBlock과 동일)
  const dto = {
    ...dtoData,
    categoryName: categoryValue,
    resultFile: "", // createBlock과 동일하게 빈 문자열
  };
  
  const formData = new FormData();
  
  // 블록 데이터를 dto라는 이름으로 JSON으로 묶기
  formData.append('dto', new Blob([JSON.stringify(dto)], { 
    type: 'application/json' 
  }));
  
  // 그 뒤에 file을 붙이기
  formData.append('file', fileBase64);
  
  // 디버깅: 전송되는 데이터 확인
  console.log('updateBlock - dto:', JSON.stringify(dto, null, 2));
  console.log('updateBlock - file 길이:', fileBase64.length);
  console.log('updateBlock - file이 빈 문자열인가?', fileBase64 === '');
  
  await authApi.put(`/blocks/${blockId}`, formData);
};

export const deleteBlock = async (blockId: number): Promise<void> => {
  await authApi.delete(`/blocks/${blockId}`);
};

