import { Container, Col, Row, Card, CardBody, CardTitle, Input, Label, Button } from "reactstrap";
import { FaPlus } from "react-icons/fa";
import { Api } from "../api";
import { tsuccess, terror, twarn } from "../components/toasts/message-toasts.jsx";
import { useUserStore } from "../stores/useUserStore.js";
import { useState } from "react";
import { Link } from "react-router-dom";
import ListLayout from "../layout/list-layout/list.jsx";

import { useTranslation } from "react-i18next";

import "../assets/css/general-css.css";
import ProjectCard from "../components/Project_cards/project-cards.jsx";
import { useEffect } from "react";

function HomePage() {
  const { t } = useTranslation();
  const token = useUserStore((state) => state.token);
  const email = useUserStore((state) => state.email);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchProjects();
  }, []);

  return (
    <ListLayout title={t("my-projects")} loading={loading}>
      <Row className="justify-content-center">
        <Col xs="12" md="12" lg="12">
          <Link to="/fica-lab/create-project">
            <Button className="mb-3 w-100" color="light">
              <FaPlus /> {t("create-project")}
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        {projects.map((project, index) => (
          <Col sm="12" md="6" lg="4" className="mb-4" key={index}>
            <ProjectCard Project={project} />
          </Col>
        ))}
      </Row>
    </ListLayout>
  );
}

export default HomePage;
