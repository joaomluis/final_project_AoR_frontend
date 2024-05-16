import {
  Container,
  Col,
  Row,
  Card,
  CardTitle,
  CardText,
  Button,
  CardHeader,
} from "reactstrap";

function LandingPageContent() {
  return (
    <Container>
      <Row>
        <Col md="6">
          <Row>
            <h1>Webapp for project management and task tracking.</h1>
          </Row>
          <Row>
            <p>
              FicaLab is a platform for managing your projects and tasks. It
              allows you to create projects, add tasks to them, and assign tasks
              to your team members. You can also track the progress of your
              projects and tasks.
            </p>
          </Row>
        </Col>

        <Col md="6">
          <Card color="secondary" body>
            <CardHeader tag="h5" className="text-center">Special Title Treatment</CardHeader>
            
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <Button color="primary">Go somewhere</Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LandingPageContent;
