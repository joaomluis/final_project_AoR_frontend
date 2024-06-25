import React, { useState } from "react";
import { useUserStore } from "../../stores/useUserStore";
import { Modal, Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Api } from "../../api";
import { tsuccess } from "../toasts/message-toasts";
function ModalMail(props) {
  const { t } = useTranslation();
  const token = useUserStore((state) => state.token);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const dto = {
      subject: subject,
      body: body,
      to: props.user.email,
    };
    console.log(dto);
    try {
      const response = await Api.sendMail(token, dto);
      tsuccess(t("email-sent"));
      setSubject("");
      setBody("");
    } catch (error) {
      console.log(error.message);
    }
    props.onClose(); // Fechar o modal após o envio
  }

  return (
    <Modal show={props.isOpen} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t("send-email")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>{t("recipient")}</Form.Label>
            <Form.Control type="email" value={`${props.user.firstname} <${props.user.email}>`} disabled />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>{t("email-subject")}</Form.Label>
            <Form.Control type="text" placeholder={t("enter-subject")} value={subject} onChange={(e) => setSubject(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>{t("email-message")}</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder={t("enter-message")} value={body} onChange={(e) => setBody(e.target.value)} required />
          </Form.Group>
          <Button className="button-style1" type="submit">
            {t("send")}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalMail;
