// src/components/proposal/AcceptButton.tsx
import styled, { css } from "styled-components";

type Props = {
  disabled?: boolean;
  onClick?: () => void;
};

const BaseButton = styled.button<{ disabled?: boolean }>`
  width: 100%;
  height: 48px;
  border-radius: 16px;

  border: none;
  background: var(--Primary-BK, #352f36);
  color: var(--GrayScale-WT, #fafafa);

  font-size: 16px;
  font-family:
    Pretendard,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  font-weight: 600;

  cursor: pointer;

  ${({ disabled }) =>
    disabled &&
    css`
      background: #e3e1e3;
      color: #a39fa3;
      cursor: default;
    `}
`;

export default function AcceptButton({ disabled, onClick }: Props) {
  return (
    <BaseButton disabled={disabled} onClick={disabled ? undefined : onClick}>
      수락하기
    </BaseButton>
  );
}
