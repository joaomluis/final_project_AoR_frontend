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
} from "reactstrap";

import { useTranslation } from "react-i18next";
import "../assets/css/general-css.css";
import SkillCard from "../components/cards/card-skill";

function Testing() {
  const { t } = useTranslation();

  return (
    <div className="testing-section1" style={{ height: "100vh" }}>
      <Container>
        <Row>
          <SkillCard />
        </Row>
      </Container>
    </div>
  );
}

export default Testing;