import React, { useEffect, useState } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, Container, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { Api } from "../../api";
import { FaBell, FaInbox, FaUser } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { Notification } from "../notification/notification";
import Dropdown from "react-bootstrap/Dropdown";

import logo from "../../assets/img/logo_pl.jpg";
import { tsuccess, terror } from "../toasts/message-toasts";
import { useUserStore } from "../../stores/useUserStore";
import ConfirmModal from "../modals/modal-confirm";
import { useTranslation } from "react-i18next";
import IconWithBadge from "../icon/badge/icon-with-badge";

function MainNavbar(args) {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const unreadNotifications = useUserStore((state) => state.unreadNotifications);
  const notifications = useUserStore((state) => state.notifications);
  const token = useUserStore((state) => state.token);
  const [maxPages, setMaxPages] = useState(1);
  const [page, setPage] = useState(1);
  const toggle = () => setIsOpen(!isOpen);
  const navigator = useNavigate();
  const { t } = useTranslation();
  console.log(page);
  async function fetchNotifications(page) {
    if (page === undefined) {
      page = 1;
    }
    const props = {
      page_size: 3,
      page_number: page,
    };
    try {
      const response = await Api.getNotifications(token, props);
      if (page === 1) {
        useUserStore.getState().setNotifications(response.data.results);
      } else {
        console.log(response.data.results);
        useUserStore.getState().addNotifications(response.data.results);
      }
      useUserStore.getState().updateUnreadNotifications(response.data.unreadCount);
      setMaxPages(response.data.totalPages);
    } catch (e) {
      terror(e.message);
    }
  }

  useEffect(() => {
    fetchNotifications();
  }, [token]);

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

  const logoStyle = {
    height: 40,
    width: 40,
  };

  const iconContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  };

  return (
    <>
      <Navbar {...args} expand="lg" color="dark" fixed="top" light dark>
        <NavbarBrand href="/fica-lab/home">
          <img alt="logo" src={logo} style={logoStyle} /> FicaLab
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <Container className="d-flex justify-content-center" />
          </Nav>
          <div style={iconContainerStyle}>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <FaBell style={{ color: "white", fontSize: "1.5rem" }} />
              </Dropdown.Toggle>

              <IconWithBadge
                icon={
                  <Dropdown.Menu>
                    <Notification
                      notifications={notifications}
                      fetchNotifications={fetchNotifications}
                      maxPages={maxPages}
                      currentPage={page}
                      setPage={setPage}
                    />
                  </Dropdown.Menu>
                }
                badgeCount={unreadNotifications}
                collapsed={false}
                navbar={true}
              />
            </Dropdown>

            <Link to="/fica-lab/my-profile">
              <FaUser style={{ color: "white", fontSize: "1.5rem" }} />
            </Link>
            <Button onClick={handleSignOutConfirm} color="primary" size="sm" id="dropdown-basic">
              <FaSignOutAlt style={{ color: "white", fontSize: "1.5rem" }} />
            </Button>
          </div>
        </Collapse>
      </Navbar>
      <ConfirmModal title={t("sign-out")} isOpen={isConfirmModalOpen} toggle={() => setIsConfirmModalOpen(false)} onConfirm={handleSignOut} />
    </>
  );
}

export default MainNavbar;
