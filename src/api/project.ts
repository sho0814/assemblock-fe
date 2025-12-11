import { authApi } from "./index"; 
import type { ApiProject } from "@types";

/**
 * 내 프로젝트 목록 조회
 * GET /api/projects/me
 */

export const getMyProjects = async (): Promise<ApiProject[]> => {
  const res = await authApi.get("/projects/me");
  return res.data?.data ?? res.data;
};
