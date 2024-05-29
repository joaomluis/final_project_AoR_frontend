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
} from "reactstrap";
import { FaUserCog } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

import { useTranslation } from "react-i18next";

import "../assets/css/general-css.css";
import userImageUrl from "../assets/img/user.jpg";

import UserSettings from "../components/modals/user-settings.jsx";

import { Api } from "../api";
import { tsuccess, terror } from "../components/toasts/message-toasts.jsx";
function MyProfile() {
  const { t } = useTranslation();
  const token = "28bdd334-468c-4167-a453-cd341d602807";
  const userSettingsRef = useRef();
  const [imageUrl, setImageUrl] = useState(userImageUrl);

  /**
   * Function to upload the file. Will check first
   * @param {*} event
   * @returns
   */
  async function handleFileChange(event) {
    if (!(event.target.files.length > 0)) {
      return;
    }
    const file = event.target.files[0];
    const filename = file.name;

    try {
      const response = await Api.uploadImage(token, file, filename);
      tsuccess(response.data);
      console.log(response.data);
      setImageUrl(response.data + "?timestamp=" + Date.now());
    } catch (error) {
      terror(error.message);
    }
  }

  return (
    <div className="section4">
      <UserSettings ref={userSettingsRef} />
      <Container>
        <Row>
          <Col md="12" className=" mt-5">
            <Card>
              <Row>
                <Col md="12">
                  <CardBody>
                    <Row>
                      <Col className="mb-4" md="12">
                        <CardTitle tag="h4">
                          My Profile
                          <FaUserCog
                            style={{ marginLeft: "10px", cursor: "pointer" }}
                            onClick={() => userSettingsRef.current.open()}
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
                          onChange={handleFileChange}
                          accept="image/*"
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
                              src={imageUrl}
                              alt="User"
                              style={{
                                borderRadius: "50%",
                                cursor: "pointer",
                                position: "absolute",
                                objectFit: "cover",
                                width: "100%",
                                height: "100%",
                                border: "2px solid #000",
                              }}
                            />
                          </div>
                        </label>
                      </Col>
                      <Col md="4">
                        <Row>
                          <Label style={{ fontWeight: "bold" }}>
                            First Name
                          </Label>
                          <Input
                            id="userName"
                            type="text"
                            placeholder="Enter your first name"
                            onChange={(event) => {
                              // handle the input here
                            }}
                          />
                        </Row>
                        <Row>
                          <Label style={{ fontWeight: "bold" }}>
                            Last Name
                          </Label>
                          <Input
                            id="userName"
                            type="text"
                            placeholder="Enter your last name"
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
          <Col md="6" className="mt-5 mb-5">
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

export default MyProfile;
