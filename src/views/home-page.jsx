import { Container, Col, Row, Card, CardBody, CardTitle, Input, Label, Button } from "reactstrap";
import { FaPlus } from "react-icons/fa";
import { Api } from "../api";
import { tsuccess, terror, twarn } from "../components/toasts/message-toasts.jsx";
import { useUserStore } from "../components/stores/useUserStore.js";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

import "../assets/css/general-css.css";
import ProjectCard from "../components/Project_cards/project-cards.jsx";
import { useEffect } from "react";

function HomePage() {
  const { t } = useTranslation();
  const token = useUserStore((state) => state.token);
  const email = useUserStore((state) => state.email);

  const [projects, setProjects] = useState([]);

  // Props para enviar ao endpoint
  const props = {
    dtoType: "ProjectCardDto",
    participant_email: email,
  };

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await Api.getProjects(token, props);
        setProjects(response.data.results); // Set the projects data
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchProjects();
  }, []);

  return (
    <div className="section4">
      <Container>
        <Card>
          <CardBody>
            <Row>
              <Col className="mb-4" lg="9" md="8">
                <CardTitle tag="h4">Your recent projects</CardTitle>
              </Col>
              <Col lg="3" md="4">
                <Link to="/fica-lab/create-project">
                  <Button color="light" className="button-style1">
                    <FaPlus /> Create Project
                  </Button>
                </Link>
              </Col>
            </Row>
            <Row>
              {projects.map((project, index) => (
                <Col sm="12" md="6" lg="4" key={index} className="mt-4">
                  <ProjectCard Project={project} />
                </Col>
              ))}
            </Row>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
}

export default HomePage;
