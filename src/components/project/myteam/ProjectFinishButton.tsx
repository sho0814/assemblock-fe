import styled from "styled-components";

const Button = styled.button`
  margin-top: 24px;
  width: 100%;
  padding: 12px 16px;
  border-radius: 999px;
  background: #333;
  color: #fff;
  font-size: 14px;
  border: none;
`;

type Props = {
  onFinish: () => void;
};

export const ProjectFinishButton = ({ onFinish }: Props) => {
  return <Button onClick={onFinish}>프로젝트 완료하기</Button>;
};
