import MainNavBar from "../components/navbar/main-navbar.jsx";
import Sidebar from "../components/sidebar/sidebar.jsx";
import Footer from "../components/footer/footer.jsx";

import routes from "../routes.js";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
import PrivateRoute from "../PrivateRoute.js";

function Main() {
  const privateRoutes = routes.filter((route) => route.private);
  const publicRoutes = routes.filter((route) => !route.private);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/main") {
        console.log(prop.private);
        if (prop.public) {
          return <Route path={prop.path} element={prop.component} key={key} exact />;
        } else {
          return <Route path={prop.path} element={<PrivateRoute>{prop.component}</PrivateRoute>} key={key} exact />;
        }
      }
    });
  };

  return (
    <div className="wrapper">
      <MainNavBar />
      <div className="main-panel">
        <Sidebar />
        <div id="main-container" className="main-container">
          <Routes>{getRoutes(routes)}</Routes>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Main;
