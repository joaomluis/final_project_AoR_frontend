import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaHome, FaUsers, FaTools, FaClipboard } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import "./sidebar.css";
import { Api } from "../../api";
function SideNavbar() {
  const [collapsed, setCollapsed] = useState(false);
  const [projects, setProjects] = useState([{}]);
  const token = useUserStore((state) => state.token);
  const email = useUserStore((state) => state.email);
  let statusClass = "";
  let statusName = "";
  //useEffect to handle the resizing of the side navbar
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
    dtoType: "ProjectDto",
    participant_email: email,
  };

  async function getMyProjects() {
    try {
      const response = await Api.getProjectsByDto(token, props);
      setProjects(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getMyProjects();
  }, []);

  return (
    <Sidebar
      collapsed={collapsed}
      backgroundColor="#DBE2EF"
      style={{ minHeight: "100vh", maxHeight: "100vh", overflow: "auto" }}
    >
      <Menu>
        <Link to="/fica-lab/home" className="custom-link">
          <MenuItem icon={<FaHome />}> Home </MenuItem>
        </Link>
        <MenuItem icon={<FaClipboard />}> Projects List </MenuItem>
        <MenuItem icon={<FaTools />}> Components List </MenuItem>
        <MenuItem icon={<FaUsers />}> Users List </MenuItem>
        <SubMenu icon={<FaClipboard />} label="My Projects">
          {projects
            ? projects.map((project) => (
                <MenuItem key={project.id}>
                  {showMyProjects(project.name, project.status)}
                </MenuItem>
              ))
            : null}
        </SubMenu>
      </Menu>
    </Sidebar>
  );
}

export default SideNavbar;
