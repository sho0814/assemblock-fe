import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavBar = styled.nav`
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-around;
  align-items: center;

  background: #FFFFFF;
  width: 100%;
  min-width: 375px;
  max-width: 400px;
  height: 99px;

  border-top: 1px solid #F0EFF1;
  border-radius: 20px 20px 0 0;
  z-index: 50;
`;

export const NavItem = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 55px;
  height: 43px;
  text-decoration: none;
`;

export const Icon = styled.img`
  width: 24px;
  height: 24px;
  align-items: center;
  margin-bottom: 4px;
`;

export const Label = styled.strong<{ $active?: boolean }>`
  font-size: 10px;
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  color: ${({ $active }) => ($active ? "#352F36" : "#868286")};
`;