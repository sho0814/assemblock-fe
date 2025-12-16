import styled from "styled-components";
import arrowIcon from "@assets/project/arrow.svg";
import { useNavigate } from "react-router-dom";
import type { notification } from "@types";
import { getProfileImage } from "@constants";

type Props = notification;

const Item = styled.li`
  list-style: none;
  width: 100%;
  padding: 16px 18px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & + & {
    border-top: 1.5px solid var(--GrayScale-GR10, #f0eff1);
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 27px;
`;

const AvatarWrap = styled.div`
  position: relative;
  width: 48px;
  height: 48px;
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 999px;
  object-fit: cover;
  background: #ddd;
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
`;

const BadgeIcon = styled.img`
  width: 11px;
  height: 11px;
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  color: #352f36;
  font-size: 16px;
  font-weight: 600;
`;

const Sub = styled.div`
  color: #726d72;
  font-size: 14px;
  margin-top: 2px;
`;

const DetailButton = styled.button`
  height: 34px;
  padding: 0 18px;
  border-radius: 20px;
  border: none;
  background: #352f36;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

export default function NotificationProposalItem({
  senderName,
  senderProfileType,
  proposalId,
}: Props) {
  const navigate = useNavigate();

  const handleClickDetail = () => {
    navigate(`/Project/proposal/${proposalId}`, {
      state: { from: "notification" },
    });
  };

  return (
    <Item>
      <Left>
        <AvatarWrap>
          <Avatar src={getProfileImage(senderProfileType)} />
          <Badge>
            <BadgeIcon src={arrowIcon} alt="" />
          </Badge>
        </AvatarWrap>
        <TextWrap>
          <Title>받은 제안</Title>
          <Sub>{senderName}</Sub>
        </TextWrap>
      </Left>
      <DetailButton onClick={handleClickDetail}>상세 보기</DetailButton>
    </Item>
  );
}
