import React from "react";
import { Container, Card, CardBody, Row, Col, CardTitle, Button } from "reactstrap";
import { RiOrderPlayFill } from "react-icons/ri";
import { CiFilter } from "react-icons/ci";
import { useTranslation } from "react-i18next";
import Loading from "../../components/loading/loading-overlay";
function ListLayout({ title, toggleOrder, toggleFilter, children, loading }) {
  const { t } = useTranslation();
  return (
    <div className="section4" style={{ position: "relative" }}>
      <Loading loading={loading} />
      <Container>
        {" "}
        <Card>
          <CardBody>
            <Row className="row-no-margin">
              {!toggleOrder && !toggleFilter ? (
                <Col className="mb-4" lg="12" md="12" sm="12">
                  <CardTitle tag="h4">{title}</CardTitle>
                </Col>
              ) : (
                <Col className="mb-4" lg="8" md="4" sm="12">
                  <CardTitle tag="h4">{title}</CardTitle>
                </Col>
              )}

              {toggleOrder && (
                <Col lg="2" md="4" sm="6" xs="6">
                  <Button color="light" className="button-style1" onClick={toggleOrder}>
                    <RiOrderPlayFill /> {t("order")}
                  </Button>
                </Col>
              )}
              {toggleFilter && (
                <Col lg="2" md="4" sm="6" xs="6">
                  <Button color="light" className="button-style1" onClick={toggleFilter}>
                    <CiFilter /> {t("filter")}
                  </Button>
                </Col>
              )}
            </Row>
            <div className={`container2-transition ${loading ? "loading" : ""}`}>{children}</div>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
}

export default ListLayout;
