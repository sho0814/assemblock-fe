import styled from "styled-components";
import arrowIcon from "@assets/project/arrow.svg";
import { useNavigate } from "react-router-dom";

type Kind = "SENT" | "RECEIVED";

type Props = {
  kind: Kind; // '보낸 제안' | '받은 제안'
  topNickname: string; // 가나다 순 가장 상단 사용자 닉네임
  othersCount: number; // topNickname 외 인원 수
  topProfileUrl?: string; // 프로필 이미지 URL (없으면 컬러 원형)
  onClickTeam: () => void; // "내 팀 보기"
};

const Item = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 14px 16px;
  border-radius: 16px;
  background: #fafafa;
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
  background: ${({ src }) => (src ? `url(${src}) center/cover` : "#D9D9D9")};
`;

const Badge = styled.div`
  position: absolute;
  right: -4px;
  bottom: -4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #352f36; /* 어두운 원형 배경 */
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

const CTA = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 16px;
  background: #352f36;
  color: #fff;
  font-weight: 500;
  font-size: 12px;
  cursor: pointer;
`;

export default function ProposalItem({
  kind,
  topNickname,
  othersCount,
  topProfileUrl,
}: Props) {
  const navigate = useNavigate();
  const title = kind === "SENT" ? "보낸 제안" : "받은 제안";

  // 임시로 projectId
  const projectId = 123;

  const handleClick = () => {
    navigate(`/Project/team/${projectId}`);
  };

  return (
    <Item>
      <Left>
        <AvatarWrap>
          <Avatar src={topProfileUrl} />
          <Badge>
            <BadgeIcon src={arrowIcon} alt="" />
          </Badge>
        </AvatarWrap>

        <div>
          <Title>{title}</Title>
          <Sub>
            {topNickname} 님 외 {othersCount}인
          </Sub>
        </div>
      </Left>

      <CTA onClick={handleClick}>내 팀 보기</CTA>
    </Item>
  );
}
