import { useOverlay } from '@components/common/OverlayContext'

export function StoreToBoard() {
    const { showOverlay, closeOverlay } = useOverlay();

    return (
        <button onClick={() => showOverlay(
            <div>
                보드를 선택하세요
                <button onClick={closeOverlay}>close</button>
            </div>,
            {
                overlayStyle: { background: "rgba(100,0,0,0.7)" },
                contentStyle: { borderRadius: "24px", padding: "48px" }
            })}>
            보드에 저장
        </button>

    )
}