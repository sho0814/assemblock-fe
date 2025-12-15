import { authApi } from "./index";
import type { ProjectDetailResponse, ProjectListItem } from "@types";

/**
 * 진행 중인 프로젝트 목록 조회
 * GET /api/projects/ongoing
 */
export async function getOngoingProjects(): Promise<ProjectListItem[]> {
  const response = await authApi.get<ProjectListItem[]>("/projects/ongoing");
  return response.data;
}

/**
 * 완료된 프로젝트 목록 조회
 * GET /api/projects/complete
 */
export async function getCompleteProjects(): Promise<ProjectListItem[]> {
  const response = await authApi.get<ProjectListItem[]>("/projects/complete");
  return response.data;
}

/**
 * 프로젝트 내 팀 보기
 * GET /api/projects/{projectId}
 */
export const getProjectDetail = async (
  projectId: number
): Promise<ProjectDetailResponse> => {
  const response = await authApi.get<ProjectDetailResponse>(
    `/projects/${projectId}`
  );
  return response.data;
};

/**
 * 프로젝트 완료하기
 * PATCH /projects/${projectId}/complete
 */
export const completeProject = async (projectId: number): Promise<void> => {
  await authApi.patch(`/projects/${projectId}/complete`);
};
