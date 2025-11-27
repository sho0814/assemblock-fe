// src/components/common/SubLayout.tsx
import { Outlet, useLocation } from "react-router-dom"
import * as S from './SubLayout.styled'

export const SubLayout = () => {
    const location = useLocation();
    const isCategoryDetail = location.pathname.startsWith("/category/")

    return (
        <S.LayoutContainer noPadding={isCategoryDetail}>
            <Outlet />
        </S.LayoutContainer>
    );
};