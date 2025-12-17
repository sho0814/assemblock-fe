import { authApi } from "./index";

export type CreateBoardProposalRequest = {
  boardId: number;
  discordId: string;
  recruitStartDate: string; // YYYY-MM-DD
  recruitEndDate: string;   // YYYY-MM-DD
  projectTitle: string;
  projectMemo: string;
};

export type CreateBoardProposalResponse = {
  proposalId: number;
  proposerId?: number;
  proposerNickname?: string;
  createdAt?: string;
};

export const createBoardProposal = async (
  body: CreateBoardProposalRequest
): Promise<CreateBoardProposalResponse> => {
  const res = await authApi.post<CreateBoardProposalResponse>("/proposals", body);
  return res.data;
};
