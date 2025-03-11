import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import routes from "tempo-routes";
import Layout from "./components/layout/Layout";

// Lazy load pages for better performance
const HomePage = lazy(() => import("./pages/HomePage"));
const MailListPage = lazy(() => import("./pages/MailListPage"));
const MailDetailPage = lazy(() => import("./pages/MailDetailPage"));
const MailFormPage = lazy(() => import("./pages/MailFormPage"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen w-screen">
          Chargement...
        </div>
      }
    >
      <>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/mail" element={<MailListPage />} />
            <Route path="/mail/:id" element={<MailDetailPage />} />
            <Route path="/mail/new" element={<MailFormPage />} />
            <Route path="/mail/edit/:id" element={<MailFormPage />} />
          </Route>
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
