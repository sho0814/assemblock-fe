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
      profileUrl: "Type_1",
      part: "FRONTEND",
      leader: true,
      responseStatus: "accepted",
    },
    {
      userId: 5,
      nickname: "안예영",
      profileUrl: "Type_1",
      part: "BACKEND",
      leader: false,
      responseStatus: "accepted",
    },
    {
      userId: 7,
      nickname: "이준호",
      profileUrl: "Type_1",
      part: "DESIGN",
      leader: false,
      responseStatus: "pending",
    },
    {
      userId: 9,
      nickname: "박서연",
      profileUrl: "Type_1",
      part: "FRONTEND",
      leader: false,
      responseStatus: "rejected",
    },
  ],
};

// 여러 프로젝트 mock (필요시)
export const projectDetailsMock: Record<number, ProjectDetailResponse> = {
  1: projectDetailMock,
  2: {
    projectId: 2,
    projectTitle: "AI 블록 추천 기능 개발",
    status: "done",
    recruitStartDate: "2025-11-15",
    recruitEndDate: "2025-12-15",
    contactMethod: "discord#5678",
    members: [
      {
        userId: 1,
        nickname: "김현수",
        profileUrl: "Type_1",
        part: "BACKEND",
        leader: true,
        responseStatus: "accepted",
      },
      {
        userId: 2,
        nickname: "짓수",
        profileUrl: "Type_1",
        part: "FRONTEND",
        leader: false,
        responseStatus: "accepted",
      },
    ],
  },
  3: {
    projectId: 3,
    projectTitle: "블록 에디터 v2.0",
    status: "done",
    recruitStartDate: "2025-10-01",
    recruitEndDate: "2025-11-30",
    contactMethod: "discord#9999",
    members: [
      {
        userId: 2,
        nickname: "짓수",
        profileUrl: "Type_1",
        part: "FRONTEND",
        leader: true,
        responseStatus: "accepted",
      },
      {
        userId: 3,
        nickname: "박지민",
        profileUrl: "Type_1",
        part: "DESIGN",
        leader: false,
        responseStatus: "accepted",
      },
    ],
  },
};
