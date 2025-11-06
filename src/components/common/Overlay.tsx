import type { ReactNode, CSSProperties } from "react"
import ReactDOM from "react-dom";
import * as S from './Overlay.styled'

interface OverlayProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  overlayStyle?: CSSProperties;
  contentStyle?: CSSProperties;
}

export default function Overlay({ open, onClose, children, overlayStyle, contentStyle }: OverlayProps) {

  if (!open) return null;
  return ReactDOM.createPortal(
    <S.Overlay onClick={onClose} style={overlayStyle}>
      <S.Content onClick={e => e.stopPropagation()} style={contentStyle}>
        {children}
      </S.Content>
    </S.Overlay>
    ,
    document.body
  );
}
