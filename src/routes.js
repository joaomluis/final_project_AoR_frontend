import LandingPage from "./views/landing-page/landing-page.jsx"
import SignIn from "./components/sign-in/sign-in.jsx"

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
    }
];

export default routes;