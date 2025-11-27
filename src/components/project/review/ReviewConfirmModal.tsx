// src/components/project/review/ReviewConfirmModal.tsx
import styled from "styled-components";
import type { ReviewBlockValue } from "./ReviewBlocks";

interface ReviewConfirmModalProps {
  isOpen: boolean;
  pendingValue: ReviewBlockValue | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function ReviewConfirmModal({
  isOpen,
  pendingValue,
  onClose,
  onConfirm,
}: ReviewConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>리뷰 작성 확정</Title>
          <CloseButton onClick={onClose}>×</CloseButton>
        </Header>

        <Body>
          <Text>
            선택을 정말 확정하시겠어요?
            <br />
            작성한 리뷰는 내 프로필에서 볼 수 있어요.
          </Text>
        </Body>

        <Footer>
          <ConfirmButton onClick={onConfirm} disabled={!pendingValue}>
            확정하기
          </ConfirmButton>
        </Footer>
      </Modal>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(17, 24, 39, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const Modal = styled.div`
  width: calc(100% - 48px);
  max-width: 360px;
  background: #fff;
  border-radius: 16px;
  padding: 20px 18px 18px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
`;

const Header = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  padding: 6px 0 14px;
  border-bottom: 1px solid #f1f3f5;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 800;
  color: #111827;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  border: none;
  background: transparent;
  font-size: 22px;
  cursor: pointer;
  color: #111827;
`;

const Body = styled.div`
  padding: 22px 6px;
  text-align: center;
`;

const Text = styled.p`
  font-size: 15px;
  font-weight: 600;
  color: #111827;
  line-height: 1.6;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
`;

const ConfirmButton = styled.button<{ disabled?: boolean }>`
  width: 100%;
  height: 52px;
  border: none;
  border-radius: 999px;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;

  background: ${({ disabled }) => (disabled ? "#E5E7EB" : "#2F2B33")};
  color: ${({ disabled }) => (disabled ? "#9CA3AF" : "#fff")};
`;
