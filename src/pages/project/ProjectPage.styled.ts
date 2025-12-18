// src/pages/project/ProjectPage.styled.ts
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

export const TabContainer = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 11px;
  width: 100%;
  padding: 5px;
  background: var(--GrayScale-GR10, #f0eff1);
  border-radius: 20px;
`;

export const Tab = styled.button<{ active: boolean }>`
  width: 100%;
  height: 35px;
  border: none;
  border-radius: 16px;
  background-color: ${({ active }) => (active ? "#352F36" : "transparent")};
  color: ${({ active }) => (active ? "#FFFFFF" : "#A5A1A6")};
  font-size: 14px;
  font-weight: 500;
  line-height: 150%;
  cursor: pointer;
  transition: all 0.2s ease;

  &:not(:last-child) {
    margin-right: 11px;
  }

  &:hover {
    opacity: 0.9;
  }
`;

export const EmptyMessage = styled.div`
  margin-top: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
  color: #999;
  font-size: 16px;
`;
