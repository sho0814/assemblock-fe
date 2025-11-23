import styled from "styled-components";

export const ProfileSelectContainer = styled.div`
  min-width: 375px;
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
`;

export const HeaderBar = styled.div`
  position: relative;
  top: 0;
  min-height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  margin: 0 auto;
  opacity: 1;
`;

export const HeaderSlot = styled.div`
  display: flex;
  align-items: center;
  top: 0;
`;

export const CenterTextBox = styled.div`
  min-width: 70px;
  min-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #352F36;
  font-size: 16px;
  font-weight: 600;
  line-height: 150%;
`;

export const BackButton = styled.button`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px 20px;
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
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  padding: 0 20px;
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
  width: 335px;
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
`;
