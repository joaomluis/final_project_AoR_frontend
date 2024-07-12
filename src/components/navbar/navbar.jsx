import React, { useState } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/img/logo1.png";

function Example(args) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggle = () => setIsOpen(!isOpen);
  // const handleClickSignIn = () => {
  //   navigate("/");
  // };
  const handleClickLogo = () => {
    navigate("/");
  };
  return (
    <div>
      <Navbar {...args} expand="lg" color="dark" fixed="top" light={true} dark={true}>
        <NavbarBrand style={{ cursor: "pointer" }} onClick={handleClickLogo}>
          <img
            alt="logo"
            src={logo}
            style={{
              height: 40,
              width: 40,
            }}
          />{" "}
          InnovationLab
        </NavbarBrand>
        {/* <NavbarToggler onClick={toggle} /> */}
        {/* <Collapse isOpen={isOpen} navbar>
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
          <Button color="button-style1" style={{ color: "white", backgroundColor: "var(--secondary-color)" }} size="sm" onClick={handleClickSignIn}>
            {t("sign-in")}
          </Button>{" "}
        </Collapse> */}
      </Navbar>
    </div>
  );
}

export default Example;
