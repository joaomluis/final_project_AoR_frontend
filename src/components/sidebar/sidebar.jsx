import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaHome, FaUsers, FaTools, FaClipboard } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useUserStore } from "../../stores/useUserStore";
// import { useMailStore } from "../../stores/useMailStore";
import "./sidebar.css";
import { Api } from "../../api";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import IconWithBadge from "../icon/badge/icon-with-badge";
function SideNavbar() {
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);
  const token = useUserStore((state) => state.token);
  const email = useUserStore((state) => state.email);

  const myOwnProjects = useUserStore((state) => state.myOwnProjects);
  const setMyOwnProjects = useUserStore((state) => state.updateMyOwnProjects);
  let statusClass = "";
  let statusName = "";

  // const mailCount = useMailStore((state) => state.unreadCount);
  const mailCount = useUserStore((state) => state.unreadEmails);
  const productCount = 0;
  const projectCount = 0;
  const userCount = 0;

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

  // const IconWithBadge = ({ icon, badgeCount, collapsed }) => {
  //   const badgeStyle = collapsed
  //     ? {
  //         position: "absolute",
  //         top: "10px",
  //         right: "0",
  //         background: "red",
  //         borderRadius: "50%",
  //         height: "8px",
  //         width: "8px",
  //         transform: "translate(50%, -50%)",
  //       }
  //     : {
  //         position: "absolute",
  //         top: "10px",
  //         right: "0",
  //         background: "red",
  //         color: "white",
  //         borderRadius: "50%",
  //         padding: "0",
  //         height: "16px",
  //         width: "16px",
  //         display: "flex",
  //         alignItems: "center",
  //         justifyContent: "center",
  //         fontSize: "10px",
  //         transform: "translate(50%, -50%)",
  //       };

  //   return (
  //     <div style={{ position: "relative" }}>
  //       {icon}
  //       {badgeCount > 0 && <span style={badgeStyle}>{!collapsed && badgeCount}</span>}
  //     </div>
  //   );
  // };

  const collapsedStyle = {
    fontSize: "1.8rem",
  };

  return (
    <Sidebar collapsed={collapsed} backgroundColor="#DBE2EF" style={{ minHeight: "100vh", maxHeight: "100vh", overflow: "auto" }}>
      <Menu>
        <div className="custom-link" onClick={() => navigate("/fica-lab/home")}>
          <MenuItem icon={<FaHome style={collapsed ? collapsedStyle : ""} />}> {t("home")} </MenuItem>
        </div>
        <div className="custom-link" onClick={() => navigate("/fica-lab/email-list")}>
          <MenuItem icon={<IconWithBadge icon={<MdEmail style={collapsed ? collapsedStyle : ""} />} badgeCount={mailCount} collapsed={collapsed} />}>
            {" "}
            {t("email")}{" "}
          </MenuItem>
        </div>
        <div className="custom-link" onClick={() => navigate("/fica-lab/project-list")}>
          <MenuItem
            icon={<IconWithBadge icon={<FaClipboard style={collapsed ? collapsedStyle : ""} />} badgeCount={projectCount} collapsed={collapsed} />}
          >
            {" "}
            {t("projects")}
          </MenuItem>
        </div>
        <div className="custom-link" onClick={() => navigate("/fica-lab/product-list")}>
          <MenuItem icon={<IconWithBadge icon={<FaTools style={collapsed ? collapsedStyle : ""} />} badgeCount={productCount} collapsed={collapsed} />}>
            {" "}
            {t("products")}
          </MenuItem>
        </div>
        <div className="custom-link" onClick={() => navigate("/fica-lab/user-list")}>
          <MenuItem icon={<IconWithBadge icon={<FaUsers style={collapsed ? collapsedStyle : ""} />} badgeCount={userCount} collapsed={collapsed} />}>
            {" "}
            {t("users")}
          </MenuItem>
        </div>
        <SubMenu icon={<FaClipboard style={collapsed ? collapsedStyle : ""} />} label={t("my-projects")}>
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
