import { useOverlay } from '@components/common/OverlayContext';
import * as S from './EditCancelModal.styled';

interface EditCancelModalProps {
  onCancel: () => void;
}

export default function EditCancelModal({ onCancel }: EditCancelModalProps) {
  const { closeOverlay } = useOverlay();

  const handleCancel = () => {
    closeOverlay();
  };

  const handlePrev = () => {
    closeOverlay();
    onCancel();
  };

  return (
    <S.Container>
      <S.Header>
        <div style={{ width: '24px' }} />
        <S.Title>수정 취소 안내</S.Title>
        <S.CloseButton onClick={handleCancel} aria-label="닫기">
          X
        </S.CloseButton>
      </S.Header>

      <S.Content>
        <S.Description>
          <div>수정을 취소하고 이전 화면으로 돌아갈까요?</div>
          <div>수정 내용은 저장되지 않아요!</div>
        </S.Description>

        <S.PrevButton onClick={handlePrev}>
          이전으로
        </S.PrevButton>
      </S.Content>
    </S.Container>
  );
}

