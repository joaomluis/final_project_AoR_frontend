import {
  Row,
  Col,
  Card,
  Button,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  CardFooter,
  CardText,
  Container,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

import "../../assets/css/general-css.css";

function ConfirmAccount() {
  const [password, setPassword] = useState("");

  return (
    <div className="section1" style={{ minHeight: "845px" }}>
      <Container>
        <Row>
          <Col md="3"></Col>

          <Col md="6">
            <Card
              style={{
                backgroundColor: "var(--primary-color)",
                borderRadius: "20px",
                marginTop: "60px",
                marginBottom: "50px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.6)",
              }}
              body
            >
              <CardHeader
                className="text-center"
                style={{ color: "var(--whitey)" }}
              >
                <h4>Confirm your account</h4>

                <CardText className="text-center" style={{ marginTop: "20px" }}>
                  Just a few more steps to go!
                </CardText>
              </CardHeader>
              <CardBody>
                <Form>
                  <FormGroup floating>
                    <Input
                      name="text"
                      placeholder="First Name"
                      type="text"
                      required
                    />
                    <Label>First Name*</Label>
                  </FormGroup>
                  <FormGroup floating>
                    <Input
                      name="text"
                      placeholder="Last Name"
                      type="text"
                      required
                    />
                    <Label>Last Name*</Label>
                  </FormGroup>
                  <FormGroup floating>
                    <Input name="text" placeholder="Username" type="text" />
                    <Label>Username</Label>
                  </FormGroup>

                  <FormGroup floating>
                    <Input bsSize="lg" type="select">
                      <option>Lab location*</option>
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    <Label style={{ color: "var(--whitey)" }}>About you:</Label>
                    <Input name="text" type="textarea" style={{ resize: 'none', height: '150px' }} />
                  </FormGroup>

                  <Button
                    style={{
                      backgroundColor: "var(--secondary-color)",
                      color: "var(--whitey)",
                      marginTop: "20px",
                      width: "100%",
                      border: "none",
                    }}
                  >
                    Confirm Account
                  </Button>
                </Form>
              </CardBody>
              <CardFooter className="text-center">
                
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ConfirmAccount;
