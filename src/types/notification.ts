// src/types/notification.ts

import type { ProfileType } from "./project";

export interface notification {
  proposalId: number;
  senderName: string;
  senderProfileType: ProfileType;
  content?: string;
}
