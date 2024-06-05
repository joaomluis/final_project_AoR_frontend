import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap';

function ProjectPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

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
                        <CardTitle tag="h4">Project Name</CardTitle>
                      </Col>
                      <Col md="2">
                        
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <Nav tabs>
                          <NavItem>
                            <NavLink
                              className={classnames({ active: activeTab === '1' })}
                              onClick={() => { toggle('1'); }}
                            >
                              Gantt Chart
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className={classnames({ active: activeTab === '2' })}
                              onClick={() => { toggle('2'); }}
                            >
                              Kanban
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className={classnames({ active: activeTab === '3' })}
                              onClick={() => { toggle('3'); }}
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