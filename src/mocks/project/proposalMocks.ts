// src/mocks/project/proposalMocks.ts

import type { ProposalListItem } from "@components/project/project/ProposalList";

// 진행 중 제안 (ONGOING)
export const mockOngoingProposals: ProposalListItem[] = [
  {
    proposalId: 1,
    projectId: 101,
    kind: "SENT",
    topNickname: "공룡",
    othersCount: 4,
    topProfileUrl: "",
    state: "ONGOING",
  },
  {
    proposalId: 5,
    projectId: 105,
    kind: "SENT",
    topNickname: "라라",
    othersCount: 1,
    topProfileUrl: "",
    state: "ONGOING",
  },
  {
    proposalId: 7,
    projectId: 107,
    kind: "SENT",
    topNickname: "민트",
    othersCount: 3,
    topProfileUrl: "",
    state: "ONGOING",
  },
];
// 완료된 제안 (DONE)
export const mockDoneProposals: ProposalListItem[] = [
  {
    proposalId: 3,
    projectId: 103,
    kind: "SENT",
    topNickname: "도도",
    othersCount: 2,
    topProfileUrl: "",
    state: "DONE",
  },
  {
    proposalId: 9,
    projectId: 109,
    kind: "SENT",
    topNickname: "제리",
    othersCount: 5,
    topProfileUrl: "",
    state: "DONE",
  },
];
