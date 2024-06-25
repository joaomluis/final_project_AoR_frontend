import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LandingLayout from "./layout/landing";
import MainLayout from "./layout/main";
import WebSocketProvider from "./WebSocketProvider";
import { useUserStore } from "./stores/useUserStore";
import "./i18n";

const App = () => {
  // Diretamente acessa o token do estado global
  const token = useUserStore((state) => state.token);

  return (
    <BrowserRouter>
      <WebSocketProvider token={token}>
        <ToastContainer />
        <Routes>
          <Route path="/*" element={<LandingLayout />} />
          <Route path="/fica-lab/*" element={<MainLayout />} />
        </Routes>
      </WebSocketProvider>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
