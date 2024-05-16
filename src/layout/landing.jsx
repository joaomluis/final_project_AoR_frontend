import { Container, Row, Col } from "reactstrap";
import MainNavBar from "../components/navbar/navbar.jsx";
import LandingPageContent from "../views/landingPageContent.jsx";

function Landing() {
  return (
    <div className="wrapper">
      <MainNavBar />

      <div className="main-panel" style={{ marginTop: "90px" }}>
        <LandingPageContent />
      </div>
    </div>
  );
}

export default Landing;
