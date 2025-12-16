import { authApi } from '../client';

// /api/users/me 응답 타입 (백엔드 응답)
export interface UserMeResponse {
  userId: number; // 사용자 고유 ID
  nickname: string; // 닉네임
  roles: string[]; // 주 역할 리스트 (중복 가능) 예: ["FRONTEND", "PM"]
  introduction?: string; // 한 줄 소개
  profileType: string; // 프로필 이미지 타입 (예: "Type_1")
  portfolioUrl?: string; // 포트폴리오 URL
  portfolioPdfUrl?: string | null; // 포트폴리오 PDF URL (nullable)
  reviewSentCnt: number; // 보낸 리뷰 수
  reviewReceivedCnt: number; // 받은 리뷰 수
  isPublishing: boolean; // 공개 여부
}

// 내 프로필 정보 조회
export const getMyProfile = async (): Promise<UserMeResponse> => {
  const response = await authApi.get('/users/me');
  return response.data;
};

