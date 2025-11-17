// src/types/myTeamTypes.ts

export type ProjectStatus = "recruiting" | "ongoing" | "done";
export type ResponseStatus = "accepted" | "rejected" | "pending";

export type MemberRole = "Plan" | "Design" | "PM" | "FrontEnd" | "BackEnd";

export interface Member {
  id: number;
  name: string;
  role: MemberRole; // DB enum 그대로
  isLeader: boolean; // 팀장 여부
  responseStatus: ResponseStatus; // 수락/대기/거절
}

export interface MyTeamPageData {
  projectId: number;
  proposalId: number;

  status: ProjectStatus; // recruiting / ongoing / done

  recruitStartDate: string; // "2025-10-24"
  recruitEndDate: string; // "2025-10-27"
  dday: number; // D-6 같은 숫자, 없으면 프론트에서 계산해도 됨

  acceptedCount: number; // 수락 인원 (project_accpeted)
  totalCount: number; // 목표 인원 (project_recruit)

  contactMethod: string; // 예: "discord: aaa#1111"

  members: Member[];
}
