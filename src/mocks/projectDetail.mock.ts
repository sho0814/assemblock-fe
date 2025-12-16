import type { ProjectDetailResponse } from "@types";

export const projectDetailMock: ProjectDetailResponse = {
  projectId: 1,
  projectTitle: "어셈블록 서비스 고도화",
  status: "done",
  recruitStartDate: "2025-12-01",
  recruitEndDate: "2025-12-20",
  contactMethod: "discord#1234",
  members: [
    {
      userId: 2,
      nickname: "짓수",
      profileType: "Type_1",
      part: "FRONTEND",
      leader: true,
      responseStatus: "accepted",
    },
    {
      userId: 5,
      nickname: "안예영",
      profileType: "Type_1",
      part: "BACKEND",
      leader: false,
      responseStatus: "accepted",
    },
  ],
};
