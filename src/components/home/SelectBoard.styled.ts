// src/components/home/SelectBoard.styled.ts
import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 10px 20px 40px;
  background: #FAFAFA;
  border-radius: 24px 24px 0 0;
  gap: 7px;
`;

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  height: 68px;
  border-bottom: 0.5px solid #fafafa8f;
`;

export const Title = styled.span`
  font-weight: 600;
  font-size: 16px;
`;

export const CloseBtn = styled.img`
  width: 12px;
  background: transparent;
  border: none;
  cursor: pointer;
`;

export const BoardList = styled.ul`
  height: 180px;
  padding: 0;
  list-style: none;
  gap: 4px;
  overflow-y: auto;
`;

export const BoardItem = styled.li<{ selected: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  height: 45px;
  cursor: pointer;
  border-radius: 16px;
`;

export const BoardName = styled.span`
  font-weight: 500;
  font-size: 14px;
  flex: 1;
`;

export const AddBoardBox = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #49444A;
  border-radius: 16px;
  padding: 12px 20px;
  margin-top: 7px;
  margin-bottom: 20px;
  background-color: #F0EFF1;
`;

export const AddBoardInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-weight: 500; 
  font-size: 14px;
  background: transparent;
`;

export const AddBoardBtn = styled.button`
  position: relative;
  left: 8px;
  font-size: 22px;
  background: none;
  border: none;
  cursor: pointer;
  color: #726D72;
`;

export const BottomBtn = styled.button`
  width: 100%;
  background: #352F36;
  color: #FAFAFA;
  border: none;
  border-radius: 16px;
  padding: 12px 10px;
  font-size: 14px;
  font-weight: 500;
`;

export const Divider = styled.div`
  width: 100%;
  height: 2px;
  background: #f3f3f3;
`;
