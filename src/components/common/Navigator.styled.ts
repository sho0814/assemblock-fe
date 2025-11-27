import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavBar = styled.nav`
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  padding: 16px 30px 32px 30px;

  background: #FFFFFF;
  width: 100%;
  height: 100px;

  border-top: 1px solid #F0EFF1;
  border-radius: 20px 20px 0 0;
  z-index: 50;
`;

export const NavItem = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 67px;
  height: 50px;
  padding: 12px 0;
  gap: 4px;
`;

export const Icon = styled.img`
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
`;

export const Label = styled.div<{ $active?: boolean }>`
  font-size: 10px;
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  color: ${({ $active }) => ($active ? "#352F36" : "#868286")};
`;