import styled from "styled-components";

export const MyPageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const HeaderBar = styled.div`
  position: relative;
  top: 0;
  min-height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

export const Profile = styled.div`
  display: flex;
  align-items: center;
  max-width: 400px;
  gap: 20px;
`;

export const ProfileImg = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 100%;
  background: #D9D9D9;
  flex: 0 0 64px;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-width: 0;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  flex-wrap: wrap;
`;

export const PartLabel = styled.span<{ $color?: string }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  height: 23px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => props.$color || '#35CDFF'};
  color: #FAFAFA;
  white-space: nowrap;
`;

export const UserIntroduction = styled.div`
  align-self: stretch;
  color: #5A565B;
  font-size: 12px;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Portfolio = styled.div`
  display: flex;
  width: 100%;
  max-width: 335px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

export const PortfolioItem = styled.div<{ $isL500?: boolean }>`
  width: 100%;
  max-width: 335px;
  height: 21px;
  display: flex;
  align-items: center;
  ${props => props.$isL500 && `
    color: #868286;
  `}
`;

export const PortfolioFileLink = styled.span`
  color: inherit;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export const PortfolioDivider = styled.div`
  width: 100%;
  max-width: 335px;
  height: 1px;
  background: #F0EFF1;
  margin: 10px auto 0;
`;

export const Review = styled.div`
  display: flex;
  width: 100%;
  max-width: 335px;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 36px;
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  font-weight: 600;
`;

export const ReviewTabContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

export const ReviewTab = styled.div<{ $isActive?: boolean }>`
  display: flex;
  padding: 6px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 16px;
  background: ${props => props.$isActive ? '#352F36' : '#F0EFF1'};
  color: ${props => props.$isActive ? '#FAFAFA' : '#352F36'};
  font-size: 12px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
`;

export const ReviewBlock = styled.div`
  width: 100%;
  max-width: 335px;
  min-height: 255px;
  background: border-radius: 16px;
  background: var(--GrayScale-GR10, #F0EFF1);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
`;

export const ReviewBlockImage = styled.img`
  margin-bottom: 15px;
`;

export const ReviewBlockText = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 150%;
  color: #868286;
  text-align: center;
`;

export const ProfileEditButton = styled.button`
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
`;

export const MyBlock = styled.div`
  display: flex;
  width: 100%;
  max-width: 335px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  margin: 0 auto;
`;

export const MyBlockHeader = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  font-weight: 600;
  margin-top: 36px;
`;

export const BlockdivTab = styled.div`
  display: flex;
  gap: 8px;
`;

export const BlockTab = styled.div<{ $isActive?: boolean }>`
  display: flex;
  padding: 6px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 16px;
  background: ${props => props.$isActive ? '#352F36' : '#F0EFF1'};
  color: ${props => props.$isActive ? '#FAFAFA' : '#352F36'};
  font-size: 12px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
`;

export const BlockListWrapper = styled.div`
  width: 100%;
  margin-top: 24px;
  max-width: 335px;
  min-height: auto;
`;

export const BlockContent = styled.div`
  width: 100%;
  max-width: 335px;
  min-height: 255px;
  background: border-radius: 16px;
  background: var(--GrayScale-WT, #FAFAFA);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const BlockContentImage = styled.img`
  margin-bottom: 21px;
`;

export const BlockContentText = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 150%;
  color: var(--GrayScale-GR30, #C2C1C3);
  text-align: center;
`;

