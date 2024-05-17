import MainNavBar from "../components/navbar/navbar.jsx";
import LandingPageContent from "../views/landingPageContent.jsx";



function Landing() {
  return (
    <div className="wrapper">
      <MainNavBar />


        <div className="main-panel" style={{ marginTop: "65px" }}>
          <div className="section1">
            <LandingPageContent />
          </div>
        </div>
      </div>
  );
}

export default Landing;
