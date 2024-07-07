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
  const [modalSendInvite, setModalSendInvite] = useState(false);
  const [modalLeaveProject, setModalLeaveProject] = useState(false);
  const toggleModalSendInvite = () => setModalSendInvite(!modalSendInvite);
  const toggleModalLeaveProject = () => setModalLeaveProject(!modalLeaveProject);

  const { id } = useParams();
  const numericId = parseInt(id);
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const [projectData, setProjectData] = useState({});
  const clearMessages = useMessageStore((state) => state.clear); // Acessando a ação clear da store

  const props = {
    dtoType: "ProjectDto",
    id: id,
  };

  useEffect(() => {
    async function fetchProject() {
      useMessageStore.getState().setHasNewItems(false);
      clearMessages(); // Limpa as mensagens ao carregar a página
      try {
        const response = await Api.getProjects(token, props);
        setProjectData(response.data.results[0]);
        setUserType(response.data.userType);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchProject();
  }, [id]);

  async function handleSendInvite() {
    try {
      const response = await Api.sendProposed(token, numericId);
      console.log(response);
      tsuccess("Invite sent!");
      toggleModalSendInvite();
    } catch (error) {
      terror(error);
    }
  }

  async function handleLeaveProject() {
    try {
      const response = await Api.leaveProject(token, numericId);
      console.log(response);
      tsuccess("You left the project!");
      navigate("/fica-lab/home");
      toggleModalLeaveProject();
    } catch (error) {
      terror(error.message);
    }
  }

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

  return (
    <div className="section4" style={{ position: "relative" }}>
      <Loading loading={loading} />
      <Container>
        <Row>
          <Col md="12" className=" mt-0">
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
                          {userType === UserType.MANAGER || userType === UserType.NORMAL ? (
                            <Button color="danger" className="" onClick={toggleModalLeaveProject}>
                              {t("leave")}
                            </Button>
                          ) : (
                            <Button className="" onClick={toggleModalSendInvite}>
                              {t("send-inv")}
                            </Button>
                          )}
                        </div>
                      </Col>
                      <Col md="2"></Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <Nav tabs style={{ cursor: "pointer" }}>
                          {userType === UserType.NORMAL || userType === UserType.MANAGER ? (
                            <>
                              <NavItem>
                                <NavLink
                                  className={classnames({
                                    active: activeTab === "4",
                                  })}
                                  onClick={() => {
                                    toggle("4");
                                  }}
                                >
                                  {userType === UserType.MANAGER ? t("settings") : t("info")}
                                </NavLink>
                              </NavItem>
                              <NavItem>
                                <NavLink
                                  className={classnames({
                                    active: activeTab === "2",
                                  })}
                                  onClick={() => {
                                    toggle("2");
                                  }}
                                >
                                  {t("gantt")}
                                </NavLink>
                              </NavItem>
                              <NavItem>
                                <NavLink
                                  className={classnames({
                                    active: activeTab === "1",
                                    "has-new-items": hasNewItems,
                                  })}
                                  onClick={() => {
                                    toggle("1");
                                  }}
                                >
                                  {t("chat")}
                                  {hasNewItems && <span className="new-items-dot"></span>} {/* Renderiza o ponto vermelho se houver novidades */}
                                </NavLink>
                              </NavItem>

                              <NavItem>
                                <NavLink
                                  className={classnames({
                                    active: activeTab === "3",
                                  })}
                                  onClick={() => {
                                    toggle("3");
                                  }}
                                >
                                  {t("logs")}
                                </NavLink>
                              </NavItem>
                              {userType === UserType.MANAGER ? (
                                <>
                                  <NavItem>
                                    <NavLink
                                      className={classnames({
                                        active: activeTab === "5",
                                      })}
                                      onClick={() => {
                                        toggle("5");
                                      }}
                                    >
                                      {t("users")}
                                    </NavLink>
                                  </NavItem>
                                  <NavItem>
                                    <NavLink
                                      className={classnames({
                                        active: activeTab === "6",
                                      })}
                                      onClick={() => {
                                        toggle("6");
                                      }}
                                    >
                                      {t("invites")}
                                    </NavLink>
                                  </NavItem>{" "}
                                </>
                              ) : null}
                            </>
                          ) : null}
                        </Nav>

                        <TabContent activeTab={activeTab}>
                          {userType === UserType.NORMAL || userType === UserType.MANAGER ? (
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
                          ) : null}
                          {userType === UserType.MANAGER ? (
                            <>
                              <TabPane tabId="5">
                                <EditUsersPage id={numericId} edit={true} />
                              </TabPane>
                              <TabPane tabId="6">
                                <UserInvitationsPage id={numericId} />
                              </TabPane>
                            </>
                          ) : null}
                          <TabPane tabId="4">
                            <ProjectSettings data={projectData} />
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
      <ConfirmModal isOpen={modalSendInvite} toggle={toggleModalSendInvite} title={t("send-inv")} onConfirm={handleSendInvite} />
      <ConfirmModal isOpen={modalLeaveProject} toggle={toggleModalLeaveProject} title={t("leave")} onConfirm={handleLeaveProject} />
    </div>
  );
}

export default ProjectPage;
