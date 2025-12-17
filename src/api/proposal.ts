// src/api/proposal.ts
import { authApi } from "./index";
import type { ProposalDetailResponse } from "@types";

export const proposalApi = {
  /**
   * 제안 상세 조회
   * GET /api/proposals/{id}
   * @param proposalId - 제안 ID
   * @returns 제안 상세 정보
   */
  getProposalDetail: async (
    proposalId: number
  ): Promise<ProposalDetailResponse> => {
    const response = await authApi.get<ProposalDetailResponse>(
      `/proposals/${proposalId}`
    );
    return response.data;
  },
};