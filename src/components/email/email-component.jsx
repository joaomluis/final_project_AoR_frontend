import React, { useEffect, useState } from "react";
import Loading from "../loading/loading-overlay";
import { Container, Card, CardBody, Row, Col, CardTitle, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { IoIosArrowBack } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { useUserStore } from "../stores/useUserStore";
import { Api } from "../../api";
import { use } from "i18next";
import { FaRegTrashAlt } from "react-icons/fa";
import { tsuccess } from "../toasts/message-toasts";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

function EmailComponent({ mail, loading, children, back, deleteToggle }) {
  const { t } = useTranslation();
  loading = false;
  const usermail = useUserStore((state) => state.email);
  const token = useUserStore((state) => state.token);
  const toMe = mail.to === usermail;
  const [responseBody, setResponseBody] = useState("");

  async function handleMarkAsRead() {
    try {
      const response = await Api.markAsRead(token, mail.id);
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  }
  const handleChangeResponse = (e) => {
    e.preventDefault();
    setResponseBody(e.target.value);
  };

  useEffect(() => {
    handleMarkAsRead();
  }, []);

  async function handleSendResponse() {
    const props = { id: mail.id, body: responseBody };
    console.log(responseBody);
    try {
      const response = await Api.sendResponse(token, mail.id, props);

      if (response.status === 200) {
        tsuccess(t("response-sent"));
        back();
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="section4" style={{ position: "relative" }}>
      <Loading loading={loading} />
      <Container>
        <Card>
          <CardBody>
            <Row className="row-no-margin align-items-center" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Col xs="2" sm="1" md="1" lg="1">
                <Button outline onClick={back} style={{ border: "none", fontSize: "large" }} className="my-custom-btn">
                  <IoIosArrowBack />
                </Button>
              </Col>
              <Col xs="8" sm="10" md="10" lg="10" style={{ display: "flex", justifyContent: "center" }}>
                <CardTitle tag="h4">
                  <p style={{ fontSize: "2rem" }}>{mail.subject}</p>
                </CardTitle>
              </Col>
              <Col xs="2" sm="1" md="1" lg="1">
                <Button
                  outline
                  style={{ width: "auto", border: "none", fontSize: "large" }}
                  onClick={() => deleteToggle(mail.id)}
                  className="my-custom-btn"
                >
                  <FaRegTrashAlt />
                </Button>
              </Col>
            </Row>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Row className="" style={{ margin: "20px 0", fontSize: "1rem" }}>
                {t("from")}: {mail.fromName} {`<${mail.from}>`}
              </Row>
              <Row className="" style={{ margin: "20px 0", fontSize: "1rem" }}>
                {t("date")}: {new Date(mail.sentDate).toLocaleDateString()}
              </Row>
            </div>
            <Row className="row-no-margin" style={{ margin: "20px 0" }}>
              <Col lg="12" md="12" sm="12">
                {mail.body.split("<hr/>").map((part, index) => {
                  // Sanitize the HTML part
                  const sanitizedHTML = DOMPurify.sanitize(part);
                  // Parse the sanitized HTML into React elements
                  const content = parse(sanitizedHTML);
                  return (
                    <div style={{ fontSize: "1rem" }} key={index}>
                      {content}
                    </div>
                  );
                })}
              </Col>
            </Row>
            <Row className="row-no-margin" style={{ margin: "20px 0" }}>
              {toMe ? (
                <Form>
                  <FormGroup>
                    <Label for="response">{t("response")}</Label>
                    <Input type="textarea" name="response" id="response" onChange={handleChangeResponse} />
                  </FormGroup>
                  <Button onClick={handleSendResponse} outline className="my-custom-btn">
                    {t("send")}
                  </Button>
                </Form>
              ) : null}
            </Row>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
}

export default EmailComponent;
