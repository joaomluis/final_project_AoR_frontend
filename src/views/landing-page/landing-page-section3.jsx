import {
  Container,
  Col,
  Row,
  Card,
  CardFooter,
  Button,
  CardImg,
  CardBody,
  CardTitle,
} from "reactstrap";
import { useTranslation } from "react-i18next";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import "../../assets/css/general-css.css";
import img1 from "../../assets/img/project-img-placeholder.jpg";
import img2 from "../../assets/img/project-img.jpg";

import { Api } from "../../api.js";
import { useEffect, useState } from "react";
import { set } from "date-fns";
import { Link } from "react-router-dom";

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

  const [projects, setProjects] = useState([]);

  async function getAllProjects() {
    try {
      const response = await Api.getProjectsForLandingPage();
      setProjects(response.data.results);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAllProjects();
  }, []);

  // função para baralhar os objectos da array dos projectos
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
  }

  // Nova array com 5 projectos baralhados
  const shuffledProjects = shuffleArray([...projects]).slice(0, 5);

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
          <Carousel
            responsive={responsive}
            infinite
            autoPlaySpeed={3000}
            centerMode={false}
          >
            {shuffledProjects.map((item, index) => (
              <div key={index} style={{ padding: "10px" }}>
                <Card key={index}>
                  <CardImg
                    top
                    width="100%"
                    height={"200px"}
                    src={img2}
                    alt={item.name}
                  />
                  <CardBody>
                    <CardTitle tag="h5" className="mb-2">{item.name}</CardTitle>
                    <p>
                      {item.description.length > 50
                        ? item.description.substring(0, 50) + "..."
                        : item.description}
                    </p>
                  </CardBody>
                  
                </Card>
              </div>
            ))}
          </Carousel>
        </Row>
        <Row>
          <Col md="12" className="align-right mb-5 mt-3">
          <Link to="/projects">
            <Button
              style={{
                backgroundColor: "var(--secondary-color)",
                border: "none",
              }}
              size="sm"
            >
              {t("see-more-projects")}
            </Button>
          </Link>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default LandingPageContent;
