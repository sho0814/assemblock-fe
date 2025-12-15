import { authApi } from "./client";
import type { ReviewListItem, CreateReviewRequest } from "@types";

// 특정 프로젝트의 리뷰 목록 조회
export const getProjectReviews = async (
  projectId: number
): Promise<ReviewListItem[]> => {
  const response = await authApi.get<ReviewListItem[]>(
    `/reviews/project/${projectId}`
  );
  return response.data;
};

// 리뷰 작성
export const createReview = async (
  data: CreateReviewRequest
): Promise<void> => {
  await authApi.post("/reviews", data);
};
