import { useOverlay } from "@components/common/OverlayContext";
import * as S from "./DeleteConfirmModal.styled";

interface DeleteConfirmModalProps {
  onConfirm: () => void;
}

export default function DeleteConfirmModal({
  onConfirm,
}: DeleteConfirmModalProps) {
  const { closeOverlay } = useOverlay();

  const handleCancel = () => {
    closeOverlay();
  };

  const handleConfirm = () => {
    closeOverlay();
    onConfirm();
  };

  return (
    <S.Container>
      <S.Header>
        <div style={{ width: "24px" }} />
        <S.Title>삭제 확인</S.Title>
        <S.CloseButton onClick={handleCancel} aria-label="닫기">
          X
        </S.CloseButton>
      </S.Header>

      <S.Content>
        <S.Description>
          <div>보드를 정말 삭제하시겠습니까?</div>
          <div>한 번 삭제한 보드는 복구할 수 없어요</div>
        </S.Description>

        <S.DeleteButton onClick={handleConfirm}>삭제하기</S.DeleteButton>
      </S.Content>
    </S.Container>
  );
}
