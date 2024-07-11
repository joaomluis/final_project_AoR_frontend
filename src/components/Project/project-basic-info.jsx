import { CardBody, Form, FormGroup, Input, Row, Col, Label } from "reactstrap";
import { Button } from "reactstrap";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import useEditProjectStore from "../../stores/useEditProjectStore.js";
import { terror, tinfo } from "../toasts/message-toasts.jsx";
import { Api } from "../../api.js";
import { useUserStore } from "../../stores/useUserStore.js";
import ProjectStatus from "../../components/enums/ProjectStatus.js";

function ProjectBasicInfo({ data }) {
  const { t } = useTranslation();
  const { id } = useParams();
  const token = useUserStore((state) => state.token);
  const [maxParticipants, setMaxParticipants] = useState(data.maxParticipants || 0);
  const members = useEditProjectStore((state) => state.projectUsers);
  const [changes, setChanges] = useState(false);
  const projectId = parseInt(id, 10);
  console.log(data.status);
  useEffect(() => {
    setMaxParticipants(data.maxParticipants);
  }, [data.maxParticipants]);

  const handleChangeParticipants = (e) => {
    if (e.target.value < 1) {
      e.target.value = 1;
    } else if (e.target.value >= 10) {
      e.target.value = 10;
    }
    setMaxParticipants(e.target.value || 0);
    setChanges(true);
    useEditProjectStore.setState({ maxParticipants: e.target.value });
  };

  const handleSaveMaxMemebersChange = () => {
    if (maxParticipants < members.length) {
      tinfo("You can't set the maximum number of participants to a value lower than the current number of participants.");
      return;
    } else {
      changeParticipants();
    }
  };
  async function changeParticipants() {
    const props = { id: projectId, value: maxParticipants };
    if (maxParticipants < members.length) {
      tinfo("You can't set the maximum number of participants to a value lower than the current number of participants.");
      return;
    }
    try {
      const response = await Api.changeMaxParticipants(token, props);
      setChanges(false);
      setMaxParticipants(response.data.value);
    } catch (error) {
      terror(error.message);
      console.log(error.message);
    }
  }

  const handleClick = () => {
    if (ProjectStatus.fromLabel(data.status) === ProjectStatus.PLANNING) {
      setChanges(true);
    } else {
      tinfo(t("only-planning-projects-can-be-edited"));
    }
  };

  return (
    <>
      <CardBody style={{ backgroundColor: "#dbe2ef", borderRadius: "10px" }} className="mt-2">
        <Row>
          <Col md={2}></Col>
          <Col md={8}>
            <FormGroup>
              <Label for="projectName">{t("project-name")}</Label>
              <strong className="form-control-plaintext">{data.name}</strong>
            </FormGroup>
            <FormGroup>
              <Label for="description">{t("project-description")}</Label>
              <strong className="form-control-plaintext">{data.description}</strong>
            </FormGroup>
            <Row>
              <Col lg={6} md={6}>
                <FormGroup>
                  <Label for="startDate">{t("project-start-date")}</Label>
                  <strong className="form-control-plaintext">{data.startDate}</strong>
                </FormGroup>
              </Col>
              <Col lg={6} md={6}>
                <FormGroup>
                  <Label for="endDate">{t("project-end-date")}</Label>
                  <strong className="form-control-plaintext">{data.endDate} </strong>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg={6} sm={12}>
                <FormGroup>
                  <Label for="labLocation">{t("project-lab-location")}</Label>
                  <strong className="form-control-plaintext">{data.lab_location}</strong>
                </FormGroup>
              </Col>
              <Col lg={6} sm={12}>
                <FormGroup>
                  <Label for="labLocation">{t("project-group-size")}</Label>
                  {changes ? (
                    <div style={{ display: "flex", gap: "1rem" }}>
                      <Input
                        type="number"
                        name="labLocation"
                        id="labLocation"
                        className="form-control"
                        value={maxParticipants}
                        onChange={handleChangeParticipants}
                        style={{ width: "5rem" }}
                      />
                      <Button onClick={handleSaveMaxMemebersChange}>{t("save")}</Button>
                    </div>
                  ) : (
                    <strong style={{ cursor: "pointer" }} onClick={handleClick} className="form-control-plaintext">
                      {maxParticipants}
                    </strong>
                  )}
                </FormGroup>
              </Col>
            </Row>
          </Col>
        </Row>
      </CardBody>
    </>
  );
}

export default ProjectBasicInfo;
