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
  width: 100%;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const SectionTitle = styled.h3`
  color: var(--Primary-BK, #352f36);
  font-size: 16px;
  font-family: Pretendard;
  font-weight: 600;
  line-height: 24px;
  word-wrap: break-word;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
