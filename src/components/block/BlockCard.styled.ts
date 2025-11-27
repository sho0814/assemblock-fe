import styled from "styled-components";

export const CardWrapper = styled.div`
  position: relative;
`;

export const Card = styled.div<{ bgImage: string; isSelectionMode?: boolean; isSelected?: boolean }>`
  background-image: url(${(props) => props.bgImage});
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 160px;
  aspect-ratio: 160 / 228;
  padding: 16px;
  border-radius: 16px;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  flex-shrink: 0;
  box-sizing: border-box;
  position: relative;
  opacity: ${(props) => (props.isSelectionMode && !props.isSelected ? 0.6 : 1)};
  transition: opacity 0.2s;
`;

export const CheckboxOverlay = styled.div<{ isSelected: boolean }>`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;
`;

export const Checkbox = styled.div<{ isSelected: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid ${(props) => (props.isSelected ? "#352F36" : "#fff")};
  background-color: ${(props) => (props.isSelected ? "#352F36" : "transparent")};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  ${(props) =>
    props.isSelected &&
    `
    &::after {
      content: "✓";
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }
  `}
`;

export const Title = styled.div`
  color: #fafafa;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const Summary = styled.div`
  color: #fafafabf;
  font-weight: 500;
  font-size: 10px;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const Username = styled.div`
  color: #fafafabf;
  font-weight: 500;
  font-size: 10px;
`;

export const TechPart = styled.div`
  margin-top: auto;
  margin-left: auto;
  background-color: #352f3640;
  border-radius: 12px;
  padding: 4px 8px;
  color: #fafafa;
  font-weight: 600;
  font-size: 10px;
  display: inline-block;
  max-width: 100%;
`;
