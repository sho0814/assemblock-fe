import { authApi } from "./client";
import type { UserMe } from "@types";

export const getUserMe = async (): Promise<UserMe> => {
  const response = await authApi.get<UserMe>("/users/me");
  return response.data;
};
