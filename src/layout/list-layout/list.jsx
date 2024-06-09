import React from "react";
import { Container, Card, CardBody, Row, Col, CardTitle, Button } from "reactstrap";
import { RiOrderPlayFill } from "react-icons/ri";
import { CiFilter } from "react-icons/ci";
import { useTranslation } from "react-i18next";
function ListLayout({ title, toggleOrder, toggleFilter, children }) {
  const { t } = useTranslation();
  return (
    <div className="section4">
      <Container>
        <Card>
          <CardBody>
            <Row>
              <Col className="mb-4" lg="12" md="12">
                <CardTitle tag="h4">{title}</CardTitle>
              </Col>

              <Row className="row-no-margin">
                <Col lg="2" md="3" sm="6" xs="6">
                  <Button color="light" className="button-style1" onClick={toggleOrder}>
                    <RiOrderPlayFill /> {t("order")}
                  </Button>
                </Col>

                <Col lg="2" md="3" sm="6" xs="6">
                  <Button color="light" className="button-style1" onClick={toggleFilter}>
                    <CiFilter /> {t("filter")}
                  </Button>
                </Col>
              </Row>
            </Row>
            {children}
          </CardBody>
        </Card>
      </Container>
    </div>
  );
}

export default ListLayout;
