import { authApi } from "./index";
import type { ProjectListItem } from "@types";

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
