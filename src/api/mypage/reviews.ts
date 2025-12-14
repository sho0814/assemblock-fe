import { authApi } from '../client';

// 후기 목록 조회 응답 타입
export interface MyReview {
  reviewId: number;
  targetUserNickname: string;
  targetUserProfileType: string;
  targetUserMainRole: string;
  reviewContent: string;
  projectName?: string;
  memberRole?: string;
}

//내 후기 목록 조회
export const getMyReviews = async (type: 'SCOUTING' | 'PARTICIPATION' = 'PARTICIPATION'): Promise<MyReview[]> => {
  const response = await authApi.get('/mypage/reviews', {
    params: { type },
  });
  return response.data;
};


