// src/mocks/mockAssemblock.ts

export type MainRole = "Plan" | "Design" | "PM" | "FrontEnd" | "BackEnd";
export type ProfileType = "Type_1" | "Type_2" | "Type_3" | "Type_4" | "Type_5";

export interface User {
  user_id: number;
  nickname: string;
  email: string;
  main_role: MainRole[]; // SET in MySQL
  introduction?: string | null;
  profile_type: ProfileType;
  portfolio_url?: string | null;
  portfolio_pdf_url?: string | null;
  review_sent_cnt: number;
  review_received_cnt: number;
  created_at: string;
  updated_at: string;
  is_publishing: boolean;
}

export type BlockType = "TECHNOLOGY" | "IDEA";
export type TechPart = "FrontEnd" | "BackEnd" | "Design";

export interface Block {
  block_id: number;
  user_id: number; // FK -> User
  category_name?: string | null;
  tech_part?: TechPart | null;
  block_title: string;
  block_type: BlockType;
  contribution_score: number; // 0~10
  tools_text?: string | null;
  oneline_summary: string;
  improvement_point?: string | null;
  result_url?: string | null;
  result_file?: string | null;
  created_at: string;
}

export interface Proposal {
  proposal_id: number;
  proposer_id: number; // FK -> User
  discord_id: string;
  recruit_start_date: string; // yyyy-mm-dd
  recruit_end_date: string;
  created_at: string;
  project_title: string;
  project_memo: string;
}

export type ResponseStatus = "accepted" | "rejected" | "pending";

export interface ProposalTarget {
  proposal_id: number; // FK -> Proposal
  proposer_id: number; // FK -> User
  proposalblock_id: number; // FK -> Block
  response_status: ResponseStatus;
}

export type ProjectStatus = "recruiting" | "ongoing" | "done";

export interface Project {
  project_id: number;
  proposal_id: number; // FK -> Proposal (unique)
  proposer_id: number; // FK -> User
  project_status: ProjectStatus;
  created_at: string;
}

export interface ProjectMember {
  member_id: number;
  project_id: number; // FK -> Project
  proposal_id: number; // FK -> Proposal
  proposer_id: number; // FK -> User
  user_id: number; // FK -> User
  member_role: MainRole;
  is_proposer: boolean;
}

export type ReviewValue = "good" | "notbad" | "disappoint";

export interface Review {
  review_id: number;
  user_id: number; // reviewer FK -> User
  reviewed_id: number; // reviewed FK -> User
  project_id: number; // FK -> Project
  review: ReviewValue;
  created_at: string;
}

export interface Board {
  board_id: number;
  user_id: number; // FK -> User
  board_name: string;
  board_memo?: string | null;
  created_at: string;
}

export interface BoardBlock {
  connect_id: number;
  block_id: number; // FK -> Block
  board_id: number; // FK -> Board
  created_at: string;
}

export interface SearchHistory {
  history_id: number;
  user_id: number; // FK -> User
  keyword: string;
  created_at: string;
}

/** ------------------------
 *  Mock Data
 *  ------------------------ */

