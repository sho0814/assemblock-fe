// src/components/myTeam/MemberList.tsx
import styled from "styled-components";
import type { Member, ProjectStatus } from "./MyTeamTypes";
import { MemberItem } from "./MemberItem";

const List = styled.ul`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

type Props = {
  status: ProjectStatus;
  members: Member[];
};

export const MemberList = ({ status, members }: Props) => {
  return (
    <List>
      {members.map((m) => (
        <MemberItem key={m.id} status={status} member={m} />
      ))}
    </List>
  );
};
