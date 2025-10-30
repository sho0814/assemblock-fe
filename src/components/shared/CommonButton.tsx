// src/components/shared/CommonButton.tsx
import * as S from './CommonButton.styled'

interface CommonButtonProps {
    width?: string;
    height?: string;
    borderRadius?: string;
    onClick?: () => void;
    content?: string;
    imgSrc?: string;
}

export default function CommonButton({ width, height, borderRadius, onClick, content, imgSrc }: CommonButtonProps): React.JSX.Element {
    return (
        <>
            <S.Button
                width={width}
                height={height}
                $borderRadius={borderRadius}
                onClick={onClick}>

                {imgSrc && <S.ButtonImage src={imgSrc} alt="button image" />}
                {content && content}

            </S.Button>
        </>
    )
}