// 1) Users
export const MOCK_USERS: User[] = [
  {
    user_id: 1,
    nickname: "정다운",
    email: "dawoon@test.com",
    main_role: ["FrontEnd"],
    introduction: "사용자 경험을 좋아하는 FE 개발자",
    profile_type: "Type_2",
    portfolio_url: null,
    portfolio_pdf_url: null,
    review_sent_cnt: 2,
    review_received_cnt: 1,
    created_at: "2025-11-01T10:00:00",
    updated_at: "2025-11-20T09:10:00",
    is_publishing: true,
  },
  {
    user_id: 2,
    nickname: "송현서",
    email: "hyunseo@test.com",
    main_role: ["Plan", "PM"],
    introduction: "기획/PM 경험이 많은 팀원",
    profile_type: "Type_1",
    portfolio_url: "https://portfolio.com/hyunseo",
    portfolio_pdf_url: null,
    review_sent_cnt: 1,
    review_received_cnt: 2,
    created_at: "2025-11-03T09:30:00",
    updated_at: "2025-11-21T11:00:00",
    is_publishing: true,
  },
  {
    user_id: 3,
    nickname: "김지수",
    email: "jisu@test.com",
    main_role: ["BackEnd"],
    introduction: "API 설계 좋아하는 BE",
    profile_type: "Type_3",
    portfolio_url: null,
    portfolio_pdf_url: null,
    review_sent_cnt: 0,
    review_received_cnt: 0,
    created_at: "2025-11-05T14:00:00",
    updated_at: "2025-11-05T14:00:00",
    is_publishing: true,
  },
  {
    user_id: 4,
    nickname: "안예영",
    email: "yeyoung@test.com",
    main_role: ["Design"],
    introduction: "UI/UX 디자인 담당",
    profile_type: "Type_4",
    portfolio_url: null,
    portfolio_pdf_url: null,
    review_sent_cnt: 0,
    review_received_cnt: 0,
    created_at: "2025-11-06T10:00:00",
    updated_at: "2025-11-06T10:00:00",
    is_publishing: true,
  },
];

// 2) Blocks (User FK 일치)
export const MOCK_BLOCKS: Block[] = [
  {
    block_id: 11,
    user_id: 1,
    category_name: "API 연동",
    tech_part: "FrontEnd",
    block_title: "Axios 기반 공공데이터 API 연동",
    block_type: "TECHNOLOGY",
    contribution_score: 8,
    tools_text: "React, Axios",
    oneline_summary: "공공데이터를 받아와 리스트/상세로 시각화",
    improvement_point: "로딩/에러 UX 개선",
    result_url: "https://demo.com/block/11",
    result_file: null,
    created_at: "2025-11-10T12:00:00",
  },
  {
    block_id: 12,
    user_id: 2,
    category_name: "UXUI디자인",
    tech_part: "Design",
    block_title: "온보딩 플로우 개선 아이디어",
    block_type: "IDEA",
    contribution_score: 7,
    tools_text: "Figma",
    oneline_summary: "신규 사용자의 이탈을 줄이는 온보딩 흐름 설계",
    improvement_point: null,
    result_url: null,
    result_file: null,
    created_at: "2025-11-12T18:30:00",
  },
  // ✅ MOCK_BLOCKS 맨 아래에 추가
  {
    block_id: 13,
    user_id: 3, // 김지수(BackEnd)
    category_name: "백엔드",
    tech_part: "BackEnd",
    block_title: "로그인/권한 API 설계",
    block_type: "TECHNOLOGY",
    contribution_score: 9,
    tools_text: "NestJS, JWT",
    oneline_summary: "JWT 기반 인증/인가 플로우 구성",
    improvement_point: null,
    result_url: "https://demo.com/block/13",
    result_file: null,
    created_at: "2025-11-13T11:00:00",
  },
  {
    block_id: 14,
    user_id: 1, // 정다운(FrontEnd) — 받은 제안용
    category_name: "인터랙션/애니메이션",
    tech_part: "FrontEnd",
    block_title: "모션 기반 카드 UI",
    block_type: "TECHNOLOGY",
    contribution_score: 8,
    tools_text: "React, Framer Motion",
    oneline_summary: "상태 전환이 자연스러운 카드 인터랙션 구현",
    improvement_point: null,
    result_url: "https://demo.com/block/14",
    result_file: null,
    created_at: "2025-11-14T15:00:00",
  },
];

