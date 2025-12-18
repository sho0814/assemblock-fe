import styled from "styled-components";

export const ProfileSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px 0;
  width: 100%;
  box-sizing: border-box;
  position: relative;
`;

export const MainText = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #352F36;
  line-height: 1.5;
  display: block;
`;

export const SubText = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #868286;
  line-height: 1.5;
  display: block;
`;

export const ProfileGrid = styled.div`
  display: grid;
  width: 100%;
  max-width: 335px;
  height: 434px;
  margin: 0 20px;
  row-gap: 12px;
  column-gap: 4px;
  flex-shrink: 0;
  grid-template-rows: repeat(3, minmax(0, 1fr));
  grid-template-columns: repeat(2, minmax(0, 1fr));
  box-sizing: border-box;
  padding: 0;
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
`;

export const ProfileImage = styled.img`
  width: 130px;
  height: 130px;
  object-fit: cover;
  pointer-events: none;
  display: block;
`;

export const ProfileSVG = styled.svg`
  width: 130px;
  height: 130px;
  pointer-events: none;
  display: block;
`;

export const ProfilePlaceholder = styled.div`
  border-radius: 16px;
  aspect-ratio: 1 / 1;
  background: transparent;
`;

export const ConfirmBtn = styled.button`
  display: flex;
  width: 100%;
  max-width: 335px;
  padding: 12px 10px;
  justify-content: center;
  align-items: center;
  gap: 32px;
  border-radius: 16px;
  background: var(--Primary-BK, #352F36);
  margin: 32px auto 24px;
  color: #FAFAFA;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  box-sizing: border-box;
`;
