// src/components/shared/ProposalResponseModal.tsx
import styled from "styled-components";

interface ProposalResponseModalProps {
  isOpen: boolean;
  type: "accept" | "reject" | "error";
  message: string;
  onConfirm: () => void;
}

export function ProposalResponseModal({
  isOpen,
  type,
  message,
  onConfirm,
}: ProposalResponseModalProps) {
  if (!isOpen) return null;

  const getTitle = () => {
    if (type === "accept") return "제안 수락 완료";
    if (type === "reject") return "제안 거절 완료";
    return "오류";
  };

  return (
    <Overlay onClick={onConfirm}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>{getTitle()}</Title>
          <CloseButton onClick={onConfirm}>×</CloseButton>
        </Header>
        <Body>
          <Description>{message}</Description>
        </Body>
        <Footer>
          <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
        </Footer>
      </Modal>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
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
  font-size: 16px;
  font-weight: 600;
  color: #352f36;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const Description = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: var(--Primary-BK, #352f36);
  line-height: 1.6;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
`;

const ConfirmButton = styled.button`
  width: 192px;
  height: 45px;
  border: none;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  background: #2f2b33;
  color: #fff;
`;
