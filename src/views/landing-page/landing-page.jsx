import LandingPageSection1 from "./landing-page-section1";
import LandingPageSection2 from "./landing-page-section2";
import LandingPageSection3 from "./landing-page-section3";

function LandingPage() {
  return (
    <>
        <div className="section1">
          <LandingPageSection1 />
        </div>

        <div className="section2">
          <LandingPageSection2 />
        </div>

        <div className="section3">
          <LandingPageSection3 />
        </div>
      </>
  );
}

export default LandingPage;