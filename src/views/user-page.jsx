import {
  Container,
  Button,
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
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import Select from "react-select";

import { useParams, Link, useNavigate } from "react-router-dom";

import { useEffect, useRef, useState } from "react";
import { tsuccess, terror } from "../components/toasts/message-toasts.jsx";
import { useTranslation } from "react-i18next";
import { Api } from "../api";
import ModalInviteToProject from "../components/modals/modal-inv-project.jsx";
import ModalMail from "../components/modals/modal-mail.jsx";
import "../assets/css/general-css.css";
import ConfirmModal from "../components/modals/modal-confirm.jsx";
import UserType from "../components/enums/UserType.js";
import { useUserStore } from "../stores/useUserStore.js";

function MyProfile() {
  const { t } = useTranslation();
  const token = useUserStore((state) => state.token);

  const navigate = useNavigate();
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isOpenModalInvite, setIsOpenModalInvite] = useState(false);
  const myOwnProjects = useUserStore((state) => state.myOwnProjects);
  const [userType, setUserType] = useState("");
  const [profile, setProfile] = useState(30); // [user, projectsUser
  const [isOpenModalMail, setIsOpenModalMail] = useState(false);
  const toggleModalMail = () => setIsOpenModalMail(!isOpenModalMail);
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
  const [isModalRoleChange, setIsModalRoleChange] = useState(false);
  const toggleModalRoleChange = () => setIsModalRoleChange(!isModalRoleChange);

  const isAdmin = userType === UserType.ADMIN;
  const isDifferentProfile = UserType.fromName(profile) !== userType;
  const showButton = isAdmin && isDifferentProfile;
  const displayModeOptions = [
    { value: "createddate", label: t("date") },
    { value: "status", label: t("status") },
  ];

  const [displayMode, setDisplayMode] = useState(displayModeOptions[0].value);
  const [order, setOrder] = useState("asc");
  const handleChange = (selectedOption) => {
    setProjectsUser([]);
    setPage(1);

    setDisplayMode(selectedOption.value);
    if (selectedOption.value === displayMode) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setOrder("asc");
    }

    console.log(selectedOption.value);
    console.log(order);
  };

  async function handleRoleChange() {
    const props = {
      label: user.email,
      value: 1,
    };
    try {
      const response = await Api.changeRole(token, props);
      setIsModalRoleChange(false);
      tsuccess("role-changed");
    } catch (error) {
      terror(error.message);
    }
  }

  async function handleGetUser() {
    const props = {
      id: id,
    };
    try {
      const response = await Api.getUsers(token, props);
      setUser(response.data.results[0]);
      setUserType(response.data.userType);
      setProfile(response.data.results[0].role);
      setPage(1);
      setProjectsUser([]);
    } catch (error) {
      console.log(error.message);
    }
  }

  const loadMore = () => {
    if (page <= totalPages) {
      setPage(page + 1);
    }
  };

  async function handleGetUserProjects() {
    const props = {
      dtoType: "ProjectSideBarDto",
      participant_email: user.email,
      page_number: page,
      page_size: 4,

      order_direction: order,
      order_field: displayMode,
    };
    console.log(props.order_direction);
    console.log(props.order_field);
    try {
      const response = await Api.getProjects(token, props);

      setProjectsUser((prevProjects) => [...prevProjects, ...response.data.results]);
      setTotalPages(response.data.totalPages);
      console.log(response.data.results);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleInviteUser(projectName) {
    const project = myOwnProjects.find((p) => p.name === projectName);
    const props = {
      id: project.id,
      invitedUserEmail: user.email,
    };
    try {
      const response = await Api.inviteUserToProject(token, props);
      toggleModalInvite();
      tsuccess("User invited to project");
    } catch (error) {
      terror(error.message);
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
  function handleClickProject(id) {
    navigate(`/fica-lab/project/${id}`);
  }
  const [projectsToInvite, setProjectsToInvite] = useState([]);

  async function handleGetProjectsToInvite() {
    console.log(token);
    try {
      const response = await Api.getProjectsToInviteUser(token, user.email);
      setProjectsToInvite(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  const toggleModalInvite = async () => {
    console.log("toggle");
    console.log(token);
    console.log(user.email);
    await handleGetProjectsToInvite();

    setIsOpenModalInvite(!isOpenModalInvite);
  };

  const customStyles = {
    container: (provided) => ({
      ...provided,
      display: "flex",
      justifyContent: "flex-end",
      width: "100%",
      marginRight: "10px", // Ajusta marginRight para espaçamento
      fontSize: "1rem",
    }),
  };

  const miniCard = (project) => {
    console.log(project.status);
    const getColor = (status) => {
      switch (status) {
        case "PLANNING":
          return "var(--planning)";
        case "READY":
          return "var(--ready)";
        case "IN_PROGRESS":
          return "var(--in-progress)";
        case "FINISHED":
          return "var(--finished)";
        default:
          return "";
      }
    };
    const borderColor = getColor(project.status);

    return (
      <Col md="6" lg="4" className="mb-4">
        <Card className={`shadow-sm`} style={{ borderLeft: `2px solid ${borderColor}`, borderRight: `2px solid ${borderColor}` }}>
          <CardHeader tag="h5" className="font-weight-bold" style={{ borderBottom: `1px solid ${borderColor}`, backgroundColor: "transparent" }}>
            {project.name}
          </CardHeader>
          <CardBody>
            <CardText className="text-muted">
              {"status"}: <span className="text-capitalize">{project.status}</span>
            </CardText>
            <div className="d-flex">
              {" "}
              <Button size="sm" color="secondary" onClick={() => handleClickProject(project.id)}>
                {t("view-project")}
              </Button>
            </div>
          </CardBody>
        </Card>
      </Col>
    );
  };

  const projectsCard = (projects) => {
    if (!projectsUser) {
      return null; // ou algum tipo de indicador de carregamento
    }

    return (
      <Row>
        <Col md="12" className="mt-5">
          <Card className={"card-no-hover"}>
            <CardHeader>
              <CardTitle tag="h4">
                {t("projects")}
                <Select
                  className="mt-2 mb-2 mr-2"
                  options={displayModeOptions}
                  value={displayModeOptions.find((option) => option.value === displayMode)}
                  onChange={handleChange}
                  styles={customStyles}
                />
              </CardTitle>
            </CardHeader>
            <CardBody>
              {projectsUser.length === 0 ? <p>{t("no-projects")}</p> : <Row>{projectsUser?.map((project, index) => miniCard(project))}</Row>}
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
      console.log("get user projects");
    }
  }, [user.email, page, displayMode, order]);

  function publicProfile() {
    return (
      <>
        <Row>
          <Col md="6" className="mt-5">
            <Card className={"card-no-hover"}>
              <CardHeader>
                <CardTitle tag="h4">{t("user-interests")}</CardTitle>
              </CardHeader>
              <CardBody> {user.interests && user.interests.join(", ")}</CardBody>
            </Card>
          </Col>
          <Col md="6" className="mt-5">
            <Card className={"card-no-hover"}>
              <CardHeader>
                <CardTitle tag="h4">{t("user-skills")}</CardTitle>
              </CardHeader>
              <CardBody> {user.skills && user.skills.join(", ")}</CardBody>
            </Card>
          </Col>
          {user.about ? (
            <Col className="mt-5">
              <Card className={"card-no-hover"}>
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
            {showButton ? (
              <Button style={{ backgroundColor: "var(--admin)", color: "var(--secondary-color)" }} onClick={toggleModalRoleChange}>
                {t("promove-user")}
              </Button>
            ) : null}

            <Card>
              <CardBody>
                <Row className="mb-4">
                  <Col className="mb-4" xl="8" lg="6" md="12" sm="12">
                    <CardTitle tag="h4" className="profile-icons-container">
                      {user.firstname} {user.lastname}&nbsp;{user.username && `(${user.username})`}
                    </CardTitle>
                  </Col>

                  <Col
                    xl="4"
                    lg="6"
                    md="12"
                    sm="12"
                    style={{ display: "flex", justifyContent: "space-between", paddingLeft: "1rem", paddingRight: "1rem" }}
                  >
                    <Button outline onClick={toggleModalMail} style={{ width: "100%", margin: "0 5px" }}>
                      {t("send-msg")}
                    </Button>
                    {myOwnProjects.length > 0 ? (
                      <Button outline onClick={toggleModalInvite} style={{ width: "100%", margin: "0 5px" }}>
                        {t("invite-to-project")}
                      </Button>
                    ) : null}
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
        {user.privateProfile ? <></> : publicProfile()}
      </Container>
      <ModalInviteToProject
        isOpen={isOpenModalInvite}
        onClose={toggleModalInvite}
        header={t("invite-to-project")}
        title={t("select-project")}
        // subtitle={t("select-project-to-invite")}
        projects={projectsToInvite ? projectsToInvite.map((project) => project.name) : []}
        handleInviteUser={handleInviteUser}
      />

      <ModalMail isOpen={isOpenModalMail} onClose={toggleModalMail} user={user} />
      <ConfirmModal title={"promove-user"} isOpen={isModalRoleChange} toggle={toggleModalRoleChange} onConfirm={handleRoleChange} />
    </div>
  );
}

export default MyProfile;
