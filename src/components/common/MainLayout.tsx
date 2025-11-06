// src/components/common/MainLayout.tsx
import { Outlet } from "react-router-dom"
import { Navigator } from "@components/common/Navigator"
import * as S from './MainLayout.styled';

export const MainLayout = () => {
  return (
    <S.LayoutContainer>
      <S.Content>
        <Outlet />
      </S.Content>
      <Navigator />
    </S.LayoutContainer>
  );
};
