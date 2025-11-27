import styled from "styled-components";

type ContactMethodProps = {
  title: string;
  description: string;
};

export function ContactMethod({ title, description }: ContactMethodProps) {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Desc>{description}</Desc>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #000;
`;

const Desc = styled.p`
  font-size: 14px;
  color: #6b6b6b;
  line-height: 20px;
  white-space: pre-line;
`;
