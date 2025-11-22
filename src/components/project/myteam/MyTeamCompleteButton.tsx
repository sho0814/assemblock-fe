// src/components/project/myteam/MyTeamCompleteButton.tsx

import styled from "styled-components";
import type { ProjectStatus } from "@components/project/myteam/MyTeamTypes";

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 24px 0 20px;
`;

const CompleteBtn = styled.button`
  padding: 12px 28px;
  background: #2f2a31;
  color: #fff;
  border: none;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  &:active {
    transform: translateY(1px);
    opacity: 0.95;
  }
`;

type Props = {
  status: ProjectStatus;
  isProposer: boolean;
  onClick?: () => void;
};

export const MyTeamCompleteButton = ({
  status,
  isProposer,
  onClick,
}: Props) => {
  if (status !== "ongoing") return null;
  if (!isProposer) return null;

  return (
    <ButtonWrapper>
      <CompleteBtn onClick={onClick}>프로젝트 완료하기</CompleteBtn>
    </ButtonWrapper>
  );
};
