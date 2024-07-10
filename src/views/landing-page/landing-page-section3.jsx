import { Container, Col, Row, Card, CardFooter, Button, CardImg, CardBody, CardTitle } from "reactstrap";
import { useTranslation } from "react-i18next";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import "../../assets/css/general-css.css";
import img1 from "../../assets/img/project-img-placeholder.jpg";

import { Api } from "../../api.js";

const items = [
  {
    src: img1,
    altText: "Project 1",
    caption: "Project 1",
  },
  {
    src: img1,
    altText: "Project 2",
    caption: "Project 2",
  },
  {
    src: img1,
    altText: "Project 3",
    caption: "Project 3",
  },
  {
    src: img1,
    altText: "Project 4",
    caption: "Project 4",
  },
];

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function LandingPageContent() {
  const { t } = useTranslation();
  return (
    <Container>
      <div className="section3">
        <Row>
          <Col md="12" className="text-center">
            <Row>
              <h2
                style={{
                  marginTop: "80px",
                  fontWeight: "bold",
                }}
              >
                {t("landing-page-section3-title")}
              </h2>
            </Row>
            <Row>
              <h5
                style={{
                  marginTop: "40px",
                  textAlign: "center",
                }}
              >
                {t("landing-page-section3-subtitle")}
              </h5>
            </Row>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Carousel responsive={responsive} infinite autoPlaySpeed={3000} centerMode={false}>
            {items.map((item, index) => (
              <div key={index} style={{ padding: "10px" }}>
                <Card key={index}>
                  <CardImg top width="100%" height={"200px"} src={item.src} alt={item.altText} />
                  <CardBody>
                    <CardTitle tag="h5">{item.caption}</CardTitle>
                  </CardBody>
                  <CardFooter style={{ backgroundColor: "inherit" }}>
                    <Button
                      style={{
                        backgroundColor: "var(--secondary-color)",
                        border: "none",
                      }}
                    >
                      {t("view-project")}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </Carousel>
        </Row>
        <Row>
          <Col md="12" className="align-right mb-5 mt-3">
            <Button
              style={{
                backgroundColor: "var(--secondary-color)",
                border: "none",
              }}
            >
              {t("see-more-projects")}
            </Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default LandingPageContent;
