import styled from "styled-components";

interface ProjectDescriptionProps {
  title: string;
  proposerName: string;
  description: string;
}

export function ProjectDescription({
  title,
  proposerName,
  description,
}: ProjectDescriptionProps) {
  return (
    <Wrap>
      <Title>{title}</Title>

      <ProposerRow>
        <Label>제안자</Label>
        <Proposer>{proposerName}</Proposer>
      </ProposerRow>

      <Desc>{description}</Desc>
    </Wrap>
  );
}

const Wrap = styled.section`
  width: 100%;
  background: #fff;
  border-radius: 16px;
  padding: 20px 18px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #111;
  margin-bottom: 10px;
  line-height: 1.35;
`;

const ProposerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
`;

const Label = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #7b7b7b;
  background: #f2f4f6;
  padding: 4px 8px;
  border-radius: 999px;
`;

const Proposer = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #222;
`;

const Desc = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #333;
  white-space: pre-line;
`;
