// src/components/myTeam/ReviewButton.tsx
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

const Button = styled.button`
  margin-top: 24px;
  width: 100%;
  padding: 12px 16px;
  border-radius: 999px;
  background: #333;
  color: #fff;
  font-size: 14px;
  border: none;
`;

export const ReviewButton = () => {
  const navigate = useNavigate();
  const { proposalId } = useParams<{ proposalId: string }>();

  const handleClick = () => {
    if (!proposalId) return;
    navigate(`/Project/team/${proposalId}/review`);
  };

  return <Button onClick={handleClick}>팀원 리뷰 남기러 가기</Button>;
};
