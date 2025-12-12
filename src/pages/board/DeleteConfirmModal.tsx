import { useOverlay } from "@components/common/OverlayContext";
import * as S from "./DeleteConfirmModal.styled";
import closeIcon from "@assets/board/close.svg";

interface DeleteConfirmModalProps {
  onConfirm: () => void;
  title?: string;
  desc1?: string;
  desc2?: string;
  confirmText?: string;
}

export default function DeleteConfirmModal({
  onConfirm,
  title = "삭제 확인",
  desc1 = "보드를 정말 삭제하시겠습니까?",
  desc2 = "한 번 삭제한 보드는 복구할 수 없어요",
  confirmText = "삭제하기",
}: DeleteConfirmModalProps) {
  const { closeOverlay } = useOverlay();

  const handleCancel = () => closeOverlay();

  const handleConfirm = () => {
    closeOverlay();
    onConfirm();
  };

  return (
    <S.Container>
      <S.Header>
        <div style={{ width: "24px" }} />
        <S.Title>{title}</S.Title>
        <S.CloseButton onClick={handleCancel} aria-label="닫기">
          <img src={closeIcon} alt="닫기" style={{ width: 18, height: 18 }} />
        </S.CloseButton>
      </S.Header>

      <S.Content>
        <S.Description>
          <div>{desc1}</div>
          <div>{desc2}</div>
        </S.Description>

        <S.DeleteButton onClick={handleConfirm}>{confirmText}</S.DeleteButton>
      </S.Content>
    </S.Container>
  );
}
