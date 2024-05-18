import MainNavBar from "../components/navbar/navbar.jsx";
import LandingPageSection1 from "../views/landing-page/landing-page-section1.jsx";
import LandingPageSection2 from "../views/landing-page/landing-page-section2.jsx";

function Landing() {
  return (
    <div className="wrapper">
      <MainNavBar />

      <div className="main-panel" style={{ marginTop: "65px" }}>
        <div className="section1">
          <LandingPageSection1 />
        </div>
        <div className="main-panel">
          <div className="section2">
            <LandingPageSection2 />
          </div>
        </div>
        <div className="main-panel">
          <div className="section2">
            <LandingPageSection2 />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
