import React from "react";
import styled from "styled-components";
import ProposalItem from "./ProposalItem";
import type { ProfileType } from "@types";

export type ProposalListItem = {
  projectId: number | string;
  proposalId: number | string;
  kind: "SENT" | "RECEIVED";
  topNickname: string;
  othersCount: number;
  topProfileType: ProfileType;
  state: "ONGOING" | "DONE";
};

type Props = {
  items: ProposalListItem[];
  sortByNicknameClient?: boolean;
};

const ListContainer = styled.ul`
  list-style: none;
  margin: 0;
  padding: 40px 0 40px 0;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export default function ProposalList({
  items,
  sortByNicknameClient = false,
}: Props) {
  const sortedItems = React.useMemo(() => {
    const clone = [...items];
    if (sortByNicknameClient) {
      clone.sort((a, b) => a.topNickname.localeCompare(b.topNickname, "ko"));
    }
    return clone;
  }, [items, sortByNicknameClient]);

  if (sortedItems.length === 0) return null;

  return (
    <ListContainer>
      {sortedItems.map((it) => (
        <ProposalItem
          key={it.proposalId}
          kind={it.kind}
          topNickname={it.topNickname}
          othersCount={it.othersCount}
          topProfileType={it.topProfileType}
          projectId={it.projectId}
          proposalId={it.proposalId}
        />
      ))}
    </ListContainer>
  );
}
