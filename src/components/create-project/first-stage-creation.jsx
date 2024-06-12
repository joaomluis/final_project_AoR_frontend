import { Col, Row, CardBody, Input, Label, Form, FormGroup } from "reactstrap";

import { useState } from "react";

function FirstStageCreation() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [lab, setLab] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleLabChange = (event) => {
    setLab(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  return (
    <>
      <CardBody>
        <Form>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="projectName">Project Name</Label>
                <Input
                  type="text"
                  name="projectName"
                  id="projectName"
                  placeholder="Enter project name"
                  className="form-control-lg"
                  value={projectName}
                  onChange={handleProjectNameChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="description">Project Description</Label>
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  className="form-control-lg"
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </FormGroup>
              <FormGroup floating>
                <Input
                  bsSize="md"
                  type="select"
                  className="form-select-lg"
                  value={lab}
                  onChange={handleLabChange}
                >
                  <option disabled selected>
                    Select a lab*
                  </option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="startDate">Start Date</Label>
                <Input
                  type="date"
                  name="startDate"
                  id="startDate"
                  className="form-control-lg"
                  value={startDate}
                  onChange={handleStartDateChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="endDate">End Date</Label>
                <Input
                  type="date"
                  name="endDate"
                  id="endDate"
                  className="form-control-lg"
                  value={endDate}
                  onChange={handleEndDateChange}
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </>
  );
}

export default FirstStageCreation;
