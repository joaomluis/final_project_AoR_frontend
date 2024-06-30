import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import WebSocketProvider from "./WebSocketProvider";
import { useUserStore } from "./stores/useUserStore";
import "./i18n";
import Loading from "./components/loading/loading-overlay";
const LandingLayout = lazy(() => import("./layout/landing"));
const MainLayout = lazy(() => import("./layout/main"));

const App = () => {
  console.log("App");
  // Diretamente acessa o token do estado global
  const token = useUserStore((state) => state.token);

  return (
    <BrowserRouter>
      <WebSocketProvider token={token}>
        <ToastContainer />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/*" element={<LandingLayout />} />
            <Route path="/fica-lab/*" element={<MainLayout />} />
          </Routes>
        </Suspense>
      </WebSocketProvider>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
