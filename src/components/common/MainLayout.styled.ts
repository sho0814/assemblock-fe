// src/components/common/Layout.styled.ts
import styled from "styled-components";

export const LayoutContainer = styled.div`
  min-width: 375px;
  max-width: 400px;
  height: 100vh;
  background: #FAFAFA;
  padding-top: 48px;
  padding-left: 20px;
  padding-right: 20px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const Content = styled.div`
  flex: 1;              // 남은 공간 모두 차지
  overflow-y: auto;
  padding-bottom: 99px;
`;