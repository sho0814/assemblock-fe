// src/api/proposal.ts
import { authApi } from "./index";
import type { ProposalDetailResponse } from "@types";

export type ProposalResponseStatus = "ACCEPTED" | "REJECTED";

// 제안 응답 요청 타입
interface ProposalResponseRequest {
  responseStatus: ProposalResponseStatus;
}

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

  /**
   * 제안 응답 (수락/거절)
   * PATCH /api/proposals/{id}/response
   * @param proposalId - 제안 ID
   * @param responseStatus - 응답 상태 (ACCEPTED | REJECTED)
   */
  respondToProposal: async (
    proposalId: number,
    responseStatus: ProposalResponseStatus
  ): Promise<void> => {
    const requestBody: ProposalResponseRequest = {
      responseStatus,
    };
    await authApi.patch(`/proposals/${proposalId}/response`, requestBody);
  },
};
