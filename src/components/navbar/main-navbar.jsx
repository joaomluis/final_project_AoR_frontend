import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Container,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";

import { FaBell, FaInbox, FaUser } from "react-icons/fa";

import logo from "../../assets/img/logo_pl.jpg";

function MainNavbar(args) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar
        {...args}
        expand="lg"
        color="dark"
        fixed="top"
        light={true}
        dark={true}
      >
        
        <NavbarBrand href="/fica-lab/home">
          <img
            alt="logo"
            src={logo}
            style={{
              height: 40,
              width: 40,
            }}
          />{" "}
          FicaLab
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <Container className="d-flex justify-content-center"></Container>
          </Nav>
          <FaBell color="white" size="1.5em" style={{ marginRight: "15px" }} />
          <FaInbox color="white" size="1.5em" style={{ marginRight: "15px" }} />
          <Link to="/fica-lab/my-profile">
            <FaUser
              color="white"
              size="1.5em"
              style={{ marginRight: "15px" }}
            />
          </Link>
          <Button color="primary" size="sm">
            Log out
          </Button>{" "}
        </Collapse>
      </Navbar>
    </div>
  );
}

export default MainNavbar;