// 3) Proposals (proposer_id FK 일치)
export const MOCK_PROPOSALS: Proposal[] = [
  {
    proposal_id: 101,
    proposer_id: 2,
    discord_id: "hyunseo#1234",
    recruit_start_date: "2025-11-23",
    recruit_end_date: "2025-11-31",
    created_at: "2025-11-01T09:00:00",
    project_title: "어셈블록 웹 앱 개발",
    project_memo: "아이디어 블록 공유/조립 플랫폼",
  },
  // ✅ 내가 보낸 제안 (SENT) - 채용중
  {
    proposal_id: 102,
    proposer_id: 1,
    discord_id: "dawoon#0001",
    recruit_start_date: "2025-11-20",
    recruit_end_date: "2025-11-27",
    created_at: "2025-11-20T09:00:00",
    project_title: "리액트 UI 개선 프로젝트",
    project_memo: "기존 화면 UX 개선 + 컴포넌트 리팩토링",
  },
  // ✅ 남이 보낸 제안 (RECEIVED) - 완료
  {
    proposal_id: 103,
    proposer_id: 4,
    discord_id: "yeyoung#4444",
    recruit_start_date: "2025-11-05",
    recruit_end_date: "2025-11-12",
    created_at: "2025-11-05T10:00:00",
    project_title: "디자인 시스템 구축",
    project_memo: "공통 컴포넌트/토큰 정리 및 문서화",
  },
  // ✅ 내가 보낸 제안 (SENT) - 진행중
  {
    proposal_id: 104,
    proposer_id: 1,
    discord_id: "dawoon#0002",
    recruit_start_date: "2025-10-01",
    recruit_end_date: "2025-10-15",
    created_at: "2025-10-01T09:00:00",
    project_title: "디자인 시스템 개선 사이드 프로젝트",
    project_memo: "디자인 토큰 정리 + 공통 컴포넌트 리팩토링",
  },
  // ✅ 내가 보낸 제안 (SENT) - 완료
  {
    proposal_id: 105,
    proposer_id: 1,
    discord_id: "dawoon#0003",
    recruit_start_date: "2025-09-01",
    recruit_end_date: "2025-09-10",
    created_at: "2025-09-01T09:00:00",
    project_title: "FE 코딩 테스트 준비 스터디",
    project_memo: "알고리즘 + 프론트엔드 과제 스터디",
  },
  // ✅ 내가 받은 제안 (RECEIVED) - 채용중
  {
    proposal_id: 106,
    proposer_id: 3, // 김지수(BackEnd)가 제안자
    discord_id: "jisu#3333",
    recruit_start_date: "2025-11-22",
    recruit_end_date: "2025-11-30",
    created_at: "2025-11-22T10:00:00",
    project_title: "API 성능 튜닝 & 대시보드",
    project_memo: "백엔드 성능 개선 + FE 모니터링 대시보드",
  },
];

