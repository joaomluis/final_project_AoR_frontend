import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { Button } from "reactstrap";
import classnames from "classnames";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap";
import { Api } from "../api.js";
import { useEffect } from "react";
import { useUserStore } from "../stores/useUserStore.js";
import ProjectSettings from "../components/Project/project-settings.jsx";
import { webSocketStore } from "../stores/useWebSocketStore";
import NotificationType from "../components/websockets/NotificationType.js";
import ProjectMainPage from "../components/Project/project-main-page.jsx";
import UserType from "../components/enums/UserType.js";
import useMessageStore from "../stores/useMessageStore.js";
import { use } from "i18next";
import LogsCard from "../components/logs/logs.jsx";
import Gantt from "frappe-gantt";
import GanttChart from "../components/Project/gant-chart.jsx";
import UsersManagement from "../components/Project/project-users-management.jsx";
import EditUsersPage from "../components/Project/lists/users-edit-page.jsx";
import UserInvitationsPage from "../components/Project/lists/users-invitations-page.jsx";
import Loading from "../components/loading/loading-overlay.jsx";
import { set } from "date-fns";
import ConfirmModal from "../components/modals/modal-confirm.jsx";
import { terror, tsuccess } from "../components/toasts/message-toasts.jsx";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import CancelProjectModal from "../components/modals/modal-project-cancelled.jsx";

