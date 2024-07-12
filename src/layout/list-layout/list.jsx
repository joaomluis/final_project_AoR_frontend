import React from "react";
import { Container, Card, CardBody, Row, Col, CardTitle, Button } from "reactstrap";
import { RiOrderPlayFill } from "react-icons/ri";
import { CiFilter } from "react-icons/ci";
import { RiAddFill } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import Loading from "../../components/loading/loading-overlay";
import { useUserStore } from "../../stores/useUserStore";
import UserType from "../../components/enums/UserType";
function ListLayout({ title, toggleOrder, toggleFilter, toggleCreate, children, loading }) {
  const userLogged = useUserStore((state) => state.userType);
  const isAdmin = userLogged?.role === UserType.fromValue(userLogged);

  const { t } = useTranslation();
  return (
    <div className="section4" style={{ position: "relative" }}>
      <Loading loading={loading} />
      <Container>
        {" "}
        <Card className="card-no-hover" style={{ backgroundColor: "transparent", border: "none" }}>
          <CardBody>
            <Row className="row-no-margin">
              {!toggleOrder && !toggleFilter && !toggleCreate ? (
                <Col className="mb-4" lg="12" md="12" sm="12">
                  <CardTitle tag="h1" style={{ fontWeight: "bold" }}>
                    {title}
                  </CardTitle>
                </Col>
              ) : toggleCreate ? (
                <Col className="mb-4" lg="6" md="12" sm="12">
                  <CardTitle tag="h1" style={{ fontWeight: "bold" }}>
                    {title}
                  </CardTitle>
                </Col>
              ) : (
                <Col className="mb-4" lg="8" md="12" sm="12" cs>
                  <CardTitle tag="h1" style={{ fontWeight: "bold" }}>
                    {title}
                  </CardTitle>
                </Col>
              )}

              {toggleCreate && userLogged === UserType.NORMAL && <Col lg="2" md="12" sm="12" xs="12"></Col>}
              {toggleCreate && userLogged === UserType.ADMIN ? (
                <Col lg="2" md="12" sm="12" xs="12">
                  <Button color="light" className="button-style1 mt-1" onClick={toggleCreate}>
                    <RiAddFill /> {t("create")}
                  </Button>
                </Col>
              ) : null}
              {toggleOrder && (
                <Col lg="2" md="6" sm="6" xs="6">
                  <Button color="light" className="button-style1 mt-1" onClick={toggleOrder}>
                    <RiOrderPlayFill /> {t("order")}
                  </Button>
                </Col>
              )}
              {toggleFilter && (
                <Col lg="2" md="6" sm="6" xs="6">
                  <Button color="light" className="button-style1 mt-1" onClick={toggleFilter}>
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