/// 4) Proposal_target (Proposal + Block FK 일치)
export const MOCK_PROPOSAL_TARGETS: ProposalTarget[] = [
  // proposal 101 (받은 제안 - 진행중)
  {
    proposal_id: 101,
    proposer_id: 2,
    proposalblock_id: 11, // 내 블록 (정다운)
    response_status: "accepted",
  },
  {
    proposal_id: 101,
    proposer_id: 2,
    proposalblock_id: 12,
    response_status: "accepted",
  },

  // proposal 102 (내가 보낸 제안 - 채용중)
  {
    proposal_id: 102,
    proposer_id: 1,
    proposalblock_id: 13, // 김지수 블록
    response_status: "pending",
  },
  {
    proposal_id: 102,
    proposer_id: 1,
    proposalblock_id: 12, // 송현서 블록
    response_status: "accepted",
  },

  // proposal 103 (받은 제안 - 완료)
  {
    proposal_id: 103,
    proposer_id: 4,
    proposalblock_id: 14, // 내 블록
    response_status: "accepted",
  },
  {
    proposal_id: 103,
    proposer_id: 4,
    proposalblock_id: 12,
    response_status: "accepted",
  },

  // proposal 104 (내가 보낸 제안 - 진행중)
  {
    proposal_id: 104,
    proposer_id: 1,
    proposalblock_id: 11, // 내 블록도 같이 쓰는 느낌
    response_status: "accepted",
  },
  {
    proposal_id: 104,
    proposer_id: 1,
    proposalblock_id: 13, // 김지수 블록
    response_status: "accepted",
  },

  // proposal 105 (내가 보낸 제안 - 완료)
  {
    proposal_id: 105,
    proposer_id: 1,
    proposalblock_id: 11,
    response_status: "accepted",
  },
  {
    proposal_id: 105,
    proposer_id: 1,
    proposalblock_id: 12,
    response_status: "accepted",
  },

  // proposal 106 (내가 받은 제안 - 채용중)
  {
    proposal_id: 106,
    proposer_id: 3, // 김지수 제안
    proposalblock_id: 14, // 내 블록 포함 → '받은 제안'
    response_status: "accepted",
  },
  {
    proposal_id: 106,
    proposer_id: 3,
    proposalblock_id: 13, // 본인 블록
    response_status: "pending",
  },
];
// 5) Project (proposal_id unique, FK 일치)
export const MOCK_PROJECTS: Project[] = [
  // ✅ 받은 제안 + 진행중
  {
    project_id: 201,
    proposal_id: 101,
    proposer_id: 2,
    project_status: "ongoing",
    created_at: "2025-11-09T10:00:00",
  },
  // ✅ 내가 보낸 제안 + 채용중
  {
    project_id: 202,
    proposal_id: 102,
    proposer_id: 1,
    project_status: "recruiting",
    created_at: "2025-11-20T10:00:00",
  },
  // ✅ 받은 제안 + 완료
  {
    project_id: 203,
    proposal_id: 103,
    proposer_id: 4,
    project_status: "done",
    created_at: "2025-11-13T09:00:00",
  },
  // ✅ 내가 보낸 제안 + 진행중
  {
    project_id: 204,
    proposal_id: 104,
    proposer_id: 1,
    project_status: "ongoing",
    created_at: "2025-10-05T09:00:00",
  },
  // ✅ 내가 보낸 제안 + 완료
  {
    project_id: 205,
    proposal_id: 105,
    proposer_id: 1,
    project_status: "done",
    created_at: "2025-09-15T09:00:00",
  },
  // ✅ 받은 제안 + 채용중
  {
    project_id: 206,
    proposal_id: 106,
    proposer_id: 3,
    project_status: "recruiting",
    created_at: "2025-11-23T10:00:00",
  },
];
// 6) Project_member (Project + Proposal + User FK 일치)
export const MOCK_PROJECT_MEMBERS: ProjectMember[] = [
  {
    member_id: 301,
    project_id: 201,
    proposal_id: 101,
    proposer_id: 2,
    user_id: 2,
    member_role: "PM",
    is_proposer: true,
  },
  {
    member_id: 302,
    project_id: 201,
    proposal_id: 101,
    proposer_id: 2,
    user_id: 1,
    member_role: "FrontEnd",
    is_proposer: false,
  },
  {
    member_id: 303,
    project_id: 201,
    proposal_id: 101,
    proposer_id: 2,
    user_id: 3,
    member_role: "BackEnd",
    is_proposer: false,
  },

  // project 202 (내가 보낸 제안 + 채용중)
  {
    member_id: 304,
    project_id: 202,
    proposal_id: 102,
    proposer_id: 1,
    user_id: 1,
    member_role: "FrontEnd",
    is_proposer: true,
  },
  {
    member_id: 305,
    project_id: 202,
    proposal_id: 102,
    proposer_id: 1,
    user_id: 2,
    member_role: "PM",
    is_proposer: false,
  },

  // project 203 (받은 제안 + 완료)
  {
    member_id: 306,
    project_id: 203,
    proposal_id: 103,
    proposer_id: 4,
    user_id: 4,
    member_role: "Design",
    is_proposer: true,
  },
  {
    member_id: 307,
    project_id: 203,
    proposal_id: 103,
    proposer_id: 4,
    user_id: 1,
    member_role: "FrontEnd",
    is_proposer: false,
  },
  {
    member_id: 308,
    project_id: 203,
    proposal_id: 103,
    proposer_id: 4,
    user_id: 2,
    member_role: "PM",
    is_proposer: false,
  },

  // 🔹 project 204 (내가 보낸 제안 + 진행중)
  {
    member_id: 309,
    project_id: 204,
    proposal_id: 104,
    proposer_id: 1,
    user_id: 1, // 나
    member_role: "FrontEnd",
    is_proposer: true,
  },
  {
    member_id: 310,
    project_id: 204,
    proposal_id: 104,
    proposer_id: 1,
    user_id: 2,
    member_role: "PM",
    is_proposer: false,
  },
  {
    member_id: 311,
    project_id: 204,
    proposal_id: 104,
    proposer_id: 1,
    user_id: 3,
    member_role: "BackEnd",
    is_proposer: false,
  },

  // 🔹 project 205 (내가 보낸 제안 + 완료)
  {
    member_id: 312,
    project_id: 205,
    proposal_id: 105,
    proposer_id: 1,
    user_id: 1,
    member_role: "FrontEnd",
    is_proposer: true,
  },
  {
    member_id: 313,
    project_id: 205,
    proposal_id: 105,
    proposer_id: 1,
    user_id: 2,
    member_role: "PM",
    is_proposer: false,
  },

  // 🔹 project 206 (받은 제안 + 채용중)
  {
    member_id: 314,
    project_id: 206,
    proposal_id: 106,
    proposer_id: 3,
    user_id: 3,
    member_role: "BackEnd",
    is_proposer: true,
  },
  {
    member_id: 315,
    project_id: 206,
    proposal_id: 106,
    proposer_id: 3,
    user_id: 1, // 나 (받은 제안 참여)
    member_role: "FrontEnd",
    is_proposer: false,
  },
  {
    member_id: 316,
    project_id: 206,
    proposal_id: 106,
    proposer_id: 3,
    user_id: 4,
    member_role: "Design",
    is_proposer: false,
  },
];

