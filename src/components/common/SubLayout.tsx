// src/components/common/SubLayout.tsx
import { Outlet } from "react-router-dom"
import * as S from './SubLayout.styled'

export const SubLayout = () => {
    return (
        <S.LayoutContainer>
            <Outlet />
        </S.LayoutContainer>
    );
};