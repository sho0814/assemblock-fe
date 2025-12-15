import type { ReviewListItem } from "@types";

// 프로젝트별 리뷰 목록 mock
export const reviewsMock: Record<number, ReviewListItem[]> = {
  1: [
    {
      reviewId: 1,
      targetUserNickname: "안예영",
      targetUserProfileType: "Type_2",
      targetUserMainRole: "BACKEND",
      reviewContent: "good",
      projectName: "어셈블록 서비스 고도화",
      memberRole: "Backend",
    },
  ],
  2: [], // 아직 작성된 리뷰 없음
  3: [
    {
      reviewId: 2,
      targetUserNickname: "박지민",
      targetUserProfileType: "Type_3",
      targetUserMainRole: "DESIGN",
      reviewContent: "good",
      projectName: "블록 에디터 v2.0",
      memberRole: "Design",
    },
  ],
};
