// src/pages/block/BlockRegisterPage.tsx
import { useLocation, useNavigate } from "react-router-dom";

import SimpleHeader from '@components/shared/SimpleHeader'
import CancelGuide from "@components/block/CancleGuide";
import { useOverlay } from '@components/common/OverlayContext'
import BlockDetails from '@components/block/BlockDetails'

export function BlockRegisterPage() {
    const { showOverlay, closeOverlay } = useOverlay();
    const navigate = useNavigate();
    const location = useLocation();
    const { isTechType } = location.state || { isTechType: false };

    return (
        <>
            <SimpleHeader
                title={"블록 등록하기"}
                onBackClick={() => showOverlay(
                    <CancelGuide
                        title="작성 취소 안내"
                        description={
                            <>
                                작성을 취소하고 이전 화면으로 돌아갈까요?<br />
                                작성 내용은 저장되지 않아요!
                            </>}
                        prevContent="이전으로"
                        onPrevClick={() => { closeOverlay(); navigate(-1); }} />
                )} />
            
            <BlockDetails isTech={isTechType} />
        </>
    )
}