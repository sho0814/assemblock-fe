import { useOverlay } from "@components/common/OverlayContext";
import * as S from "./DeleteModal.styled";
import trashIcon from "@assets/board/nav/trash.svg";
import checkboxIcon from "@assets/board/nav/checkbox.svg";
import DeleteConfirmModal from "./DeleteConfirmModal";

interface DeleteModalProps {
  onDelete: () => void;
  onSelect?: () => void;
  showSelect?: boolean;
}

export default function DeleteModal({ onDelete, onSelect, showSelect = false }: DeleteModalProps) {
  const { closeOverlay, showOverlay } = useOverlay();

  const handleDeleteClick = () => {
    closeOverlay();
    showOverlay(<DeleteConfirmModal onConfirm={onDelete} />);
  };

  const handleSelectClick = () => {
    closeOverlay();
    if (onSelect) {
      onSelect();
    }
  };

  return (
    <S.Container showSelect={showSelect}>
      {showSelect && (
        <S.MenuItem onClick={handleSelectClick}>
          <S.Icon src={checkboxIcon} alt="선택" />
          <S.Text>선택하기</S.Text>
        </S.MenuItem>
      )}
      <S.MenuItem onClick={handleDeleteClick}>
        <S.Icon src={trashIcon} alt="삭제" />
        <S.Text>삭제하기</S.Text>
      </S.MenuItem>
    </S.Container>
  );
}
