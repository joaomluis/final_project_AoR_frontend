import { Container, Button, Col, Row, Card, CardHeader, CardText, CardBody, CardTitle, Input, CardImg, Label, Form, FormGroup } from "reactstrap";

import { useParams } from "react-router-dom";

import { useEffect, useRef, useState } from "react";

import { useTranslation } from "react-i18next";
import { Api } from "../api";
import "../assets/css/general-css.css";
//TODO correct the label

import { useUserStore } from "../components/stores/useUserStore.js";

function MyProfile() {
  const { t } = useTranslation();
  const token = useUserStore((state) => state.token);
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [user, setUser] = useState({
    username: "",
    firstname: "",
    lastname: "",
    lablocation: "",
    about: "",
    role: "",
    imagePath: "",
    email: "",
    privateProfile: true,
    skills: [],
    interests: [],
  });
  const [projectsUser, setProjectsUser] = useState([]);

  async function handleGetUser() {
    const props = {
      id: id,
    };
    try {
      const response = await Api.getUsers(token, props);
      setUser(response.data.results[0]);
      setPage(1);
      setProjectsUser([]);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  const loadMore = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  async function handleGetUserProjects() {
    const props = {
      dtoType: "ProjectSideBarDto",
      participant_email: user.email,
      page_number: page,
      page_size: 2,
      order_field: "createddate",
      order_direction: "asc",
    };
    try {
      const response = await Api.getProjects(token, props);
      setProjectsUser((prevProjects) => [...prevProjects, ...response.data.results]);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error.message);
    }
  }
  const LabelText = ({ label, text }) => (
    <>
      <Row className="mb-2">
        <p>
          <strong className=" profile-label">{label}:</strong>
        </p>
        <p>{text}</p>
      </Row>
    </>
  );

  const projectsCard = (projects) => {
    if (!projectsUser) {
      return null; // ou algum tipo de indicador de carregamento
    }
    return (
      <Row>
        <Col md="12" className="mt-5">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">{t("projects")}</CardTitle>
            </CardHeader>
            <CardBody>
              {projectsUser.length === 0 ? (
                <p>{t("no-projects")}</p>
              ) : (
                <Row>
                  {projectsUser?.map((project, index) => (
                    <Col md="6" className="">
                      <Card className={`mb-3 project-card ${project.status}`}>
                        <CardBody>
                          <CardTitle>
                            <strong>{project.name}</strong>
                          </CardTitle>
                          <CardText>{project.status}</CardText>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}

              <Row>
                <Col>
                  {totalPages === page || projectsUser.length === 0 ? null : (
                    <Button className="btn" onClick={loadMore}>
                      {t("load-more")}
                    </Button>
                  )}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  };

  useEffect(() => {
    handleGetUser();
  }, []);
  useEffect(() => {
    if (user.email) {
      handleGetUserProjects();
    }
  }, [user.email, page]);

  function publicProfile() {
    return (
      <>
        <Row>
          <Col md="6" className="mt-5">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">{t("user-interests")}</CardTitle>
              </CardHeader>
              <CardBody> {user.interests && user.interests.join(", ")}</CardBody>
            </Card>
          </Col>
          <Col md="6" className="mt-5">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">{t("user-skills")}</CardTitle>
              </CardHeader>
              <CardBody> {user.skills && user.skills.join(", ")}</CardBody>
            </Card>
          </Col>
          {user.about ? (
            <Col className="mt-5">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">{t("about")}</CardTitle>
                </CardHeader>
                <CardBody>
                  <p>{user.about}</p>
                </CardBody>
              </Card>
              <br />
            </Col>
          ) : null}
        </Row>
        {projectsCard(projectsUser)}
      </>
    );
  }

  return (
    <div className="section4">
      <Container>
        <Row>
          <Col md="12" className=" mt-5">
            <Card>
              <CardBody>
                <Row className="mb-4">
                  <Col className="mb-4" xl="8" lg="6" md="6" sm="12">
                    <CardTitle tag="h4" className="profile-icons-container">
                      {user.firstname} {user.lastname}&nbsp;{user.username && `(${user.username})`}
                    </CardTitle>
                  </Col>
                  <Col
                    xl="4"
                    lg="6"
                    md="6"
                    sm="12"
                    style={{ display: "flex", justifyContent: "space-between", paddingLeft: "1rem", paddingRight: "1rem" }}
                  >
                    <Button style={{ width: "45%", margin: "0 5px" }}>{t("send-msg")}</Button>
                    <Button style={{ width: "45%", margin: "0 5px" }}>{t("invite-to-project")}</Button>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <CardImg
                      top
                      src={user.imagePath}
                      className="rounded-circle mb-4"
                      style={{ objectFit: "cover", width: "20vw", height: "20vw", border: "2px solid #000" }}
                    />
                  </Col>
                  <Col md="4">
                    <LabelText label={t("first-name")} text={user.firstname} />
                    <LabelText label={t("last-name")} text={user.lastname} />
                    <LabelText label={t("username")} text={user.username} />
                    <LabelText label={t("lab")} text={user.lablocation} />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {user.privateProfile ? <label>private</label> : publicProfile()}
      </Container>
    </div>
  );
}

export default MyProfile;
