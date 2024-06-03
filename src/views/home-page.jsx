import {
  Container,
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  Input,
  Label,
  Button,
} from "reactstrap";
import { FaPlus } from "react-icons/fa";
import { Api } from "../api";
import { tsuccess, terror, twarn } from "../components/toasts/message-toasts.jsx";

import { useTranslation } from "react-i18next";

import "../assets/css/general-css.css";
import ProjectCard from "../components/Project_cards/project-cards.jsx";
import { useEffect } from "react";

function HomePage() {
  const { t } = useTranslation();

  async function handleGetProjects() {
    try {
      const response = await Api.getProjects();
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    handleGetProjects();
  }, []);

  return (
    <div className="section4">
      <Container>
        <Row>
          <Col md="12" className=" mt-5">
            <Card>
              <Row>
                <Col md="12">
                  <CardBody>
                    <Row>
                      <Col className="mb-4" md="10">
                        <CardTitle tag="h4">Your recent projects</CardTitle>
                      </Col>
                      <Col md="2">
                        <Button color="light" className="button-style1 w-100">
                          <FaPlus /> Create Project
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <ProjectCard />
                      </Col>
                    </Row>
                  </CardBody>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;
