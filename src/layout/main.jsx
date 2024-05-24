import MainNavBar from "../components/navbar/navbar.jsx";
import Sidebar from "../components/sidebar/sidebar.jsx";
import Footer from "../components/footer/footer.jsx";

import routes from "../routes.js";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";

function Main() {
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/main") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <div className="wrapper">
      <MainNavBar />

      <div className="main-panel" style={{ marginTop: "65px" }}>
        <Sidebar />
        <Routes>{getRoutes(routes)}</Routes>
      </div>
      <Footer />
    </div>
  );
}

export default Main;
