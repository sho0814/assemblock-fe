import { Route, Routes } from "react-router-dom";

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
import { ProfileEdit } from "@pages/my/ProfileEdit";
import { ProfileSelect } from "@pages/my/ProfileSelect";
import { CategoryPage } from "@pages/category/CategoryPage";
import { NotificationPage } from "@pages/notification/NotificationPage";
import { SearchPage } from "@pages/search/SearchPage";
import { SearchResultPage } from "@pages/search/SearchResultPage";
import { BlockDetailPage } from "@pages/block/BlockDetailPage";
import { BlockEditPage } from "@pages/block/BlockEditPage";
import { BlockRegisterPage } from "@pages/block/BlockRegisterPage";
import { CategoryDetailsPage } from "@pages/category/CategoryDetailsPage";
import { BoardDetailPage } from "@pages/board/BoardDetailPage";

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
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/category/:techpart" element={<CategoryDetailsPage />} />
          <Route path="/notification" element={<NotificationPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/search/:keyword" element={<SearchResultPage />} />
          <Route path="/Board/detail" element={<BoardDetailPage boards={[]} setBoards={() => { }} />} />
          <Route path="/block/detail" element={<BlockDetailPage />} />
          <Route path="/block/edit" element={<BlockEditPage />} />
          <Route path="/block/register" element={<BlockRegisterPage />} />
          <Route path="/My/ProfileEdit" element={<ProfileEdit />} />
          <Route path="/My/ProfileSelect" element={<ProfileSelect />} />
          <Route path="/Project/team/:proposalId" element={<MyTeamPage />} />
          <Route path="/Project/proposal/:proposalId" element={<ProposalDetailPage />} />
        </Route>
      </Routes>
    </OverlayProvider>
  );
}

export default App;
