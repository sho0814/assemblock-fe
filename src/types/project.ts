export type ProjectStatus = "recruiting" | "ongoing" | "done";

export type ProfileType = "Type_1" | "Type_2" | "Type_3" | "Type_4" | "Type_5";

export type MemberPart = "FRONTEND" | "BACKEND" | "DESIGN" | "PLAN" | "PM";

export type ResponseStatus = "pending" | "accepted" | "rejected";

export interface Member {
  userId: number;
  nickname: string;
  profileType: ProfileType;
  part: string;
  leader: boolean;
  responseStatus: ResponseStatus;
}

export interface ProjectListItem {
  projectId: number;
  projectTitle: string;
  status: ProjectStatus;
  members: Member[];
}

export interface ProjectDetailResponse {
  projectId: number;
  projectTitle: string;
  status: ProjectStatus;
  recruitStartDate: string;
  recruitEndDate: string;
  contact: string;
  members: Member[];
}
