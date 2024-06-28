import {
    CardBody,
    Form,
    FormGroup,
    Input,
    Button,
    Row,
    Col,
    Label,
  } from "reactstrap";

function ProjectBasicInfo({data}) {
  return (
    <>
    <CardBody
            style={{ backgroundColor: "#dbe2ef", borderRadius: "10px" }}
            className="mt-2"
          >
            <Row>
              <Col md={2}></Col>
              <Col md={8}>
                <FormGroup>
                  <Label for="projectName">Project Name</Label>
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
                  <Label for="description">Project Description</Label>
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
                      <Label for="startDate">Start Date</Label>
                      <Input
                        type="date"
                        name="startDate"
                        id="startDate"
                        className="form-control-lg"
                        value={data.startDate}
                        readOnly
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="endDate">End Date</Label>
                      <Input
                        type="date"
                        name="endDate"
                        id="endDate"
                        className="form-control-lg"
                        value={data.endDate}
                        readOnly
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                <Label for="labLocation">Lab Location</Label>
                <Input type="text" name="labLocation" id="labLocation" className="form-control-lg" value={data.lab} readOnly />
              </FormGroup>
              </Col>
            </Row>
          </CardBody>
    </>
  );
}

export default ProjectBasicInfo;