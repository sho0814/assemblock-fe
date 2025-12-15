import styled from "styled-components";

interface MemberBlockItemProps {
  imageUrl: string;
  title: string;
  description: string;
}

export function MemberBlockItem({
  imageUrl,
  title,
  description,
}: MemberBlockItemProps) {
  return (
    <Item>
      <Thumb src={imageUrl} alt={title} />
      <Content>
        <ItemTitle>{title}</ItemTitle>
        <ItemDesc>{description}</ItemDesc>
      </Content>
    </Item>
  );
}

const Item = styled.li`
  display: flex;
  gap: 12px;
  border-radius: 14px;
  align-items: center;
`;

const Thumb = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 15px;
  flex-shrink: 0;
  background: #f2f4f6;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ItemTitle = styled.h4`
  color: var(--Primary-BK, #352f36);
  font-size: 14px;
  font-family: Pretendard;
  font-weight: 600;
  line-height: 21px;
  word-wrap: break-word;
`;

const ItemDesc = styled.p`
  color: var(--GrayScale-GR70, #726d72);
  font-size: 12px;
  font-family: Pretendard;
  font-weight: 500;
  line-height: 18px;
  word-wrap: break-word;
`;
