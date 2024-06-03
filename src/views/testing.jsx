import {
  Container,
  Col,
  Row,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Button,
  CardImg,
  CardFooter,
  Badge,
} from "reactstrap";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "../assets/css/general-css.css";

import { Api } from "../api";
import { useEffect } from "react";
import ProjectCard from "../components/cards/project/card-project";
import { useUserStore } from "../components/stores/useUserStore";
function Testing() {
  const token = useUserStore((state) => state.token);
  const email = useUserStore((state) => state.email);
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);
  const props = {
    dtoType: "ProjectCardDto",
  };

  async function getProjects() {
    // fetch projects from the backend
    try {
      const response = await Api.getProjectsByDto(token, props);
      console.log(response.data);
      setProjects(response.data);
      console.log(projects);
    } catch {
      console.log("s");
    }
  }

  // const project = {};

  // const handler = {
  //   get(target, prop) {
  //     return Reflect.get(...arguments);
  //   },
  //   set(target, prop, value) {
  //     return Reflect.set(...arguments);
  //   },
  // };

  // const p = new Proxy(project, handler);
  // p.title = "Project 1";
  // p.description = "Description of project 1";

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div className="testing-section1" style={{ height: "100vh" }}>
      <Container>
        <Row>
          <ProjectCard
            title="Project 2"
            description="Description of project 2"
            keywords={[
              "keyword1",
              "keyword2",
              "keyword3",
              "k2",
              "keyword4",
              "keyword5",
              "kw1",
            ]}
            skills={["skill1", "skill2", "skill3", "Skill4", "Skill5"]}
          />

          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              keywords={project.keywords}
              skills={project.skills}
            />
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Testing;
