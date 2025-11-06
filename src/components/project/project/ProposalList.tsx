import React, { useMemo } from "react";
import styled from "styled-components";
import ProposalItem from "./ProposalItem";

type Kind = "SENT" | "RECEIVED";
export type ProposalListItem = {
  proposalId: number | string;
  kind: Kind; // '보낸 제안' | '받은 제안'
  topNickname: string; // 가나다 순 가장 상단 사용자 닉네임
  othersCount: number; // topNickname 외 인원 수
  topProfileUrl?: string; // 프로필 이미지 URL
  onClickTeam: () => void; // "내 팀 보기"
  state?: "ONGOING" | "DONE";
};

type Props = {
  sentItems?: ProposalListItem[];
  receivedItems?: ProposalListItem[];
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
  /* 아이템 간격 8px */
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
  sentItems = [],
  receivedItems = [],
  sortByNicknameClient = false,
}: Props) {
  const items = useMemo(() => {
    const merged = [...sentItems, ...receivedItems];
    if (sortByNicknameClient) {
      merged.sort((a, b) => a.topNickname.localeCompare(b.topNickname, "ko"));
    }
    return merged;
  }, [sentItems, receivedItems, sortByNicknameClient]);

  if (items.length === 0) return null;

  return (
    <Card>
      {items.map((it, idx) => (
        <React.Fragment key={it.proposalId}>
          <ProposalItem
            kind={it.kind}
            topNickname={it.topNickname}
            othersCount={it.othersCount}
            topProfileUrl={it.topProfileUrl}
            onClickTeam={it.onClickTeam}
          />
          {idx !== items.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </Card>
  );
}
