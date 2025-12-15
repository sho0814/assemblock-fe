export type ProjectStatus = "recruiting" | "ongoing" | "done";

export type ProfileType = "Type_1" | "Type_2" | "Type_3" | "Type_4" | "Type_5";

export interface ApiProjectUser {
  id: number;
  nickname: string;
  profileType: ProfileType;
}

export interface ApiProposal {
  id: number;
  user: ApiProjectUser; // 제안 올린 사람
  projectTitle: string;
  projectMemo: string;
  discordId: string;
  recruitStartDate: string;
  recruitEndDate: string;
}

export interface ApiProjectMember {
  id: number;
  user: ApiProjectUser;
  memberRole: string;
  isProposer: boolean;
}

// /api/projects/me
export interface ApiProject {
  id: number;
  proposer: ApiProjectUser;
  projectStatus: ProjectStatus;
  proposal: ApiProposal;
  members: ApiProjectMember[];
}
