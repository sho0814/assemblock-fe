// src/components/common/Layout.tsx
import type { ReactNode } from "react";
import { LayoutContainer } from "./Layout.styled";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({
  children
}: LayoutProps) => {
  return (
    <LayoutContainer>
      {children}
    </LayoutContainer>
  );
};
