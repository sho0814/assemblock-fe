// src/components/myTeam/MemberItem.tsx
import styled from "styled-components";
import type { ReactNode } from "react";
import type { Member, ProjectStatus } from "@types";
import { getProfileImage } from "@constants";

const Item = styled.li`
  list-style: none;
  width: 100%;
  padding: 16px 18px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & + & {
    border-top: 1.5px solid var(--GrayScale-GR10, #f0eff1);
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 999px;
  object-fit: cover;
  background: #ddd;
`;

const NameRole = styled.div`
  display: flex;
  flex-direction: column;
`;

const Chip = styled.span<{
  variant: "leader" | "pending" | "rejected" | "accepted";
}>`
  height: 26px;
  width: 64px;
  padding: 4px 0;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 12px;
  font-weight: 500;

  background: ${({ variant }) => {
    switch (variant) {
      case "leader":
        return "#49444A";
      case "pending":
      case "rejected":
        return "#F0EFF1";
      case "accepted":
        return "#726D72";
      default:
        return "#F0EFF1";
    }
  }};

  color: ${({ variant }) => {
    switch (variant) {
      case "pending":
      case "rejected":
        return "#726D72";
      default:
        return "#FAFAFA";
    }
  }};
`;

type Props = {
  status: ProjectStatus;
  member: Member;
};

export const MemberItem = ({ status, member }: Props) => {
  let right: ReactNode = null;

  if (status === "recruiting") {
    if (member.leader) {
      right = <Chip variant="leader">팀장</Chip>;
    } else if (member.responseStatus === "pending") {
      right = <Chip variant="pending">대기 중</Chip>;
    } else if (member.responseStatus === "rejected") {
      right = <Chip variant="rejected">거절됨</Chip>;
    } else if (member.responseStatus === "accepted") {
      right = <Chip variant="accepted">수락 완료</Chip>;
    }
  } else if (status === "ongoing") {
    if (member.leader) {
      right = <Chip variant="leader">팀장</Chip>;
    }
  }

  return (
    <Item>
      <Left>
        <Avatar src={getProfileImage(member.profileType)} />
        <NameRole>
          <span style={{ fontSize: 16, color: "#000000", fontWeight: 600 }}>
            {member.nickname} 님
          </span>
          <span style={{ fontSize: 12, color: "#5D595E" }}>{member.part}</span>
        </NameRole>
      </Left>
      {right}
    </Item>
  );
};
