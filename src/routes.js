import LandingPage from "./views/landing-page/landing-page.jsx";
import SignIn from "./components/sign-in/sign-in.jsx";
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
    path: "/my-profile",
    name: "my-profile",
    component: <MyProfile />,
    layout: "/main",
  },
  {
    path: "/testing",
    name: "Testing",
    component: <Testing />,
    layout: "/main",
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
  },
  {
    path: "/project/:id",
    name: "Project",
    component: <ProjectPage />,
    layout: "/main",
  },
  {
    path: "/create-project",
    name: "Create Project",
    component: <CreateProject />,
    layout: "/main",
  },
  {
    path: "/project-list",
    name: "Project List",
    component: <ProjectList />,
    layout: "/main",
  },
  {
    path: "/user-list/",
    name: "User List",
    component: <UserList />,
    layout: "/main",
  },
  {
    path: "/product-list",
    name: "Product List",
    component: <ProductList />,
    layout: "/main",
  },
  { path: "/product/:id", name: "Product", component: <ProductPage />, layout: "/main" },
  {
    path: "/user/:id",
    name: "User",
    component: <User />,
    layout: "/main",
  },
  {
    path: "/email-list",
    name: "Email List",
    component: <EmailList />,
    layout: "/main",
  },
];

export default routes;
