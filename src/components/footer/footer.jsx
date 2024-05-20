import React from "react";
import { Container, Row, Col } from "reactstrap";

import "../../assets/css/general-css.css";

import logo from "../../assets/img/logo_pl.jpg";

const Footer = () => {
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
