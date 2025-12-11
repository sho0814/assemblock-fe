// src/pages/project/MyTeamPage.styled.ts
import styled from "styled-components";
import pattern from "@assets/project/pattern.png";

export const Page = styled.div`
  min-height: 100vh;
  background-color: #f9f9fb;
  background-image: url(${pattern});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top center;
`;

export const HeaderWrapper = styled.section`
  width: 100%;
  margin-top: 38px;
  margin-bottom: 36px;
  text-align: center;
`;

export const HeaderTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  white-space: pre-line;
`;

export const HeaderSub = styled.p`
  margin-top: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--GrayScale-GR90, #49444a);
  white-space: pre-line;
`;

export const Counter = styled.p`
  margin-top: 24px;
  font-size: 12px;
  font-weight: 600;
  color: var(--GrayScale-GR80, #5d595e);
  text-align: right;
  padding-right: 12px;
`;

export const ActionButton = styled.button`
  margin-top: 100px;
  width: 100%;
  padding: 12px 16px;
  border-radius: 16px;
  background: #333;
  color: #fff;
  font-size: 14px;
  border: none;
  cursor: pointer;

  &:active {
    transform: translateY(1px);
    opacity: 0.95;
  }
`;
