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

function SecondStageCreation() {
  return (
    <>
      <CardBody>
        <Form>
          <Row>
            <Col md={6}>
              
              
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

export default SecondStageCreation;
