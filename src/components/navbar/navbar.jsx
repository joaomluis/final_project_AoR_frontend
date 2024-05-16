import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Container,
  Button,
} from "reactstrap";

import logo from "../../assets/img/logo_pl.jpg";

function Example(args) {
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
        <NavbarBrand href="/">
          <img
            alt="logo"
            src={logo}
            style={{
              height: 40,
              width: 40,
            }}
          />
          {" "}FicaLab
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <Container className="d-flex justify-content-center">
              <NavItem>
                <NavLink>Projects</NavLink>
              </NavItem>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Container>
          </Nav>
          <Button color="primary" size="sm">
            Sign In
          </Button>{" "}
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Example;
