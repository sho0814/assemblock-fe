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
  padding: 14px 12px;
  background: #fff;
  border-radius: 14px;
  border: 1px solid #eef0f2;
`;

const Thumb = styled.img`
  width: 56px;
  height: 56px;
  object-fit: cover;
  border-radius: 12px;
  flex-shrink: 0;
  background: #f2f4f6;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ItemTitle = styled.h4`
  font-size: 15px;
  font-weight: 700;
  color: #111;
`;

const ItemDesc = styled.p`
  font-size: 13px;
  color: #444;
  line-height: 1.45;
`;
