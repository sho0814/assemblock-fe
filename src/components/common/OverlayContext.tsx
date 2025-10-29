import type { ReactNode, CSSProperties } from "react"
import { useState, createContext, useContext } from 'react';
import Overlay from './Overlay';

interface OverlayContextType {
  showOverlay: (
    content: ReactNode,
    options?: { overlayStyle?: CSSProperties; contentStyle?: CSSProperties }
  ) => void;
  closeOverlay: () => void;
}

const OverlayContext = createContext<OverlayContextType | null>(null);

interface OverlayProviderProps {
  children: ReactNode;
}

export function OverlayProvider({ children }: OverlayProviderProps) {
  const [content, setContent] = useState<ReactNode | null>(null);
  const [styleOptions, setStyleOptions] = useState<{
    overlayStyle?: CSSProperties;
    contentStyle?: CSSProperties;
  }>({});

  const showOverlay = (
    jsx: React.ReactNode,
    options?: { overlayStyle?: CSSProperties; contentStyle?: CSSProperties }
  ) => {
    setContent(jsx);
    setStyleOptions(options || {});
  };
  const closeOverlay = () => {
    setContent(null);
    setStyleOptions({});
  };

  return (
    <OverlayContext.Provider value={{ showOverlay, closeOverlay }}>
      {children}
      <Overlay
        open={!!content}
        onClose={closeOverlay}
        overlayStyle={styleOptions.overlayStyle}
        contentStyle={styleOptions.contentStyle}>
        {content}
      </Overlay>
    </OverlayContext.Provider>
  );
}

export function useOverlay(): OverlayContextType {
  const context = useContext(OverlayContext);
  if (!context) {
    throw new Error('useOverlay must be used within OverlayProvider');
  }
  return context;
}
