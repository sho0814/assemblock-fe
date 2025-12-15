import type { MemberPart, ProfileType } from "./project";

// 리뷰 평가 타입
export type ReviewRating = "good" | "notbad" | "disappoint";

// 리뷰 목록 아이템
export interface ReviewListItem {
  reviewId: number;
  targetUserNickname: string;
  targetUserProfileType: ProfileType;
  targetUserMainRole: MemberPart;
  reviewContent: string;
  projectName: string;
  memberRole: string;
}

// 리뷰 작성 요청
export interface CreateReviewRequest {
  projectId: number;
  reviewedUserId: number;
  rating: ReviewRating;
}
