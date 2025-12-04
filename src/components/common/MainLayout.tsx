// src/components/common/MainLayout.tsx
import { Outlet, useLocation } from "react-router-dom"
import { Navigator } from "@components/common/Navigator"
import * as S from './MainLayout.styled';

export const MainLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/home';

  return (
    <S.LayoutContainer noPadding={isHome}>
      <S.Content>
        <Outlet />
      </S.Content>
      <Navigator />
    </S.LayoutContainer>
  );
};
