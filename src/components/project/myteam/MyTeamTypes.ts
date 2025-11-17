// src/components/myTeam/MyTeamTypes.ts
export type ProjectStatus = "recruiting" | "ongoing" | "done";
export type ResponseStatus = "accepted" | "rejected" | "pending";

export interface Member {
  id: number;
  name: string;
  role: string;
  isLeader: boolean;
  responseStatus: ResponseStatus;
}

export interface MyTeamProject {
  id: number;
  status: ProjectStatus;
  recruitStartDate: string;
  recruitEndDate: string;
  acceptedCount: number;
  totalCount: number;
  contactMethod: string;
  members: Member[];
}
