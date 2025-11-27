import styled from "styled-components";

interface ProjectDescriptionProps {
  title: string;
  proposerName: string;
  description: string;
}

export function ProjectDescription({
  title,
  description,
}: ProjectDescriptionProps) {
  return (
    <div>
      <Title>{title}</Title>
      <Desc>{description}</Desc>
    </div>
  );
}

const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #111;
  margin-bottom: 10px;
  line-height: 1.35;
`;

const Desc = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #333;
  white-space: pre-line;
`;
