import styled from "styled-components";
import arrowIcon from "@assets/project/arrow.svg";
import { useNavigate } from "react-router-dom";
import { getProfileImage } from "@constants";
import type { ProfileType } from "@types";

type Kind = "SENT" | "RECEIVED";

type Props = {
  kind: Kind;
  topNickname: string;
  othersCount: number;
  topProfileType: ProfileType;
  projectId: number | string;
  proposalId: number | string;
};

const Item = styled.li`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

const Left = styled.div`
  display: flex;
  gap: 27px;
  align-items: center;

  margin-left: 12px;
`;

const AvatarWrap = styled.div`
  position: relative;
  width: 48px;
  height: 48px;
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  background: #d9d9d9;
`;

const Badge = styled.div`
  position: absolute;
  right: -4px;
  bottom: -1px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #352f36;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
`;

const BadgeIcon = styled.img`
  width: 11px;
  height: 11px;
  user-select: none;
  pointer-events: none;
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  color: var(--Primary-BK, #352f36);
  font-size: 16px;
  font-family: Pretendard;
  font-weight: 600;
  line-height: 24px;
  word-wrap: break-word;
`;

const Sub = styled.div`
  color: var(--GrayScale-GR70, #726d72);
  font-size: 14px;
  font-family: Pretendard;
  font-weight: 400;
  line-height: 21px;
  word-wrap: break-word;
`;

const CTAGroup = styled.div`
  margin-top: 16px;
  width: 100%;
  padding: 0 15px;
  background: var(--GrayScale-WT, #fafafa);
  border-radius: 8px;
  outline: 1px solid var(--GrayScale-GR50, #868286);
  outline-offset: -1px;

  display: inline-flex;
  justify-content: space-between;
  align-items: center;
`;

const CTAButton = styled.button`
  height: 40px;
  padding: 10px 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border: none;
  background: transparent;
  cursor: pointer;

  color: var(--GrayScale-GR70, #726d72);
  font-size: 14px;
  font-family:
    Pretendard,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  font-weight: 600;
  line-height: 21px;
  word-wrap: break-word;
`;

// 두 버튼 사이 세로 구분선
const Divider = styled.div`
  width: 1px;
  height: 24px;
  background: var(--GrayScale-GR70, #726d72);
`;

export default function ProposalItem({
  kind,
  topNickname,
  othersCount,
  topProfileType,
  projectId,
  proposalId,
}: Props) {
  const navigate = useNavigate();
  const title = kind === "SENT" ? "보낸 제안" : "받은 제안";

  const handleClickTeam = () => {
    navigate(`/Project/team/${proposalId}`);
  };

  const handleClickProposalDetail = () => {
    navigate(`/Project/proposal/${proposalId}`);
  };

  return (
    <Item>
      <TopRow>
        <Left>
          <AvatarWrap>
            <Avatar src={getProfileImage(topProfileType)} />
            <Badge>
              <BadgeIcon src={arrowIcon} alt="" />
            </Badge>
          </AvatarWrap>

          <TextWrap>
            <Title>{title}</Title>
            <Sub>
              {topNickname} 님 외 {othersCount}인
            </Sub>
          </TextWrap>
        </Left>
      </TopRow>

      <CTAGroup>
        <CTAButton onClick={handleClickTeam}>내 팀 보기</CTAButton>
        <Divider />
        <CTAButton onClick={handleClickProposalDetail}>
          제안 상세 보기
        </CTAButton>
      </CTAGroup>
    </Item>
  );
}
