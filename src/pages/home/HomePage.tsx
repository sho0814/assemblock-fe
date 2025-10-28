// src/pages/home/HomePage.tsx
import { useOverlay } from '@components/common/OverlayContext';

export function HomePage() {
    const { showOverlay, closeOverlay } = useOverlay();

    return (
        <>
            <button onClick={() => showOverlay(
                <div>
                    overlay contents
                    <button onClick={closeOverlay}>닫기</button>  
                </div>,
                {
                    overlayStyle: { background: "rgba(100,0,0,0.7)" },
                    contentStyle: { borderRadius: "24px", padding: "48px" }
                })}>
                오버레이 열기
            </button>
            
        </>
    )
}