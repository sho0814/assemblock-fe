import { Route, Routes, Navigate } from "react-router-dom";

import { OverlayProvider } from "@components/common/OverlayContext";
import { MainLayout } from "@components/common/MainLayout";
import { SubLayout } from "@components/common/SubLayout";

import { HomePage } from "@pages/home/HomePage";
import { BoardPage } from "@pages/board/BoardPage";
import { ProjectPage } from "@pages/project/ProjectPage";
import { MyTeamPage } from "@pages/project/MyTeamPage";
import { ReviewPage } from "@pages/project/ReviewPage";
import { ProposalDetailPage } from "@pages/project/ProposalDetailPage";
import { MyPage } from "@pages/my/MyPage";
import { CategoryPage } from "@pages/home/category/CategoryPage";
import { NotificationPage } from "@pages/home/notification/NotificationPage";
import { SearchPage } from "@pages/home/search/SearchPage";
import { BlockDetailPage } from "@pages/Block/BlockDetailPage";
import { BlockEditPage } from "@pages/Block/BlockEditPage";
import { BlockRegisterPage } from "@pages/Block/BlockRegisterPage";

function App() {
  return (
    <OverlayProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/Board" element={<BoardPage />} />
          <Route path="/Project" element={<ProjectPage />} />
          <Route path="/Project/team/:proposalId/review" element={<ReviewPage />} />
          <Route path="/My" element={<MyPage />} />
        </Route>
        <Route element={<SubLayout />}>
          <Route path="/Home/category" element={<CategoryPage />} />
          <Route path="/Home/notification" element={<NotificationPage />} />
          <Route path="/Home/search" element={<SearchPage />} />
          <Route path="/Block/detail" element={<BlockDetailPage />} />
          <Route path="/Block/edit" element={<BlockEditPage />} />
          <Route path="/Block/register" element={<BlockRegisterPage />} />
          <Route path="/Project/team/:proposalId" element={<MyTeamPage />} />
          <Route path="/Project/proposal/:proposalId" element={<ProposalDetailPage />} />
        </Route>
      </Routes>
    </OverlayProvider>
  );
}

export default App;
