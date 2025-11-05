import type { ReactNode } from "react";
import { useOverlay } from '@components/common/OverlayContext';
import * as S from './CancelGuide.styled';

interface CancelGuideProps {
    title: string;
    description: ReactNode;
    prevContent: string;
    onPrevClick: () => void;
}

export default function CancelGuide({ title, description, prevContent, onPrevClick }: CancelGuideProps) {
    const { closeOverlay } = useOverlay();

    return (
        <S.Container>

            <S.Header>
                <S.CloseButton />
                <S.Title>{title}</S.Title>
                <S.CloseButton onClick={closeOverlay} aria-label="닫기">X</S.CloseButton>
            </S.Header>

            <S.Content>
                <S.Description>{description}</S.Description>

                <S.PrevButton onClick={onPrevClick}>
                    {prevContent}
                </S.PrevButton>
            </S.Content>

        </S.Container>
    );
}
