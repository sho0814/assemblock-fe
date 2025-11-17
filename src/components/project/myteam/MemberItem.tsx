// src/components/myTeam/MemberItem.tsx
import styled from "styled-components";
import type { Member, ProjectStatus } from "./MyTeamTypes";

const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border-radius: 12px;
  background: #ffffff;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 999px;
  background: #ddd;
`;

const NameRole = styled.div`
  display: flex;
  flex-direction: column;
`;

const Chip = styled.span`
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  background: #eee;
`;

const ReviewButton = styled.button`
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  border: none;
  background: #333;
  color: #fff;
`;

type Props = {
  status: ProjectStatus;
  member: Member;
};

export const MemberItem = ({ status, member }: Props) => {
  let right: React.ReactNode = null;

  if (status === "done") {
    // 완료 상태 → 리뷰 버튼 / 완료 라벨
    if (member.responseStatus === "accepted") {
      right = <ReviewButton>리뷰 남기기</ReviewButton>;
    } else {
      right = <Chip>작성 완료</Chip>;
    }
  } else {
    // recruiting / ongoing
    if (member.isLeader) {
      right = <Chip>팀장</Chip>;
    } else if (member.responseStatus === "pending") {
      right = <Chip>대기 중</Chip>;
    } else if (member.responseStatus === "rejected") {
      right = <Chip>거절됨</Chip>;
    } else if (member.responseStatus === "accepted") {
      right = <Chip>수락 완료</Chip>;
    }
  }

  return (
    <Item>
      <Left>
        <Avatar />
        <NameRole>
          <span>{member.name} 님</span>
          <span style={{ fontSize: 11, color: "#999" }}>{member.role}</span>
        </NameRole>
      </Left>
      {right}
    </Item>
  );
};
