import MainNavBar from "../components/navbar/navbar.jsx";
import LandingPageSection1 from "../views/landing-page/landing-page-section1.jsx";
import LandingPageSection2 from "../views/landing-page/landing-page-section2.jsx";
import LandingPageSection3 from "../views/landing-page/landing-page-section3.jsx";
import Footer from "../components/footer/footer.jsx";

function Landing() {
  return (
    <div className="wrapper">
      <MainNavBar />

      <div className="main-panel" style={{ marginTop: "65px" }}>
        <div className="section1">
          <LandingPageSection1 />
        </div>

        <div className="section2">
          <LandingPageSection2 />
        </div>

        <div className="section3">
          <LandingPageSection3 />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Landing;
