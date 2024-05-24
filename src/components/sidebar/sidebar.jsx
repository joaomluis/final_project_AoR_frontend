import React from 'react';

import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

function SideNavbar() {
  return (
    

    <Sidebar style={{marginTop:"65px", height: "calc(100vh - 65px)"}}>
      <Menu>
        <SubMenu label="Charts">
          <MenuItem> Pie charts </MenuItem>
          <MenuItem> Line charts </MenuItem>
        </SubMenu>
        <MenuItem> Documentation </MenuItem>
        <MenuItem> Calendar </MenuItem>
      </Menu>
    </Sidebar>
  );
}

export default SideNavbar;
