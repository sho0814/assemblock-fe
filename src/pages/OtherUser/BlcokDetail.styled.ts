import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const CategoryBreadcrumb = styled.div`
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 500;
  line-height: 150%;
  color: #726D72;
  text-align: left;
  margin-bottom: 8px;
`;

export const BlockTitle = styled.h1`
  font-family: Pretendard;
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
  width: 100%;
  gap: 12px;
`;

export const ProfileImg = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 100%;
  background: #D9D9D9;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProfileRightColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
`;

export const ProfileUserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  
  strong {
    font-size: 14px;
    font-weight: 600;
    color: #352F36;
  }
`;

export const ProfileUserIntroduction = styled.div`
  color: #5A565B;
  font-size: 12px;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ProfileDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #F0EFF1;
  margin: 24px 0;
`;

export const ProjectCard = styled.div`
  display: flex;
  width: 100%;
  padding: 16px 20px 24px 20px;
  box-sizing: border-box; 
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
  width: 100%;
  height: 1px;
  background-color: #F0EFF1;
`;


export const TechStackSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
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
  width: 100%;
`;

export const ContributionLabel = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: #352F36;
`;

export const ProgressBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
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
  color: #5A565B;
  cursor: pointer;

  &:hover {
    color: #868286;
  }
`;