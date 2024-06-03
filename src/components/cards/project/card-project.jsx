import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardText,
  CardFooter,
  CardTitle,
  Button,
  Badge,
  Col,
} from "reactstrap";
import "./card-project.css";

function ProjectCard({ title, description, keywords, skills }) {
  return (
    <Col md="4">
      <Card className="project-card">
        <CardHeader className="project-card-header">
          <CardTitle className="project-card-title">{title}</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText className="project-card-text">{description}</CardText>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="project-card-keywords">
              <strong>Keywords:</strong>
              {keywords.map((keyword, index) => (
                <Badge
                  key={index}
                  color="primary"
                  className="project-card-badge"
                >
                  {keyword}
                </Badge>
              ))}
            </div>
            <div className="project-card-skills">
              <strong>Skills:</strong>
              {skills.map((skill, index) => (
                <Badge
                  key={index}
                  color="secondary"
                  className="project-card-badge"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </CardBody>
        <CardFooter>
          <Button className="btn-view">View Project</Button>
        </CardFooter>
      </Card>
    </Col>
  );
}
export default ProjectCard;
