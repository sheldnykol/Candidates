import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CandidateProvider } from "./context/CandidateProvider";
import { MainLayout } from "./Components/layout/MainLayout";
import { DashboardPage } from "./Components/Training-Files/Phase-1/pages/DashboardPage";
import { CandidateListPage } from "./Components/Training-Files/Phase-2/pages/CandidateListPage";
import { CandidateDetailPage } from "./Components/Training-Files/Phase-2/pages/CandidateDetailPage";
import { AddCandidatePage } from "./Components/Training-Files/Phase-2/pages/AddCandidatePage";
import { EditCandidatePage } from "./Components/Training-Files/Phase-2/pages/EditCandidatePage";
import { NotFoundPage } from "./Components/pages/NotFoundPage";

// Lazy load page components
// const DashboardPage = lazy(() =>
//   import("./Components/pages/DashboardPage").then((module) => ({
//     default: module.DashboardPage,
//   }))
// );
// const CandidateListPage = lazy(() =>
//   import("./Components/pages/CandidateListPage").then((module) => ({
//     default: module.CandidateListPage,
//   }))
// );
// const CandidateDetailPage = lazy(() =>
//   import("./Components/pages/CandidateDetailPage").then((module) => ({
//     default: module.CandidateDetailPage,
//   }))
// );
// const AddCandidatePage = lazy(() =>
//   import("./Components/pages/AddCandidatePage").then((module) => ({
//     default: module.AddCandidatePage,
//   }))
// );
// const EditCandidatePage = lazy(() =>
//   import("./Components/pages/EditCandidatePage").then((module) => ({
//     default: module.EditCandidatePage,
//   }))
// );
// const NotFoundPage = lazy(() =>
//   import("./Components/pages/NotFoundPage").then((module) => ({
//     default: module.NotFoundPage,
//   }))
// );

// Loading fallback component
const LoadingFallback = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontSize: "1.2rem",
      color: "#666",
    }}
  >
    Loading...
  </div>
);

export const App: React.FC = () => {
  return (
    <CandidateProvider>
      <BrowserRouter>
        <MainLayout>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/candidates" element={<CandidateListPage />} />
              <Route path="/candidates/:id" element={<CandidateDetailPage />} />
              <Route path="/add" element={<AddCandidatePage />} />
              <Route
                path="/candidates/:id/edit"
                element={<EditCandidatePage />}
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </MainLayout>
      </BrowserRouter>
    </CandidateProvider>
  );
};

export default App;
// Week 1 Day 1 work
