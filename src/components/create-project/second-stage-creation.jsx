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
              <Label for="components">Components</Label>
              
            </Col>
            <Col md={6}>
            <Label for="resources">Resources</Label>
             
            </Col>
          </Row>
          
        </Form>
      </CardBody>
    </>
  );
}

export default SecondStageCreation;
