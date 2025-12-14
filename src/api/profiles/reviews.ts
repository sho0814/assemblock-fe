import { authApi } from '../client';

// 타인 리뷰 목록 조회 응답 타입
export interface UserReview {
  reviewId: number;
  targetUserNickname: string;
  targetUserProfileType: string;
  reviewContent: string;
  projectName: string;
  memberRole: string;
  targetUserMainRole: string;
}

// 타인 리뷰 목록 조회
// GET /api/profiles/{userId}/reviews
// type: 'SCOUTING' (해당 유저가 작성한 리뷰), 'PARTICIPATION' (해당 유저가 받은 리뷰)
export const getUserReviews = async (
  userId: number,
  type: 'SCOUTING' | 'PARTICIPATION'
): Promise<UserReview[]> => {
  const response = await authApi.get(`/profiles/${userId}/reviews`, {
    params: { type },
  });
  return response.data;
};