function ProjectPage() {
  const { t } = useTranslation();
  const token = useUserStore((state) => state.token);
  const activeTab = useMessageStore((state) => state.activeTab);
  const hasNewItems = useMessageStore((state) => state.hasNewItems);
  const setActiveTab = useMessageStore((state) => state.setActiveTab);
  const socket = webSocketStore((state) => state.socket);
  const navigate = useNavigate();
  const location = useLocation();
  const [userType, setUserType] = useState("");
  const [loading, setLoading] = useState(false);
  const userLogged = useUserStore((state) => state.userType);
  // const [modalSendInvite, setModalSendInvite] = useState(false);
  // const [modalLeaveProject, setModalLeaveProject] = useState(false);
  // const [modalCancelProject, setModalCancelProject] = useState(false);
  // const toggleModalSendInvite = () => setModalSendInvite(!modalSendInvite);
  // const toggleModalLeaveProject = () => setModalLeaveProject(!modalLeaveProject);
  // const toggleModalCancelProject = () => setModalCancelProject(!modalCancelProject);
  const [showModal, setShowModal] = useState(false);

  const toggleInfoModal = () => setShowModal(!showModal);

  const { id } = useParams();
  const numericId = parseInt(id);
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const [projectData, setProjectData] = useState({});
  const clearMessages = useMessageStore((state) => state.clear); // Acessando a ação clear da store
  const isProjectInactive = projectData.status === "CANCELLED" || projectData.status === "FINISHED" || projectData.status === "READY";

  const props = {
    dtoType: "ProjectDto",
    id: id,
  };

  const fetchProject = async () => {
    useMessageStore.getState().setHasNewItems(false);
    clearMessages(); // Limpa as mensagens ao carregar a página
    try {
      const response = await Api.getProjects(token, props);
      console.log(response.data.results[0]);
      setProjectData(response.data.results[0]);
      setUserType(response.data.userType);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchProject();
    setActiveTab("4");
  }, []);

  useEffect(() => {
    console.log("ProjectPage useEffect");
    if (activeTab === "4") {
      fetchProject();
    } else if (activeTab == null) {
      setActiveTab("4");
    }
  }, [activeTab]);

  // async function handleSendInvite() {

  /**
   * Envia uma mensagem ao backend informando que o user fechou a página ou está navegando para outra
   */
  useEffect(() => {
    // Função que envia uma mensagem ao backend informando que o user fechou a página ou está navegando para outra
    const informBackendOnCloseOrNavigate = () => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        const closeMessage = {
          id: id,
          type: NotificationType.PROJECT_CLOSE,
        };
        let messageJSON = JSON.stringify(closeMessage);
        console.log("Enviando mensagem ao backend:", messageJSON);
        socket.send(messageJSON);
      }
    };

    // Listener para o evento beforeunload
    window.addEventListener("beforeunload", informBackendOnCloseOrNavigate);

    return () => {
      window.removeEventListener("beforeunload", informBackendOnCloseOrNavigate);
      // Chama a função ao desmontar o componente ou quando a rota muda
      informBackendOnCloseOrNavigate();
    };
  }, [socket, id, location.pathname]);

  if (activeTab === "1") {
    useMessageStore.getState().setHasNewItems(false);
  }
  function getColorByStatus(status) {
    switch (status) {
      case "CANCELLED":
        return "var(--cancelled)";
      case "READY":
        return "var(--ready)";
      case "FINISHED":
        return "var(--finished)";
      default:
        return "var(--greyish)";
    }
  }

  // Uso
  const color = getColorByStatus(projectData.status);

  return (
    <div className="section4" style={{ position: "relative" }}>
      {isProjectInactive && userLogged !== UserType.ADMIN && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "white",
              textAlign: "center",
            }}
          >
            <h2 style={{ color: color, backgroundColor: "black", borderRadius: "10px", padding: "1rem" }}>{projectData.status}</h2>
            <Button color="primary" onClick={toggleInfoModal}>
              {t("more-info")}
            </Button>
          </div>
        </div>
      )}
      <Loading loading={loading} />
      <Container>
        <Row>
          <Col md="12" className="mt-0">
            <Card className="card-no-hover">
              <Row>
                <Col xl="12" lg="12" md="12" sm="12">
                  <CardBody>
                    <Row>
                      <Col className="mb-4" md="12">
                        <div className="d-flex justify-content-between align-items-center">
                          <CardTitle tag="h4" className="m-0">
                            {projectData.name}
                          </CardTitle>
                        </div>
                      </Col>
                      <Col md="2"></Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <Nav tabs style={{ cursor: "pointer" }}>
                          {(userType === UserType.NORMAL || userType === UserType.MANAGER) && !isProjectInactive && (
                            <>
                              <NavItem>
                                <NavLink className={classnames({ active: activeTab === "4" })} onClick={() => toggle("4")}>
                                  {userType === UserType.MANAGER ? t("settings") : t("info")}
                                </NavLink>
                              </NavItem>
                              <NavItem>
                                <NavLink className={classnames({ active: activeTab === "2" })} onClick={() => toggle("2")}>
                                  {t("gantt")}
                                </NavLink>
                              </NavItem>
                              <NavItem>
                                <NavLink className={classnames({ active: activeTab === "1", "has-new-items": hasNewItems })} onClick={() => toggle("1")}>
                                  {t("chat")}
                                  {hasNewItems && <span className="new-items-dot"></span>}
                                </NavLink>
                              </NavItem>
                              <NavItem>
                                <NavLink className={classnames({ active: activeTab === "3" })} onClick={() => toggle("3")}>
                                  {t("logs")}
                                </NavLink>
                              </NavItem>
                              {userType === UserType.MANAGER && !isProjectInactive && (
                                <>
                                  <NavItem>
                                    <NavLink className={classnames({ active: activeTab === "5" })} onClick={() => toggle("5")}>
                                      {t("users")}
                                    </NavLink>
                                  </NavItem>
                                  <NavItem>
                                    <NavLink className={classnames({ active: activeTab === "6" })} onClick={() => toggle("6")}>
                                      {t("invites")}
                                    </NavLink>
                                  </NavItem>
                                </>
                              )}
                            </>
                          )}
                        </Nav>

                        <TabContent activeTab={activeTab}>
                          {(userType === UserType.NORMAL || userType === UserType.MANAGER) && !isProjectInactive && (
                            <>
                              <TabPane tabId="1">
                                <ProjectMainPage id={numericId} />
                              </TabPane>
                              <TabPane tabId="2">
                                <GanttChart id={numericId} />
                              </TabPane>
                              <TabPane tabId="3">
                                <LogsCard id={numericId} />
                              </TabPane>
                            </>
                          )}
                          {userType === UserType.MANAGER && (
                            <>
                              <TabPane tabId="5">
                                <EditUsersPage id={numericId} edit={true} />
                              </TabPane>
                              <TabPane tabId="6">
                                <UserInvitationsPage id={numericId} />
                              </TabPane>
                            </>
                          )}
                          <TabPane tabId="4">
                            <ProjectSettings data={projectData} userType={userType} />
                          </TabPane>
                        </TabContent>
                      </Col>
                    </Row>
                  </CardBody>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* <ConfirmModal isOpen={modalSendInvite} toggle={toggleModalSendInvite} title={t("send-inv")} onConfirm={handleSendInvite} />
      <ConfirmModal isOpen={modalLeaveProject} toggle={toggleModalLeaveProject} title={t("leave")} onConfirm={handleLeaveProject} />
      <CancelProjectModal isOpen={modalCancelProject} toggle={toggleModalCancelProject} title={t("cancel-project")} onConfirm={handleCancelProject} /> */}
      <Modal isOpen={showModal} toggle={toggleInfoModal}>
        <ModalHeader toggle={toggleInfoModal}>
          {t("status")} - {projectData.status}
        </ModalHeader>
        <ModalBody>{t("project-status-info", projectData.description)}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleInfoModal}>
            {t("close")}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ProjectPage;
