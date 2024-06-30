import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
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
function ProjectPage() {
  const { t } = useTranslation();
  const token = useUserStore((state) => state.token);
  const [activeTab, setActiveTab] = useState("1");
  const socket = webSocketStore((state) => state.socket);
  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams();
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const [projectData, setProjectData] = useState({});

  const props = {
    dtoType: "ProjectDto",
    id: id,
  };

  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await Api.getProjectsByDto(token, props);
        setProjectData(response.data.results[0]);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchProject();
  }, []);

  /**
   * Envia uma mensagem ao backend informando que o usuário fechou a página ou está navegando para outra
   */
  useEffect(() => {
    // Função que envia uma mensagem ao backend informando que o usuário fechou a página ou está navegando para outra
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

  return (
    <div className="section4">
      <Container>
        <Row>
          <Col md="12" className=" mt-5">
            <Card>
              <Row>
                <Col md="12" sm="8">
                  <CardBody>
                    <Row>
                      <Col className="mb-4" md="10">
                        <CardTitle tag="h4">{projectData.name}</CardTitle>
                      </Col>
                      <Col md="2"></Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <Nav tabs>
                          <NavItem>
                            <NavLink
                              className={classnames({
                                active: activeTab === "1",
                              })}
                              onClick={() => {
                                toggle("1");
                              }}
                            >
                              Gantt Chart
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
                              Kanban
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
                              Logs
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className={classnames({
                                active: activeTab === "4",
                              })}
                              onClick={() => {
                                toggle("4");
                              }}
                            >
                              Settings
                            </NavLink>
                          </NavItem>
                        </Nav>
                        <TabContent activeTab={activeTab}>
                          <TabPane tabId="1">
                            <p>Tab 1 content</p>
                          </TabPane>
                          <TabPane tabId="2">
                            <p>Tab 2 content</p>
                          </TabPane>
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
    </div>
  );
}

export default ProjectPage;
