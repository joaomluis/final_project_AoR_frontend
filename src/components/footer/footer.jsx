import React from "react";
import { Container, Row, Col } from "reactstrap";
import { useTranslation } from "react-i18next";

import "../../assets/css/general-css.css";

import logo from "../../assets/img/logo_pl.jpg";
import ukFlag from "../../assets/img/united-kingdom.png";
import ptFlag from "../../assets/img/portugal.png";

const Footer = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    window.scrollTo(0, 0);
  };

  return (
    <Container
      fluid={true}
      style={{ backgroundColor: "var(--primary-color-darker)" }}
    >
      <Row>
        <Col md="6" className="text-center mt-3">
          <img
            alt="logo"
            src={logo}
            style={{
              height: 80,
              width: 80,
            }}
          />{" "}
          <span style={{ fontSize: "2em", color: "white" }}> FicaLab</span>
        </Col>

        <Col md="3" className="text-center mt-3"></Col>
        <Col
          md="3"
          className="text-center mt-3"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <img
            alt="logo"
            src={ukFlag}
            onClick={() => changeLanguage("en")}
            style={{
              cursor: "pointer",
              height: 25,
              width: 25,
              marginRight: 10,
            }}
          />{" "}
          <img
            alt="logo"
            src={ptFlag}
            onClick={() => changeLanguage("pt")}
            style={{
              cursor: "pointer",
              height: 25,
              width: 25,
            }}
          />{" "}
        </Col>
      </Row>
      <hr style={{ borderColor: "white" }} />
      <Row>
        <Col md="6" className="text-left mt-1">
          <p style={{ color: "white" }}>
            &copy; {new Date().getFullYear()} FicaLab. All rights reserved.
          </p>
        </Col>
        <Col md="6" className="align-right mt-1">
          <p style={{ color: "white" }}>
            Developed by: Ricardo Carvalho and João Luís - AoR
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
