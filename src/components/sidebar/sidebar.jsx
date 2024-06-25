import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaHome, FaUsers, FaTools, FaClipboard } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import { Link } from "react-router-dom";
import { useUserStore } from "../../stores/useUserStore";
import "./sidebar.css";
import { Api } from "../../api";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
function SideNavbar() {
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);
  const token = useUserStore((state) => state.token);
  const email = useUserStore((state) => state.email);
  const myOwnProjects = useUserStore((state) => state.myOwnProjects);
  const setMyOwnProjects = useUserStore((state) => state.updateMyOwnProjects);
  let statusClass = "";
  let statusName = "";
  //useEffect to handle the resizing of the side navbar

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function showMyProjects(name, status) {
    if (name != null && name.length > 8) {
      name = name.substring(0, 8) + "...";
    }

    if (status === "IN_PROGRESS") {
      statusClass = "in-progress";
      statusName = "In progress";
    }
    if (status === "PLANNING") {
      statusClass = "planning";
      statusName = "Planning";
    }
    if (status === "READY") {
      statusClass = "ready";
      statusName = "Ready";
    }
    if (status === "CANCELED") {
      statusClass = "cancelled";
      statusName = "Cancelled";
    }
    if (status === "FINISHED") {
      statusClass = "finished";
      statusName = "Finished";
    }

    return (
      <div className={`project-label ${statusClass}`}>
        {" "}
        {name}
        {/* <div className={`project-status ${statusClass}`}>{statusName}</div> */}
      </div>
    );
  }

  const props = {
    dtoType: "ProjectSideBarDto",
    participant_email: email,
    creator_email: email,
  };

  async function getMyProjects() {
    try {
      const response = await Api.getProjects(token, props);
      setMyOwnProjects(response.data.results);
      // setProjects(response.data.results);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getMyProjects();
  }, []);

  return (
    <Sidebar collapsed={collapsed} backgroundColor="#DBE2EF" style={{ minHeight: "100vh", maxHeight: "100vh", overflow: "auto" }}>
      <Menu>
        <div className="custom-link" onClick={() => navigate("/fica-lab/home")}>
          <MenuItem icon={<FaHome />}> {t("home")} </MenuItem>
        </div>
        <div className="custom-link" onClick={() => navigate("/fica-lab/email-list")}>
          <MenuItem icon={<MdEmail />}> {t("email")} </MenuItem>
        </div>
        <div className="custom-link" onClick={() => navigate("/fica-lab/project-list")}>
          <MenuItem icon={<FaClipboard />}> {t("projects")} </MenuItem>
        </div>
        <div className="custom-link" onClick={() => navigate("/fica-lab/product-list")}>
          <MenuItem icon={<FaTools />}> {t("products")} </MenuItem>
        </div>
        <div className="custom-link" onClick={() => navigate("/fica-lab/user-list")}>
          <MenuItem icon={<FaUsers />}> {t("users")} </MenuItem>
        </div>
        <SubMenu icon={<FaClipboard />} label={t("my-projects")}>
          {myOwnProjects
            ? myOwnProjects.map((project, index) => {
                return <MenuItem key={`${project.id}-${index}`}>{showMyProjects(project.name, project.status)}</MenuItem>;
              })
            : null}
        </SubMenu>
      </Menu>
    </Sidebar>
  );
}

export default SideNavbar;
