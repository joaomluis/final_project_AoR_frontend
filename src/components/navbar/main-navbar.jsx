import React, { useState } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, Container, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { Api } from "../../api";
import { FaBell, FaInbox, FaUser } from "react-icons/fa";

import logo from "../../assets/img/logo_pl.jpg";
import { tsuccess, terror } from "../toasts/message-toasts";
import { useUserStore } from "../../stores/useUserStore";
import ConfirmModal from "../modals/modal-confirm";
import { useTranslation } from "react-i18next";
function MainNavbar(args) {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const token = useUserStore((state) => state.token);
  const toggle = () => setIsOpen(!isOpen);
  const navigator = useNavigate();
  const { t } = useTranslation();

  function handleSignOutConfirm() {
    console.log("signout");
    setIsConfirmModalOpen(true);
  }

  async function handleSignOut() {
    try {
      const response = await Api.signout(token);
      tsuccess(response.data);
      navigator("/landing");
    } catch (e) {
      terror("ups");
    }
  }

  return (
    <div>
      <Navbar {...args} expand="lg" color="dark" fixed="top" light={true} dark={true}>
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
            <FaUser color="white" size="1.5em" style={{ marginRight: "15px" }} />
          </Link>
          <Button onClick={handleSignOutConfirm} color="primary" size="sm">
            Log out
          </Button>{" "}
        </Collapse>
      </Navbar>
      <ConfirmModal title={t("sign-out")} isOpen={isConfirmModalOpen} toggle={() => setIsConfirmModalOpen(false)} onConfirm={handleSignOut} />
    </div>
  );
}

export default MainNavbar;
