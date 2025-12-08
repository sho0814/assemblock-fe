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

export const ProfileGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, minmax(0, 1fr));
  row-gap: 12px;
  column-gap: 4px;
  margin-bottom: 349px;
`;

export const ProfileItem = styled.button<{ $selected?: boolean }>`
  border: none;
  padding: 0;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  outline: none;
  position: relative;
  aspect-ratio: 1 / 1;
  background: transparent;
  width: 130px;
  height: 130px;
  justify-self: center;
`;

export const ProfileImage = styled.img`
  width: 130px;
  height: 130px;
  object-fit: cover;
  pointer-events: none;
  display: block;
`;

export const ProfilePlaceholder = styled.div`
  border-radius: 16px;
  aspect-ratio: 1 / 1;
  background: transparent;
  width: 130px;
  height: 130px;
  justify-self: center;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

