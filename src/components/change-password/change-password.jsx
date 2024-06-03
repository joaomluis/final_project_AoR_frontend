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
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import FormInput from "../input/forminput";
import { tsuccess, terror, twarn } from "../toasts/message-toasts";
import { Api } from "../../api";
import { t } from "i18next";

function ConfirmAccount() {
  const navigate = useNavigate();
  const token = useParams().token;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  let data = {
    password,
    confirmPassword,
  };

  async function handleConfirmAccount() {
    try {
      const response = await Api.changePassword(token, data);
      tsuccess(response.data);
      data = {};
      navigate("/login");
    } catch (error) {
      terror(error.message);
    }
  }

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
                <h4>Update password</h4>

                <CardText className="text-center" style={{ marginTop: "20px" }}>
                  Just a few more steps to go!
                </CardText>
              </CardHeader>
              <CardBody>
                <Form>
                  <FormInput
                    label="New Password*"
                    placeholder=""
                    type="password"
                    required
                    value={password}
                    setValue={setPassword}
                  />
                  <FormInput
                    label="Confirm Password*"
                    placeholder=""
                    type="password"
                    required
                    value={confirmPassword}
                    setValue={setConfirmPassword}
                  />
                  <Button
                    style={{
                      backgroundColor: "var(--secondary-color)",
                      color: "var(--whitey)",
                      marginTop: "20px",
                      width: "100%",
                      border: "none",
                    }}
                    onClick={handleConfirmAccount}
                  >
                    Confirm Account
                  </Button>
                </Form>
              </CardBody>
              <CardFooter className="text-center"></CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ConfirmAccount;
