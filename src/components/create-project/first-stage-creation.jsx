import {
    Container,
    Col,
    Row,
    Card,
    CardHeader,
    CardText,
    CardBody,
    CardTitle,
    Input,
    CardImg,
    Label,
    Form,
    FormGroup,
    Button,
  } from "reactstrap";

function FirstStageCreation() {
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
                />
              </FormGroup>
              <FormGroup>
                <Label for="description">Project Description</Label>
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  className="form-control-lg"
                />
              </FormGroup>
              <FormGroup floating>
                <Input bsSize="md" type="select" className="form-select-lg">
                  <option disabled selected>
                    Lab location*
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
                />
              </FormGroup>
              <FormGroup>
                <Label for="endDate">End Date</Label>
                <Input
                  type="date"
                  name="endDate"
                  id="endDate"
                  className="form-control-lg"
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
