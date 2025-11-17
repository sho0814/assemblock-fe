import React from "react";
import styled from "styled-components";
import ProposalItem from "./ProposalItem";

export type ProposalListItem = {
  projectId: number | string;
  proposalId: number | string;
  kind: "SENT" | "RECEIVED";
  topNickname: string;
  othersCount: number;
  topProfileUrl?: string;
  state: "ONGOING" | "DONE";
};

type Props = {
  items: ProposalListItem[];
  sortByNicknameClient?: boolean;
};

const Card = styled.ul`
  list-style: none;
  width: 335px;
  padding: 8px 0;
  background: #fafafa;
  border: 1.2px solid var(--GrayScale-GR10, #efedef);
  border-radius: 20px;
  margin: 0 auto;

  & > li + li {
    margin-top: 8px;
  }
`;

const Divider = styled.hr`
  margin: 8px auto;
  width: 300px;
  border: 0;
  border-top: 1.2px solid var(--GrayScale-GR10, #efedef);
`;

export default function ProposalList({
  items,
  sortByNicknameClient = false,
}: Props) {
  // 정렬 옵션 (선택)
  const sortedItems = React.useMemo(() => {
    const clone = [...items];
    if (sortByNicknameClient) {
      clone.sort((a, b) => a.topNickname.localeCompare(b.topNickname, "ko"));
    }
    return clone;
  }, [items, sortByNicknameClient]);

  if (sortedItems.length === 0) return null;

  return (
    <Card>
      {sortedItems.map((it, idx) => (
        <React.Fragment key={it.proposalId}>
          <ProposalItem
            kind={it.kind}
            topNickname={it.topNickname}
            othersCount={it.othersCount}
            topProfileUrl={it.topProfileUrl}
            projectId={it.projectId}
            proposalId={it.proposalId}
          />
          {idx !== sortedItems.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </Card>
  );
}
