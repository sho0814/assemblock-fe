// src/pages/block/BlockRegisterPage.tsx
import SimpleHeader from '@components/shared/SimpleHeader'
import InformText from '@components/block/InformText'
import SetBlockDetails from '@components/block/SetBlockDetails'
import CommonButton from '@components/shared/CommonButton'

export function BlockRegisterPage() {
    return (
        <>
            <SimpleHeader title={"블록 등록하기"} />
            <InformText />
            <SetBlockDetails />
            <CommonButton content={"블록 등록하기"}/>
        </>
    )
}