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
} from "reactstrap";
import { FaUserCog } from "react-icons/fa";
import { FaRegSave } from "react-icons/fa";

import { useEffect, useRef, useState } from "react";

import { useTranslation } from "react-i18next";

import "../assets/css/general-css.css";
//TODO correct the label

import { useUserStore } from "../components/stores/useUserStore";
import UserSettings from "../components/modals/user-settings.jsx";
import FormInputLabel from "../components/input/forminputlabel.jsx";
import FormInput from "../components/input/forminput.jsx";
import SkillTag from "../components/tags/skill-tag.jsx";
import InterestTag from "../components/tags/interest-tag.jsx";
import { Api } from "../api";
import { tsuccess, terror } from "../components/toasts/message-toasts.jsx";
function MyProfile() {
  const { t } = useTranslation();
  const token = useUserStore((state) => state.token);
  const email = useUserStore((state) => state.email);
  const privateProfile = useUserStore((state) => state.privateProfile);
  const updatePrivateProfile = useUserStore(
    (state) => state.updatePrivateProfile
  );
  const userSettingsRef = useRef();
  const [user, setUser] = useState({
    username: "",
    firstname: "",
    lastname: "",
    lab: "",
    about: "",
    role: "",
    imagePath: "",
    privateProfile: "",
  });

  const [labs, setLabs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleInputChange = (value, field) => {
    // console.log(
    //   `handleInputChange called with value: ${value} and field: ${field}`
    // );
    setUser((prevUser) => {
      const newUser = { ...prevUser, [field]: value };
      // console.log(`newUser: ${JSON.stringify(newUser)}`);
      return newUser;
    });
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
      const newImageUrl = response.data + "?timestamp=" + Date.now();
      handleInputChange(newImageUrl, "imagePath");
    } catch (error) {
      terror(error.message);
    }
  }

  async function handleSaveChanges() {
    try {
      const response = await Api.updateUser(token, user);
      tsuccess(response.data);
    } catch (error) {
      terror(error.message);
    }
  }

  const props = { email: email };
  async function fetchUser() {
    try {
      const response = await Api.getUser(token, props);

      setUser(response.data[0]);
      updatePrivateProfile(response.data[0].privateProfile);
      console.log(privateProfile);

      tsuccess(response.data);
    } catch (error) {
      terror(error.message);
    }
  }

  useEffect(() => {
    fetchUser();
    handleLoadLabLocations();
  }, []);

  function cardSkillInterest(title, text, tag) {
    return (
      <Card>
        <CardHeader>
          <CardTitle tag="h4">{title}</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>{text}</CardText>
          {tag}
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="section4">
      <UserSettings private={user.privateProfile} ref={userSettingsRef} />
      <Container>
        <Row>
          <Col md="12" className=" mt-5">
            <Card>
              <Row>
                <Col md="12">
                  <CardBody>
                    <Row>
                      <Col className="mb-4" md="12">
                        <CardTitle tag="h4" className="profile-icons-container">
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            {t("my-profile")}
                            <FaUserCog
                              className="btn-title"
                              onClick={() => userSettingsRef.current.open()}
                            />
                          </div>
                          <FaRegSave
                            className="btn-title"
                            onClick={handleSaveChanges}
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
                              src={user.imagePath}
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
                          <FormInputLabel
                            label={t("first-name")}
                            placeholder={t("first-name")}
                            type="text"
                            value={user.firstname}
                            setValue={(value) =>
                              handleInputChange(value, "firstname")
                            }
                          />
                        </Row>
                        <Row>
                          <FormInputLabel
                            label={t("last-name")}
                            placeholder={t("last-name")}
                            type="text"
                            value={user.lastname}
                            setValue={(value) =>
                              handleInputChange(value, "lastname")
                            }
                          />
                        </Row>
                        <Row>
                          <FormInputLabel
                            label={t("username")}
                            placeholder={t("username")}
                            type="text"
                            value={user.username}
                            setValue={(value) =>
                              handleInputChange(value, "username")
                            }
                          />
                        </Row>
                        <Row>
                          <FormInputLabel
                            label={t("lab")}
                            placeholder={t("select-lab")}
                            type="select"
                            required={false}
                            value={user.lab}
                            setValue={(value) =>
                              handleInputChange(value, "lab")
                            }
                            data={labs}
                            handleClick={handleLoadLabLocations}
                          />
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
            {cardSkillInterest(
              t("my-interests"),
              t("there-you-can-add-and-remove-your-interests"),
              <InterestTag />
            )}
          </Col>
          <Col md="6" className="mt-5">
            {cardSkillInterest(
              t("my-skills"),
              t("there-you-can-add-and-remove-your-skills"),
              <SkillTag />
            )}
          </Col>
          <Col>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">{t("about")}</CardTitle>
              </CardHeader>
              <CardBody>
                <FormInput
                  label={t("about-me")}
                  placeholder="About"
                  type="textarea"
                  style={{ resize: "none", height: "150px" }}
                  value={user.about}
                  setValue={(value) => handleInputChange(value, "about")}
                />
              </CardBody>
            </Card>
            <br />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MyProfile;
