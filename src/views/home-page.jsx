import {
  Container,
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  Input,
  CardImg,
  Label,
  Button,
} from "reactstrap";
import { FaPlus } from "react-icons/fa";

import { useTranslation } from "react-i18next";

import "../assets/css/general-css.css";
import userImageUrl from "../assets/img/user.jpg";

function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="section4">
      <Container>
        <Row>
          <Col md="12" className=" mt-5">
            <Card>
              <Row>
                <Col md="12">
                  <CardBody>
                    <Row>
                      <Col className="mb-4" md="10">
                        <CardTitle tag="h4">Your recent projects</CardTitle>
                      </Col>
                      <Col md="2">
                        <Button color="light" className="button-style1 w-100">
                          <FaPlus /> Create Project
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                        
                    </Row>
                  </CardBody>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;
