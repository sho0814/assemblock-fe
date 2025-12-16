import { authApi } from '../client';

// 타인 프로필 정보 조회 응답 타입
export interface UserProfileResponse {
  nickname: string; // 닉네임
  profileType: string; // 프로필 타입
  portfolioUrl?: string; // 포트폴리오 URL
  introduction?: string; // 한 줄 자기소개
  mainRoles: string[]; // 주 역할 목록
  portfolioPdfUrl?: string; // 포트폴리오 pdf URL
  reviewSentCnt: number; // 보낸 후기 수
  reviewReceivedCnt: number; // 받은 후기 수
}

// 타인 프로필 정보 조회
// GET /api/profiles/{userId}
export const getUserProfile = async (userId: number): Promise<UserProfileResponse> => {
  const response = await authApi.get(`/profiles/${userId}`);
  return response.data;
};

