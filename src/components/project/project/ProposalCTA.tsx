import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

type Props = {
  to?: string; // 이동 경로 (기본값 "/Home")
  label?: string; // 버튼 라벨 (기본값 "나도 제안 보내러 가기")
  className?: string; // 필요하면 외부에서 여백 제어용
};

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 192px;
  height: 45px;
  padding: 12px 10px;
  margin: 80px auto 0;
  border: none;
  border-radius: 16px;
  background: #352f36;
  color: #fafafa;
  font-size: 14px;
  font-weight: 500;
  line-height: 150%;

  cursor: pointer;
`;

export default function ProposalCTA({
  to = "/Home",
  label = "나도 제안 보내러 가기",
  className,
}: Props) {
  const navigate = useNavigate();
  return (
    <Button
      className={className}
      onClick={() => navigate(to)}
      aria-label={label}
    >
      {label}
    </Button>
  );
}
