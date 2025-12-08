import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 24px 20px;
  box-sizing: border-box;
`;

export const MainInstructionText = styled.h2`
  font-family: 'Pretendard', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #352F36;
  margin: 0 0 8px 0;
  line-height: 1.5;
`;

export const SubInstructionText = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #868286;
  margin: 0 0 36px 0;
  line-height: 1.5;
`;

export const PartButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;

export const PartButton = styled.button<{ $isSelected?: boolean; $color?: string }>`
  padding: 6px 12px;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  
  ${props => props.$isSelected ? `
    background: ${props.$color || '#35CDFF'};
    color: #FAFAFA;
  ` : `
    background: #F0EFF1;
    color: #868286;
  `}
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 349px;
`;

