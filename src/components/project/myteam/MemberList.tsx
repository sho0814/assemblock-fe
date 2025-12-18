// src/components/myTeam/MemberList.tsx
import styled from "styled-components";
import type { Member, ProjectStatus } from "@types";
import { MemberItem } from "./MemberItem";

const List = styled.ul`
  display: flex;
  flex-direction: column;

  padding: 8px 0 8px 0;

  background: var(--GrayScale-WT, #fafafa);
  border-radius: 20px;
  outline: 1.5px solid var(--GrayScale-GR10, #f0eff1);
  outline-offset: -1px;

  width: 100%;
  box-shadow: 0px 0px 19.4px #e7e7e8;
`;

type Props = {
  status: ProjectStatus;
  members: Member[];
};

export const MemberList = ({ status, members }: Props) => {
  return (
    <List>
      {members.map((m) => (
        <MemberItem key={m.userId} status={status} member={m} />
      ))}
    </List>
  );
};
