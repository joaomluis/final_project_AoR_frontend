import MainNavBar from "../components/navbar/navbar.jsx";
import Footer from "../components/footer/footer.jsx";

import routes from "../routes.js";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";

function Landing() {
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/landing") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <div className="wrapper" id="main-container">
      <MainNavBar />
      <div>
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default Landing;
