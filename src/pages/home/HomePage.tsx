// src/pages/home/HomePage.tsx
import { Header } from '@components/home/Header'
import { Swipe } from '@components/home/Swipe'
import { StoreToBoard } from '@components/home/StoreToBoard'
import { BlockRegisterBtn} from '@components/home/BlockRegisterBtn'
import * as S from './HomePage.styled'

export function HomePage() {

    return (
        <div>
            <Header />
            <Swipe />
            <StoreToBoard />
            <BlockRegisterBtn />
        </div>


    )
}