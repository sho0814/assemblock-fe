export interface KakaoUserJwt {
  accessToken: string;
  refreshToken: string;
  profileComplete: boolean;
}

export interface UserMe {
  userId: number;
  nickname: string;
  roles: string[];
  introduction: string | null;
  profileType: string;
  portfolioUrl: string | null;
  portfolioPdfUrl: string | null;
  reviewSentCnt: number;
  reviewReceivedCnt: number;
  isPublishing: boolean;
}
