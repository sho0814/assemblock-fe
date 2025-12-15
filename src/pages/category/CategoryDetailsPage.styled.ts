import styled from "styled-components";

export const ScrollNav = styled.nav`
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  height: 44px;
  gap: 8px;
  padding: 0 4px;
  border-bottom: 1.5px solid #F0EFF1;
  background: none;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }
`;

// 각 탭 버튼 스타일
export const NavTab = styled.button<{ selected: boolean }>`
  flex: 0 0 auto;
  background: none;
  border: none;
  padding: 8px 20px 12px 20px;
  font-size: 16px;
  font-weight: 600;
  color: ${({ selected }) => (selected ? "#352F36" : "#868286")};
  border-bottom: 1.5px solid ${({ selected }) => (selected ? "#352F36" : "transparent")};
  cursor: pointer;
  transition: border-color 0.15s;
`;

export const CarouselWrapper = styled.div`
  overflow-x: auto;
  flex-grow: 1;
  margin-top: 25%;
  &::-webkit-scrollbar {
    display: none;
  }
`