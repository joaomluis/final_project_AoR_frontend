import LandingPage from "./views/landing-page/landing-page.jsx";
import ConfirmAccount from "./components/confirm-account/confirm-account.jsx";
import MyProfile from "./views/my-profile.jsx";
import HomePage from "./views/home-page.jsx";
import Testing from "./views/testing.jsx";
import ChangePassword from "./components/change-password/change-password.jsx";
import ProjectPage from "./views/project-page.jsx";
import ProductPage from "./views/product-page.jsx";
import CreateProject from "./views/create-project.jsx";
import ProjectList from "./views/project-list.jsx";
import UserList from "./views/user-list.jsx";
import ProductList from "./views/product-list.jsx";
import EmailList from "./views/email-list.jsx";
import User from "./views/user-page.jsx";
import AdminPage from "./admin/admin-page.jsx";
var routes = [
  {
    path: "/",
    name: "landing-page",
    component: <LandingPage />,
    layout: "/landing",
  },
  // {
  //   path: "/login",
  //   name: "login",
  //   component: <SignIn />,
  //   layout: "/landing",
  // },
  {
    path: "/confirm-account/:token",
    name: "confirm-account",
    component: <ConfirmAccount />,
    layout: "/landing",
  },
  {
    path: "/projects",
    name: "project-list",
    component: <ProjectList />,
    layout: "/landing",
  },
  {
    path: "/my-profile",
    name: "my-profile",
    component: <MyProfile />,
    layout: "/main",
    private: true,
  },
  {
    path: "/testing",
    name: "Testing",
    component: <Testing />,
    layout: "/main",
    private: true,
  },
  {
    path: "/change-password/:token",
    name: "change-password",
    component: <ChangePassword />,
    layout: "/landing",
  },
  {
    path: "/home",
    name: "Home",
    component: <HomePage />,
    layout: "/main",
    private: true,
  },
  {
    path: "/project/:id",
    name: "Project",
    component: <ProjectPage />,
    layout: "/main",
    private: true,
  },
  {
    path: "/create-project",
    name: "Create Project",
    component: <CreateProject />,
    layout: "/main",
    private: true,
  },
  {
    path: "/project-list",
    name: "Project List",
    component: <ProjectList />,
    layout: "/main",
    private: true,
  },
  {
    path: "/user-list/",
    name: "User List",
    component: <UserList />,
    layout: "/main",
    private: true,
  },
  {
    path: "/product-list",
    name: "Product List",
    component: <ProductList />,
    layout: "/main",
    private: true,
  },
  { path: "/product/:id", name: "Product", component: <ProductPage />, layout: "/main", private: true },
  {
    path: "/user/:id",
    name: "User",
    component: <User />,
    layout: "/main",
    private: true,
  },
  {
    path: "/email-list",
    name: "Email List",
    component: <EmailList />,
    layout: "/main",
    private: true,
  },
  {
    path: "/admin-page",
    name: "Admin Page",
    component: <AdminPage />,
    layout: "/main",
    private: true,
  },
];

export default routes;
