import { Col, Row, Card, CardHeader, CardText, CardBody, CardTitle, Label, Form, FormGroup } from "reactstrap";

import "../../assets/css/general-css.css";

import { useTranslation } from "react-i18next";


import SkillTag from "../tags/skill-project-tag.jsx";
import InterestTag from "../tags/interest-project-tag.jsx";


function SecondStageCreation() {
  const { t } = useTranslation();

  function cardSkillInterest(title, text, tag) {
    return (
      <Card>
        <CardHeader>
          <CardTitle tag="h4">{title}</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>{text}</CardText>
          {tag}
        </CardBody>
      </Card>
    );
  }

  return (
    <>
      <CardBody>
        <Form>
          <Row>
            <Col md="6" className="mt-3">
              <FormGroup
                style={{
                  textAlign: "center",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "5px",
                  padding: "10px",
                  margin: "10px 0",
                }}
              >
                <Label
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "#333",
                  }}
                >
                  {t("project-skills")}
                </Label>
              </FormGroup>

              {cardSkillInterest(t("select-skills"), t("select-skills-subtext"), <SkillTag />)}
            </Col>

            <Col md="6" className="mt-3">
              <FormGroup
                style={{
                  textAlign: "center",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "5px",
                  padding: "10px",
                  margin: "10px 0",
                }}
              >
                <Label
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "#333",
                  }}
                >
                  {t("project-keywords")}
                </Label>
              </FormGroup>

              {cardSkillInterest(
                t("select-keywords"),
                t("select-keywords-subtext"),
                <InterestTag />
              )}
            </Col>
          </Row>
        </Form>
      </CardBody>
    </>
  );
}

export default SecondStageCreation;
