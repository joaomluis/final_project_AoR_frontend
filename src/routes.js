import LandingPage from "./views/landing-page/landing-page.jsx"
import SignIn from "./components/sign-in/sign-in.jsx"
import ConfirmAccount from "./components/confirm-account/confirm-account.jsx"

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
      path: "/confirm-account",
      name: "confirm-account",
      component: <ConfirmAccount />,
      layout: "/landing",
    }
];

export default routes;