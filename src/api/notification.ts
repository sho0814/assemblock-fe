// src/api/notification.ts

import type { notification } from "@types";
import { authApi } from "./index";

/**
 * 알림 목록 조회
 * GET /api/notifications
 */
export async function getNotifications(): Promise<notification[]> {
  const response = await authApi.get<notification[]>("/notifications");
  return response.data;
}
