// src/mocks/project/myTeamMocks.ts
import type { MyTeamPageData } from "@components/project/myteam/MyTeamTypes";

export const MOCK_MY_TEAM_LIST: MyTeamPageData[] = [
  // 1) 모집 중
  {
    projectId: 1,
    proposalId: 10,
    status: "recruiting",

    recruitStartDate: "2025-11-17",
    recruitEndDate: "2025-11-27",
    dday: 6,

    acceptedCount: 2,
    totalCount: 5,
    contactMethod: "discord: kkimsxu#1234",

    members: [
      {
        id: 1,
        name: "송현서",
        role: "Design",
        isLeader: true,
        responseStatus: "accepted",
      },
      {
        id: 2,
        name: "정다운",
        role: "Plan",
        isLeader: false,
        responseStatus: "pending",
      },
      {
        id: 3,
        name: "설호",
        role: "FrontEnd",
        isLeader: false,
        responseStatus: "pending",
      },
      {
        id: 4,
        name: "국채원",
        role: "BackEnd",
        isLeader: false,
        responseStatus: "rejected",
      },
      {
        id: 5,
        name: "김예린",
        role: "PM",
        isLeader: false,
        responseStatus: "accepted",
      },
    ],
  },

  // 2) 진행 중
  {
    projectId: 2,
    proposalId: 11,
    status: "ongoing",

    recruitStartDate: "2025-09-01",
    recruitEndDate: "2025-09-05",
    dday: 0,

    acceptedCount: 5,
    totalCount: 5,
    contactMethod: "discord: team-happy#9999",

    members: [
      {
        id: 11,
        name: "김지수",
        role: "Design",
        isLeader: true,
        responseStatus: "accepted",
      },
      {
        id: 12,
        name: "홍길동",
        role: "Plan",
        isLeader: false,
        responseStatus: "accepted",
      },
      {
        id: 13,
        name: "안예영",
        role: "FrontEnd",
        isLeader: false,
        responseStatus: "accepted",
      },
      {
        id: 14,
        name: "김현준",
        role: "BackEnd",
        isLeader: false,
        responseStatus: "accepted",
      },
      {
        id: 15,
        name: "이가은",
        role: "PM",
        isLeader: false,
        responseStatus: "accepted",
      },
    ],
  },

  // 3) 완료됨
  {
    projectId: 3,
    proposalId: 12,
    status: "done",

    recruitStartDate: "2025-08-01",
    recruitEndDate: "2025-08-03",
    dday: 0,

    acceptedCount: 5,
    totalCount: 5,
    contactMethod: "discord: finished#2025",

    members: [
      {
        id: 21,
        name: "최윤형",
        role: "Design",
        isLeader: true,
        responseStatus: "accepted",
      },
      {
        id: 22,
        name: "백혜경",
        role: "Plan",
        isLeader: false,
        responseStatus: "accepted",
      },
      {
        id: 23,
        name: "오민수",
        role: "FrontEnd",
        isLeader: false,
        responseStatus: "accepted",
      },
      {
        id: 24,
        name: "장다원",
        role: "BackEnd",
        isLeader: false,
        responseStatus: "accepted",
      },
      {
        id: 25,
        name: "유서연",
        role: "PM",
        isLeader: false,
        responseStatus: "accepted",
      },
    ],
  },
];
