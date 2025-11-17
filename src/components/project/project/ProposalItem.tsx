import styled from "styled-components";
import arrowIcon from "@assets/project/arrow.svg";
import { useNavigate } from "react-router-dom";

type Kind = "SENT" | "RECEIVED";

type Props = {
  kind: Kind;
  topNickname: string;
  othersCount: number;
  topProfileUrl?: string;
  projectId: number | string;
  proposalId: number | string;
};

const Item = styled.li`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding: 16px;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

const Left = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const AvatarWrap = styled.div`
  position: relative;
  width: 48px;
  height: 48px;
`;

const Avatar = styled.div<{ src?: string }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ src }) => (src ? `url(${src}) center/cover` : "#d9d9d9")};
`;

const Badge = styled.div`
  position: absolute;
  right: -4px;
  bottom: -4px;
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
  font-size: 16px;
  font-weight: 600;
  color: #000;
`;

const Sub = styled.div`
  margin-top: 2px;
  font-size: 12px;
  font-weight: 400;
  color: #5d595e;
`;

// 버튼 그룹
const CTAGroup = styled.div`
  margin-top: 12px;
  width: 100%;
  display: flex;
  border-radius: 16px;
  border: 1px solid #d0ced1;
  overflow: hidden;
`;

const CTAButton = styled.button`
  flex: 1;
  padding: 10px 0;
  border: none;
  background: #ffffff;
  font-size: 14px;
  font-weight: 500;
  color: #352f36;
  cursor: pointer;
`;

const Divider = styled.div`
  width: 1px;
  background: #d0ced1;
`;

export default function ProposalItem({
  kind,
  topNickname,
  othersCount,
  topProfileUrl,
  projectId,
  proposalId,
}: Props) {
  const navigate = useNavigate();
  const title = kind === "SENT" ? "보낸 제안" : "받은 제안";

  const handleClickTeam = () => {
    navigate(`/Project/team/${projectId}`);
  };

  const handleClickProposalDetail = () => {
    navigate(`/Project/proposal/${proposalId}`);
  };

  return (
    <Item>
      <TopRow>
        <Left>
          <AvatarWrap>
            <Avatar src={topProfileUrl} />
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
