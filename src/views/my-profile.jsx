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
  Input,
  CardImg,
  Label,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { FaUserCog } from "react-icons/fa";

import { useTranslation } from "react-i18next";

import "../assets/css/general-css.css";
import userImageUrl from "../assets/img/user.jpg";

function LandingPageContent() {
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
                      <Col md="12">
                        <CardTitle tag="h4">
                          My Profile
                          <FaUserCog
                            style={{ marginLeft: "10px", cursor: "pointer" }}
                            onClick={() => {}}
                          />
                        </CardTitle>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="8">
                        <input
                          type="file"
                          id="userImage"
                          style={{ display: "none" }}
                          onChange={(event) => {
                            const file = event.target.files[0];
                            // handle the file here
                          }}
                        />
                        <label htmlFor="userImage">
                          <div
                            style={{
                              width: "20vw",
                              height: "20vw",
                              position: "relative",
                            }}
                          >
                            <CardImg
                              top
                              src={userImageUrl}
                              alt="User"
                              style={{
                                borderRadius: "50%",
                                cursor: "pointer",
                                position: "absolute",
                                objectFit: "cover",
                                width: "100%",
                                height: "100%",
                              }}
                            />
                          </div>
                        </label>
                        <Input
                          style={{ maxWidth: "20vw" }}
                          type="text"
                          placeholder="Enter your name"
                          onChange={(event) => {
                            // handle the input here
                          }}
                        />
                      </Col>
                      <Col md="4">
                        <Row>
                          <Label style={{ fontWeight: "bold" }}>Name</Label>
                          <Input
                            id="userName"
                            type="text"
                            placeholder="Enter your name"
                            onChange={(event) => {
                              // handle the input here
                            }}
                          />
                        </Row>
                        <Row>
                          <Label style={{ fontWeight: "bold" }}>Username</Label>
                          <Input
                            id="userName"
                            type="text"
                            placeholder="Enter your username"
                            onChange={(event) => {
                              // handle the input here
                            }}
                          />
                        </Row>
                        <Row>
                          <Label style={{ fontWeight: "bold" }}>
                            Lab Location
                          </Label>

                          <Input type="select" id="labLocation">
                            <option value="">Select your base lab</option>
                            <option value="John">Coimbra</option>
                            <option value="Jane">Lisboa</option>
                            <option value="Bob">Porto</option>
                            
                          </Input>
                        </Row>
                      </Col>
                    </Row>
                  </CardBody>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mt-5">
            <Card>
              <CardBody>
                <Label for="aboutYou" style={{ fontWeight: "bold" }}>
                  About you:
                </Label>
                <Input
                  type="textarea"
                  id="aboutYou"
                  placeholder="Tell us more about you..."
                  rows="5"
                  style={{ resize: "none" }}
                />
              </CardBody>
            </Card>
          </Col>
          <Col md="6" className="mt-5"></Col>
        </Row>
      </Container>
    </div>
  );
}

export default LandingPageContent;
