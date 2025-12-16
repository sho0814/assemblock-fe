import { authApi } from '../client';

// 프로필 정보 수정 요청 타입
// PUT /api/mypage/profile
export interface UpdateProfileRequest {
  nickname?: string; // 변경할 닉네임
  portfolioUrl?: string; // 변경할 포트폴리오 URL
  introduction?: string; // 변경할 자기소개
  mainRoles?: string[]; // 주 역할 목록 예: ["Plan"]
  profileType?: string; // 프로필 이미지 타입 예: "Type_1"
  portfolioPdfUrl?: string; // 변경할 pdf URL
}

// 프로필 정보 수정 응답 타입
export interface UpdateProfileResponse {
  nickname: string; // 닉네임
  profileType: string; // 프로필 타입
  portfolioUrl?: string; // 포트폴리오 URL
  introduction?: string; // 한 줄 자기소개
  mainRoles: string[]; // 주 역할 목록
  portfolioPdfUrl?: string; // 포트폴리오 pdf URL
  reviewSentCnt: number; // 보낸 후기 수
  reviewReceivedCnt: number; // 받은 후기 수
}

// 프로필 정보 타입 정의 (프론트엔드에서 사용)
export interface ProfileInfo {
  nickname: string;
  introduction?: string;
  selectedParts: string[]; // ['planning', 'design', 'frontend', 'backend', 'pm']
  portfolioUrl?: string;
  portfolioPdfUrl?: string;
  portfolioFileName?: string;
  profileType?: string;
}

// 내 프로필 정보 수정
// PUT /api/mypage/profile
export const updateMyProfile = async (profileData: UpdateProfileRequest): Promise<UpdateProfileResponse> => {
  const response = await authApi.put('/mypage/profile', profileData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};


