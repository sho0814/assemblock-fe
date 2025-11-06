// src/components/project/ProjectHeader.styled.ts
import styled from "styled-components";

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
  padding: 16px 0px;
  background: none;
`;

export const Title = styled.strong`
  font-size: 24px;
  font-weight: 700;
  color: #49444a;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 144px;
  gap: 16px;
`;

export const Icon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
