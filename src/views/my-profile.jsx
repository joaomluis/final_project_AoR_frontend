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
} from "reactstrap";

import { useTranslation } from "react-i18next";

import "../assets/css/general-css.css";

function LandingPageContent() {
  const { t } = useTranslation();

  return (
    <div className="section4" style={{ height: "100vh" }}>
      <Container>
        <Row>
          <Col md="12" className=" mt-5">
            <Card>
              <Row>
                <Col md="6">
                  <CardBody>
                    <CardTitle tag="h4">Card Title</CardTitle>
                  </CardBody>
                 
                </Col>
                <Col md="6"></Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mt-5">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Card Title</CardTitle>
              </CardHeader>
              <CardBody>
                <CardText>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </CardText>
                <Button>Go somewhere</Button>
              </CardBody>
            </Card>
          </Col>
          <Col md="6" className="mt-5">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Card Title</CardTitle>
              </CardHeader>
              <CardBody>
                <CardText>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </CardText>
                <Button>Go somewhere</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LandingPageContent;
