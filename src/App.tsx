import { Route, Routes } from 'react-router-dom'

import { OverlayProvider } from '@components/common/OverlayContext';
import { Layout } from '@components/common/Layout'
import { Navigator} from '@components/common/Navigator'

import { HomePage } from '@pages/home/HomePage'
import { BoardPage } from '@pages/board/BoardPage'
import { ProjectPage } from '@pages/project/ProjectPage'
import { MyPage } from '@pages/my/MyPage'

function App() {
  return (
    <OverlayProvider>
      <Layout>
        <Routes>
          <Route path="/Home" element={<HomePage />} />
          <Route path="/Board" element={<BoardPage />} />
          <Route path="/Project" element={<ProjectPage />} />
          <Route path="/My" element={<MyPage />} />
        </Routes>
      </Layout>
      <Navigator />
    </OverlayProvider>
  )
}

export default App
