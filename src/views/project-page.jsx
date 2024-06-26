import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap";
import {Api} from "../api.js";
import { useEffect } from "react";
import { useUserStore } from "../components/stores/useUserStore.js";

function ProjectPage() {
  const { t } = useTranslation();
  const token = useUserStore((state) => state.token);
  const [activeTab, setActiveTab] = useState("1");

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
        console.log(response.data.results);
        setProjectData(response.data.results);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchProject();
    
    console.log(projectData);
  }, []);


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
                        </Nav>
                        <TabContent activeTab={activeTab}>
                          <TabPane tabId="1">
                            <p>Tab 1 content</p>
                          </TabPane>
                          <TabPane tabId="2">
                            <p>Tab 2 content</p>
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
