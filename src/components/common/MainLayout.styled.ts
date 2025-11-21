// src/components/common/Layout.styled.ts
import styled from "styled-components";

export const LayoutContainer = styled.div<{ noPadding?: boolean }>`
  min-width: 375px;
  max-width: 400px;
  height: 100vh;
  background: #FAFAFA;
  padding-top: 48px;
  padding-left: ${({ noPadding }) => (noPadding ? '0' : '20px')};
  padding-right: ${({ noPadding }) => (noPadding ? '0' : '20px')};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const Content = styled.div`
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  padding-bottom: 99px;
`;