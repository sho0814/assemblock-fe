import { Route, Routes } from 'react-router-dom'

import { OverlayProvider } from '@components/common/OverlayContext';
import { MainLayout } from '@components/common/MainLayout'
import { SubLayout } from '@components/common/SubLayout';

import { HomePage } from '@pages/home/HomePage'
import { BoardPage } from '@pages/board/BoardPage'
import { ProjectPage } from '@pages/project/ProjectPage'
import { MyPage } from '@pages/my/MyPage'
import { BlockRegisterPage } from '@pages/BlockRegister/BlockRegisterPage'

function App() {
  return (
    <OverlayProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/Home" element={<HomePage />} />
          <Route path="/Board" element={<BoardPage />} />
          <Route path="/Project" element={<ProjectPage />} />
          <Route path="/My" element={<MyPage />} />
        </Route>
        <Route element={<SubLayout />}>
          <Route path="Block/register" element={<BlockRegisterPage />} />
        </Route>
      </Routes>
    </OverlayProvider>
  )
}

export default App
