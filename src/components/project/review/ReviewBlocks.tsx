// src/components/project/review/ReviewBlocks.tsx
import styled, { css } from "styled-components";

import ReviewGood from "@assets/project/ReviewGood.svg";
import ReviewNotbad from "@assets/project/ReviewNotbad.svg";
import ReviewDisappoint from "@assets/project/ReviewDisappoint.svg";

export type ReviewBlockValue = "Good" | "Notbad" | "Disappoint";

interface ReviewBlocksProps {
  value: ReviewBlockValue | null;
  onSelect: (v: ReviewBlockValue) => void;
}

export function ReviewBlocks({ value, onSelect }: ReviewBlocksProps) {
  return (
    <Wrapper>
      <BlockButton
        aria-pressed={value === "Good"}
        selected={value === "Good"}
        onClick={() => onSelect("Good")}>
        <Img src={ReviewGood} alt="즐거웠어요" selected={value === "Good"} />
        <Label>즐거웠어요</Label>
      </BlockButton>

      <BlockButton
        aria-pressed={value === "Notbad"}
        selected={value === "Notbad"}
        onClick={() => onSelect("Notbad")}>
        <Img
          src={ReviewNotbad}
          alt="괜찮았어요"
          selected={value === "Notbad"}
        />
        <Label>괜찮았어요</Label>
      </BlockButton>

      <BlockButton
        aria-pressed={value === "Disappoint"}
        selected={value === "Disappoint"}
        onClick={() => onSelect("Disappoint")}>
        <Img
          src={ReviewDisappoint}
          alt="아쉬웠어요"
          selected={value === "Disappoint"}
        />
        <Label>아쉬웠어요</Label>
      </BlockButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 6px;
`;

const BlockButton = styled.button<{ selected: boolean }>`
  flex: 1;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  ${({ selected }) =>
    selected &&
    css`
      transform: translateY(-2px);
    `}
`;

const Img = styled.img<{ selected: boolean }>`
  width: 100px;
  height: 100px;
  opacity: ${({ selected }) => (selected ? 1 : 0.6)};
  transition: 0.15s ease;
`;

const Label = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`;
