import styled from 'styled-components';

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 120px;
  padding: 8px;
  border-radius: 16px;
  border: 1px solid #F0EFF1;
  background: #FAFAFA;
  box-shadow: 0 4px 4px 0 rgba(53, 47, 54, 0.10);
  gap: 4px;
`;

export const MenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #F0EFF1;
  }

  &:active {
    background-color: #E3E3E7;
  }
`;

export const Icon = styled.img`
  width: 18px;
  height: 18px;
  flex-shrink: 0;
`;

export const MenuText = styled.span`
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #352F36;
  line-height: 1.5;
`;

