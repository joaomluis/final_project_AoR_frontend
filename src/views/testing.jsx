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

import UserSkills from "../components/tags/skill-tag";
import UserInterests from "../components/tags/interest-tag";
function Testing() {
  const { t } = useTranslation();

  function card(title, subtitle, dd) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>{subtitle}</CardText>
          {dd}
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="testing-section1" style={{ height: "100vh" }}>
      <Container>
        <Row>
          <Col md="6" className="mt-5 mb-5">
            {card(
              t("my-interests"),
              t("there-you-can-add-and-remove-your-interests"),
              <UserInterests />
            )}
          </Col>
          <Col md="6" className="mt-5">
            {card(
              t("my-skills"),
              t("there-you-can-add-and-remove-your-skills"),
              <UserSkills />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Testing;
