import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu} from "react-pro-sidebar";
import { FaHome, FaUsers, FaTools, FaClipboard } from 'react-icons/fa';

import HomeIcon from "../../assets/icons/home-icon.png";

function SideNavbar() {
  const [collapsed, setCollapsed] = useState(false);

  //useEffect to handle the resizing of the side navbar
  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Sidebar
      collapsed={collapsed}
      style={{ marginTop: "65px", height: "calc(100vh - 65px)" }}
    >
      <Menu>
      <MenuItem icon={<FaHome />}> Home </MenuItem>
      <MenuItem icon={<FaClipboard />}> Projects List </MenuItem>
      <MenuItem icon={<FaTools />}> Components List </MenuItem>
      <MenuItem icon={<FaUsers />}> Users List </MenuItem>
        <SubMenu icon={<FaClipboard />}  label="My Projects">
          <MenuItem > Project 1 </MenuItem>
          <MenuItem> Project 2 </MenuItem>
        </SubMenu>
        
      </Menu>
    </Sidebar>
  );
}

export default SideNavbar;
