import styled from "styled-components";

export const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-bottom: 56px;
`;

export const HeaderBar = styled.div`
  position: relative;
  top: 0;
  min-height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderSlot = styled.div`
  display: flex;
  align-items: center;
`;

export const CenterTextBox = styled.div`
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
  width: 100%;
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
  padding: 4px 8px;
  height: 23px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 500;
  background: ${props => props.$color || '#35CDFF'};
  color: #FAFAFA;
  white-space: nowrap;
`;

export const UserIntroduction = styled.div`
  margin-top: 2px;
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
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

export const PortfolioItem = styled.div<{ $isL500?: boolean }>`
  width: 100%;
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
  height: 1px;
  background: #F0EFF1;
  margin-bottom: 24px;
`;

export const Review = styled.div`
  display: flex;
  width: 100%;
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

export const ReviewBlock = styled.div<{ $hasReviews?: boolean; $patternImage?: string }>`
  width: 100%;
  min-height: 255px;
  border-radius: 16px;
  background: ${props => props.$hasReviews && props.$patternImage
    ? `url(${props.$patternImage}), var(--GrayScale-GR10, #F0EFF1)`
    : 'var(--GrayScale-GR10, #F0EFF1)'};
  background-repeat: ${props => props.$hasReviews ? 'repeat' : 'no-repeat'};
  background-size: ${props => props.$hasReviews ? 'auto, cover' : 'cover'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
`;


export const ReviewGridContainer = styled.div<{ $hasReviews?: boolean; $patternImage?: string }>`
  width: 335px;
  height: 275px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 0;
  margin-top: 24px;
  border-radius: 16px;
  background: ${props => props.$hasReviews && props.$patternImage
    ? `url(${props.$patternImage}), var(--GrayScale-GR10, #F0EFF1)`
    : 'var(--GrayScale-GR10, #F0EFF1)'};
  background-repeat: ${props => props.$hasReviews ? 'repeat' : 'no-repeat'};
  background-size: ${props => props.$hasReviews ? 'auto, cover' : 'cover'};
  padding: 8px;
  box-sizing: border-box;
  position: relative;
`;

export const ReviewGridCell = styled.div<{ $col: number; $row: number }>`
  width: 60px;
  height: 60px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;


export const ReviewGridBlock = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
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

export const MyBlock = styled.div`
  display: flex;
  width: 100%;
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
  min-height: auto;
`;

export const BlockContent = styled.div`
  width: 100%;
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