import { CardBody, Form, FormGroup, Input, Row, Col, Label } from "reactstrap";
import { useTranslation } from "react-i18next";

function ProjectBasicInfo({ data }) {
  const { t } = useTranslation();

  return (
    <>
      <CardBody style={{ backgroundColor: "#dbe2ef", borderRadius: "10px" }} className="mt-2">
        <Row>
          <Col md={2}></Col>
          <Col md={8}>
            <FormGroup>
              <Label for="projectName">{t("project-name")}</Label>
              <Input
                type="text"
                name="projectName"
                id="projectName"
                placeholder="Enter project name"
                className="form-control-lg"
                value={data.name}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">{t("project-description")}</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                className="form-control-lg"
                value={data.description}
                readOnly
                style={{ resize: "none" }}
              />
            </FormGroup>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="startDate">{t("project-start-date")}</Label>
                  <Input type="date" name="startDate" id="startDate" className="form-control-lg" value={data.startDate} readOnly />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="endDate">{t("project-end-date")}</Label>
                  <Input type="date" name="endDate" id="endDate" className="form-control-lg" value={data.endDate} readOnly />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for="labLocation">{t("project-lab-location")}</Label>
              <Input type="text" name="labLocation" id="labLocation" className="form-control-lg" value={data.lab} readOnly />
            </FormGroup>
          </Col>
        </Row>
      </CardBody>
    </>
  );
}

export default ProjectBasicInfo;