// 7) Reviews (User + Project FK 일치)
export const MOCK_REVIEWS: Review[] = [
  {
    review_id: 401,
    user_id: 2, // 송현서가
    reviewed_id: 1, // 정다운에게
    project_id: 201,
    review: "good",
    created_at: "2025-11-20T13:00:00",
  },
  {
    review_id: 402,
    user_id: 1, // 정다운이
    reviewed_id: 2, // 송현서에게
    project_id: 201,
    review: "notbad",
    created_at: "2025-11-20T14:00:00",
  },
];

// 8) Boards
export const MOCK_BOARDS: Board[] = [
  {
    board_id: 501,
    user_id: 1,
    board_name: "FE 참고 블록",
    board_memo: "프론트 구현 아이디어 모음",
    created_at: "2025-11-15T10:00:00",
  },
];

// 9) Board_Block (Board + Block FK 일치)
export const MOCK_BOARD_BLOCKS: BoardBlock[] = [
  {
    connect_id: 601,
    board_id: 501,
    block_id: 11,
    created_at: "2025-11-15T10:10:00",
  },
];

// 10) Search_History
export const MOCK_SEARCH_HISTORY: SearchHistory[] = [
  {
    history_id: 701,
    user_id: 1,
    keyword: "axios",
    created_at: "2025-11-16T12:00:00",
  },
  {
    history_id: 702,
    user_id: 1,
    keyword: "레이아웃 그리드",
    created_at: "2025-11-17T20:00:00",
  },
];

/** ------------------------
 *  Simple helpers (프론트 편의용)
 *  ------------------------ */

// 특정 proposal의 프로젝트 멤버 목록
export const getMembersByProposalId = (proposalId: number) => {
  const project = MOCK_PROJECTS.find((p) => p.proposal_id === proposalId);
  if (!project) return [];
  return MOCK_PROJECT_MEMBERS.filter(
    (m) => m.project_id === project.project_id
  ).map((m) => ({
    ...m,
    user: MOCK_USERS.find((u) => u.user_id === m.user_id)!,
  }));
};

// 특정 프로젝트에서 "내가 남겨야 할 리뷰 대상" 뽑기
export const getReviewTargets = (projectId: number, myUserId: number) => {
  const members = MOCK_PROJECT_MEMBERS.filter(
    (m) => m.project_id === projectId
  );
  return members
    .filter((m) => m.user_id !== myUserId)
    .map((m) => MOCK_USERS.find((u) => u.user_id === m.user_id)!);
};
