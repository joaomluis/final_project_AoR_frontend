import LandingPage from "./views/landing-page/landing-page.jsx";
import SignIn from "./components/sign-in/sign-in.jsx";
import ConfirmAccount from "./components/confirm-account/confirm-account.jsx";
import MyProfile from "./views/my-profile.jsx";
import HomePage from "./views/home-page.jsx";
import Testing from "./views/testing.jsx";
import ChangePassword from "./components/change-password/change-password.jsx";
import ProjectPage from "./views/project-page.jsx";

var routes = [
  {
    path: "/",
    name: "landing-page",
    component: <LandingPage />,
    layout: "/landing",
  },
  {
    path: "/login",
    name: "login",
    component: <SignIn />,
    layout: "/landing",
  },
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
];

export default routes;
