import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import classnames from "classnames";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardSubtitle,
  CardTitle,
  Row,
  Table,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import Select from "react-select";
import { FaCheck, FaTimes, FaEye } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";
import UserType from "../components/enums/UserType.js";
import ProjectStatus from "../components/enums/ProjectStatus.js";
import "../components/Project/lists/users-list-table-card.css";
import ListLayout from "../layout/list-layout/list.jsx";
import { Api } from "../api.js";
import { useUserStore } from "../stores/useUserStore.js";
import { use } from "i18next";
import { terror, tsuccess } from "../components/toasts/message-toasts.jsx";
import PaginationComponent from "../components/pagination/pagination.jsx";

const AdminPage = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [activeTab, setActiveTab] = useState("1");
  const token = useUserStore((state) => state.token);
  const [projects, setProjects] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  const pageParam = searchParams.get("page") || 1;

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const handlePageChange = (newPage) => {
    searchParams.set("page", newPage);
    setSearchParams(searchParams);
  };

  async function fetchProjects() {
    const page = parseInt(pageParam, 10) || 1;
    const props = {
      page_number: page,
      page_size: 1,
    };
    try {
      const response = await Api.getReadyProject(token, props);
      setTotalPages(response.data.totalPages);
      console.log(response.data.results);
      setProjects(response.data.results);
      if (pageParam === "1") removePageParam();
    } catch (error) {
      console.error(error);
    }
  }
  const removePageParam = () => {
    searchParams.delete("page");
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const page = searchParams.get("page");
    if (page) {
      setCurrentPage(parseInt(page, 10));
    }
    if (activeTab === "1") {
      fetchProjects();
    } else if (activeTab === "2") {
      removePageParam();
    }
  }, [pageParam, activeTab]);

  const handleAcceptResume = async (id, accept) => {
    const props = {
      userId: id,
      accept: accept,
    };
    try {
      const response = await Api.acceptProject(token, id, props);
      if (accept) tsuccess(t("project-accepted"));
      else tsuccess(t("project-rejected"));
      fetchProjects();
    } catch (error) {
      terror(error.message);
    }
  };

  const getRoleLabel = (roleValue) => {
    const roleKey = ProjectStatus.fromValue(roleValue);
    return roleKey ? roleKey.charAt(0).toUpperCase() + roleKey.slice(1).toLowerCase() : "";
  };

  const renderTable = () => (
    <div className="table-responsive">
      <Table responsive bordered>
        <thead>
          <tr>
            <th>{t("name")}</th>

            <th>{t("lab")}</th>

            <th>{t("actions")}</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>
                <div>{project.name}</div>
                <div>
                  <strong>{getRoleLabel(project.status)}</strong>
                </div>
              </td>
              <td>{project.lab}</td>

              <td>
                <div className="d-flex justify-content-around">
                  <Link to={`/fica-lab/project/${project.id}`} className="btn btn-link p-0">
                    <FaEye size={20} color="blue" />
                  </Link>
                  <Button color="link" onClick={() => handleAcceptResume(project.id, true)} className="p-0">
                    <FaCheck size={20} color="green" />
                  </Button>
                  <Button color="link" onClick={() => handleAcceptResume(project.id)} className="p-0">
                    <FaTimes size={20} color="red" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );

  const renderCards = () => (
    <Row>
      {projects.map((project) => (
        <Col key={project.id} sm="12" md="6" lg="4" className="mb-4">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">
                <div className="d-flex align-items-center">{project.name}</div>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <CardSubtitle className="mb-2">
                <strong>{getRoleLabel(project.status)}</strong>
              </CardSubtitle>
              <CardSubtitle>
                {t("lab")}: <strong>{project.lab}</strong>
              </CardSubtitle>
            </CardBody>
            <CardFooter style={{ display: "flex", justifyContent: "space-around" }}>
              <Button color="link" onClick={() => handleAcceptResume(project.id, true)} className="p-0">
                <FaCheck size={20} color="green" />
              </Button>
              <Link to={`/fica-lab/project/${project.id}`} className="btn btn-link p-0">
                <FaEye size={20} color="blue" />
              </Link>
              <Button color="link" onClick={() => handleAcceptResume(project.id)} className="p-0">
                <FaTimes size={20} color="red" />
              </Button>
            </CardFooter>
          </Card>
        </Col>
      ))}
    </Row>
  );
  const renderNoDataMessage = () => <div className="no-data-message">{t("no-data-available")}</div>;

  return (
    <>
      <ListLayout title={t("admin")} loading={false} toggleCreate={false} toggleOrder={false} toggleFilter={false}>
        <Col md="12">
          <Nav tabs style={{ cursor: "pointer" }}>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "1" })}
                onClick={() => {
                  toggle("1");
                }}
              >
                {t("projects")}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "2" })}
                onClick={() => {
                  toggle("2");
                }}
              >
                {t("settings")}
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  <div>{projects.length === 0 ? renderNoDataMessage() : isMobile ? renderCards() : renderTable()}</div>{" "}
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              {/* Content for settings tab */}
              <h4>{t("settings")}</h4>
            </TabPane>
          </TabContent>
        </Col>
        {activeTab !== "2" && <PaginationComponent currentPage={currentPage} totalPages={totalPages} setCurrentPage={handlePageChange} />}
      </ListLayout>
    </>
  );
};

export default AdminPage;
