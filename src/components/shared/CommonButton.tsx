// src/components/shared/CommonButton.tsx
import * as S from './CommonButton.styled'

interface CommonButtonProps {
    width?: string;
    height?: string;
    borderRadius?: string;
    onClick?: () => void;
    content?: string;
    imgSrc?: string;
    type?: "button" | "submit";
    disabled?: boolean;
}

export default function CommonButton({ width, height, borderRadius, onClick, content, imgSrc, type, disabled }: CommonButtonProps): React.JSX.Element {
    return (
        <>
            <S.Button
                width={width}
                height={height}
                $borderRadius={borderRadius}
                onClick={onClick}
                type={type}
                disabled={disabled}>

                {imgSrc && <S.ButtonImage src={imgSrc} alt="button image" />}
                {content && content}

            </S.Button>
        </>
    )
}