import { Container, Col, Row } from "reactstrap";

import "../../assets/css/general-css.css";
import img1 from "../../assets/img/landing-page-img1.jpg";
import img3 from "../../assets/img/landing-page-img3.jpg";
import img2 from "../../assets/img/landing-page-img2.jpg";
import img4 from "../../assets/img/landing-page-img4.jpg";

function LandingPageContent() {
  return (
    <Container>
      <div className="section2">
        <Row>
          <Col md="8">
            <Row>
              <h1 style={{ marginTop: "60px", fontWeight: "bold" }}>
                Besides helping you make your projects a reality, FicaLab also
                gives you the best tools to keep track of your progress.
              </h1>
            </Row>
          </Col>
          <Col md="4">
            <img
              src={img1}
              alt="landing-page-section2-img"
              style={{
                width: "100%",
                height: "auto",
                marginTop: "60px",
                borderRadius: "10px",
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col md="4">
            <img
              src={img3}
              alt="landing-page-section2-img"
              style={{ width: "100%", height: "auto", borderRadius: "10px" }}
            />
          </Col>
          <Col md="4">
            <img
              src={img2}
              alt="landing-page-section2-img"
              style={{
                width: "100%",
                height: "90%",
                borderRadius: "10px",
                marginTop: "20px",
              }}
            />
          </Col>
          <Col
            md="4"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={img4}
              alt="landing-page-section2-img"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "10px",
                marginTop: "20px",
              }}
            />
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default LandingPageContent;
