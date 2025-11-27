// src/pages/home/category/NotificationPage.tsx
import SimpleHeader from "@components/shared/SimpleHeader";
import NotificationProposalItem from "@components/notification/NotificationProposalItem";
import styled from "styled-components";

import {
  MOCK_BLOCKS,
  MOCK_PROPOSAL_TARGETS,
  MOCK_PROPOSALS,
  MOCK_USERS,
  getMembersByProposalId,
} from "../../mocks/mockAssemblock";

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
`;

// TODO: 로그인 유저 id와 연결
const MY_USER_ID = 1;

const myBlockIds = MOCK_BLOCKS.filter((b) => b.user_id === MY_USER_ID).map(
  (b) => b.block_id
);

const receivedProposalIds = Array.from(
  new Set(
    MOCK_PROPOSAL_TARGETS.filter((t) =>
      myBlockIds.includes(t.proposalblock_id)
    ).map((t) => t.proposal_id)
  )
);

const receivedNotifications = receivedProposalIds
  .map((proposalId) => {
    const proposal = MOCK_PROPOSALS.find((p) => p.proposal_id === proposalId);
    if (!proposal) return null;

    const proposer = MOCK_USERS.find((u) => u.user_id === proposal.proposer_id);

    const members = getMembersByProposalId(proposalId);
    const othersCount = Math.max(members.length - 1, 0);

    return {
      proposalId,
      topNickname: proposer?.nickname ?? "알 수 없음",
      othersCount,
    };
  })
  .filter(Boolean) as {
  proposalId: number;
  topNickname: string;
  othersCount: number;
}[];

export function NotificationPage() {
  return (
    <>
      <SimpleHeader title={"알림"} />
      <List>
        {receivedNotifications.map((item) => (
          <NotificationProposalItem
            key={item.proposalId}
            topNickname={item.topNickname}
            othersCount={item.othersCount}
            proposalId={item.proposalId}
          />
        ))}
      </List>
    </>
  );
}
