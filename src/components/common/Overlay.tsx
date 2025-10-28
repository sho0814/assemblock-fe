import ReactDOM from "react-dom";
import * as S from './Overlay.styled'

interface OverlayProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  overlayStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
}

export default function Overlay({
  open,
  onClose,
  children,
  overlayStyle,
  contentStyle
}: OverlayProps) {
  if (!open) return null;
  return ReactDOM.createPortal(
    <S.Overlay
      onClick={onClose}
      style={{
        position: "fixed",
        zIndex: 1500,
        top: 0, left: 0, right: 0, bottom: 0,
        display: "flex", justifyContent: "center", alignItems: "center",
        ...overlayStyle
      }}
    >
      <S.Content
        onClick={e => e.stopPropagation()}
        style={contentStyle}
      >
        {children}
      </S.Content>
    </S.Overlay>,
    document.body
  );
}
