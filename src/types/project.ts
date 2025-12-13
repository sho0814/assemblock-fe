export type ProjectStatus = "recruiting" | "ongoing" | "done";

export type ProfileType = "Type_1" | "Type_2" | "Type_3" | "Type_4" | "Type_5";

export interface ProjectMember {
  userId: number;
  nickname: string;
  profileUrl: string;
  part: string;
  leader: boolean;
}

export interface ProjectListItem {
  projectId: number;
  projectTitle: string;
  status: ProjectStatus;
  members: ProjectMember[];
}

// ===== 기존 타입 (다른 곳에서 사용 중이면 유지) =====

// export interface ApiProjectUser {
//   id: number;
//   nickname: string;
//   profileType: ProfileType;
// }

// export interface ApiProposal {
//   id: number;
//   user: ApiProjectUser;
//   projectTitle: string;
//   projectMemo: string;
//   discordId: string;
//   recruitStartDate: string;
//   recruitEndDate: string;
// }

// export interface ApiProjectMember {
//   id: number;
//   user: ApiProjectUser;
//   memberRole: string;
//   leader: boolean;
// }

// export interface ApiProject {
//   id: number;
//   proposer: ApiProjectUser;
//   projectStatus: ProjectStatus;
//   proposal: ApiProposal;
//   members: ApiProjectMember[];
// }
