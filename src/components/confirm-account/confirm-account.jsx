import { Row, Col, Card, Button, CardHeader, CardBody, Form, FormGroup, Label, Input, CardFooter, CardText, Container } from "reactstrap";
import { useParams } from "react-router-dom";
import { useState } from "react";
import FormInput from "../input/forminput";
import { tsuccess, terror, twarn } from "../toasts/message-toasts";
import { Api } from "../../api";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";

function ConfirmAccount() {
  const token = useParams().token;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [labId, setSelectedLab] = useState("");
  const [about, setAbout] = useState("");
  const [labs, setLabs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  let data = {
    firstName,
    lastName,
    username,
    labId,
    about,
  };

  async function handleLoadLabLocations() {
    try {
      if (!isLoaded) {
        const response = await Api.getAllLocations(token);
        setLabs(response.data);
        setIsLoaded(true);
      }
    } catch (error) {
      console.log(error.messsage);
    }
  }

  async function handleConfirmAccount() {
    try {
      const response = await Api.confirmAccount(token, data);
      tsuccess(response.data);
      navigate("/");
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
              <CardHeader className="text-center" style={{ color: "var(--whitey)" }}>
                <h4>Confirm your account</h4>

                <CardText className="text-center" style={{ marginTop: "20px" }}>
                  Just a few more steps to go!
                </CardText>
              </CardHeader>
              <CardBody>
                <Form>
                  <FormInput label="First Name*" placeholder="First Name" type="text" required value={firstName} setValue={setFirstName} />
                  <FormInput label="Last Name*" placeholder="Last Name" type="text" required value={lastName} setValue={setLastName} />
                  <FormInput label="Username" placeholder="Username" type="text" value={username} setValue={setUsername} />

                  <FormGroup floating>
                    <Input
                      bsSize="md"
                      type="select"
                      className="form-select"
                      onClick={handleLoadLabLocations}
                      onChange={(e) => setSelectedLab(e.target.value)}
                    >
                      <option disabled selected>
                        Lab location*
                      </option>
                      {labs.map((lab) => (
                        <option key={lab.id} value={lab.id}>
                          {lab.location}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>

                  <FormInput
                    label="About you"
                    placeholder="About"
                    type="textarea"
                    style={{ resize: "none", height: "150px" }}
                    value={about}
                    setValue={setAbout}
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
