import styled from 'styled-components';

export const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
  width: 100%;
  max-width: 400px;
  margin: 24px auto;
  padding-top: 48px;
`;


export const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  cursor: pointer;
`;

export const BackIcon = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const HeaderTitle = styled.h2`
  color: var(--Primary-BK, #352F36);
  text-align: center;

  /* Head/H3 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 24px */
`;

export const MoreButtonWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
`;

export const MoreButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
`;

export const MoreIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export const MenuWrapper = styled.div`
  position: absolute;
  top: 32px;
  right: 0;
  z-index: 1000;
`;

export const DimBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.50);
  z-index: 999;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 335px;
  margin: 0 auto;
  padding: 0 0 36px;
`;


export const CategoryBreadcrumb = styled.div`
  font-size: 12px;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  color: #726D72;
  text-align: left;
  margin-bottom: 8px;
`;

export const BlockTitle = styled.h1`
  font-size: 20px;
  font-weight: 600;
  color: #352F36;
  text-align: left;
  margin: 0 0 12px 0;
  line-height: 1.5;
`;

export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  max-width: 375px;
  gap: 12px;
`;

export const ProfileImg = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 100%;
  background: #D9D9D9;
  flex: 0 0 64px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProfileRightColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-width: 0;
`;

export const ProfileUserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  flex-wrap: wrap;
  margin-bottom: 4px;
  
  strong {
    font-size: 14px;
    font-weight: 600;
    color: #352F36;
  }
`;

export const ProfilePartLabel = styled.span<{ $color?: string }>`
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

export const ProfileUserIntroduction = styled.div`
  align-self: stretch;
  color: #5A565B;
  font-size: 12px;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ProfileDivider = styled.div`
  display: flex;
  width: 335px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  background-color: #F0EFF1;
  height: 1px;
  margin: 24px 0;
`;

export const ProjectCard = styled.div`
  display: flex;
  width: 335px;
  padding: 16px 20px 24px 20px;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 16px;
  border: 1px solid #F0EFF1;
  background: #FAFAFA;
  box-shadow: 0 4px 4px 0 rgba(53, 47, 54, 0.10);
  gap: 16px;
`;

export const ProjectCardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #352F36;
  margin: 0;
`;

export const ProjectCardDescription = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #5A565B;
  line-height: 1.5;
  word-break: break-word;
`;

export const ProjectCardDivider = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  background-color: #F0EFF1;
  height: 1px;
`;

export const TechStackSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-self: stretch;
  width: 100%;
`;

export const TechStackLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #352F36;
`;

export const TechStackContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
`;

export const TechStackTag = styled.span`
  display: flex;
  padding: 6px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 30px;
  border-radius: 16px;
  background: #5D595E;
  color: #FAFAFA;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
`;

export const ContributionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-self: stretch;
  width: 100%;
`;

export const ContributionLabel = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: #352F36;
`;

export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: flex-start;
  margin-bottom: 8px;
`;

export const TypeTag = styled.span<{ $isIdea?: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 6px 16px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => props.$isIdea ? '#35CDFF' : '#FF6017'};
  color: #FAFAFA;
  white-space: nowrap;
`;

export const TechPartTag = styled.span<{ $color?: string }>`
  display: inline-flex;
  align-items: center;
  padding: 6px 16px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => props.$color || '#35CDFF'};
  color: #FAFAFA;
  white-space: nowrap;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 36px;
`;

export const SectionLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #352F36;
`;

export const SectionValue = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #5A565B;
  line-height: 150%;
  word-break: break-word;
`;

export const Link = styled.a`
  font-size: 14px;
  font-weight: 400;
  color: #352F36;
  text-decoration: underline;
  word-break: break-all;
  cursor: pointer;

  &:hover {
    color: #868286;
  }
`;

export const FileLink = styled.span`
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  color: ;
  cursor: pointer;

  &:hover {
    color: #868286;
  }
`;

export const EmptyMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  font-size: 16px;
  font-weight: 500;
  color: #868286;
`;

export const ProgressBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  align-self: stretch;
  width: 100%;
  height: 20px;
`;

export const ProgressSegment = styled.div<{ $isFilled: boolean; $isFirst: boolean; $isLast: boolean }>`
  flex: 1;
  height: 8px;
  background-color: ${props => props.$isFilled ? '#352F36' : '#F0EFF1'};
  border-radius: ${props => {
    if (props.$isFirst) return '50px 0 0 50px';
    if (props.$isLast) return '0 50px 50px 0';
    return '0';
  }};
`;

