// src/pages/block/BlockRegisterPage.tsx
import BlockHeader from '@components/block/BlockHeader'
import InformText from '@components/block/InformText'
import SetBlockDetails from '@components/block/SetBlockDetails'
import ConfirmButton from '@components/block/ConfirmButton'

export function BlockRegisterPage() {
    return (
        <>
            <BlockHeader title={"블록 등록하기"} />
            <InformText />
            <SetBlockDetails />
            <ConfirmButton />
        </>
    )
}