import styled from "styled-components";
import { MemberBlockItem } from "./MemberBlockItem";

export interface MemberBlock {
  blockId: number;
  imageUrl: string;
  title: string;
  description: string;
}

interface MemberBlockListProps {
  blocks: MemberBlock[];
}

export function MemberBlockList({ blocks }: MemberBlockListProps) {
  return (
    <Wrap>
      <HeaderRow>
        <SectionTitle>팀원들의 블록</SectionTitle>
      </HeaderRow>

      <List>
        {blocks.map((b) => (
          <MemberBlockItem
            key={b.blockId}
            imageUrl={b.imageUrl}
            title={b.title}
            description={b.description}
          />
        ))}
      </List>
    </Wrap>
  );
}

const Wrap = styled.section`
  margin-top: 14px;
  width: 100%;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 8px 2px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #111;
`;


const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
