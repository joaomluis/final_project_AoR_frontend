import React from 'react';
import { Nav } from 'react-bootstrap';

function Sidebar() {
  return (
    <Nav className="col-md-2 d-none d-md-block bg-secondary sidebar"  style={{marginTop:"65px", height: "calc(100vh - 65px)", display: "flex", flexDirection: "column", justifyContent: "flex-end"}}>
      <div className="sidebar-sticky"></div>
      <Nav.Item>
        <Nav.Link href="/home">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/about">About</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/contact">Contact</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Sidebar;