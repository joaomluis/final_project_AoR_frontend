import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from "reactstrap";
import ModalBase from "./modal-base.jsx";
import { Api } from "../../api.js";
import "../../assets/css/general-css.css";
import { terror, tsuccess } from "../toasts/message-toasts.jsx";
import { useTranslation } from "react-i18next";

//const RecoverPassword = forwardRef((props, ref, args) => {

const RecoverPassword = forwardRef((props, ref) => {
  const { t } = useTranslation();
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("");

  const toggle = () => setModal(!modal);

  const handleShow = () => {
    setModal(true);
  };

  async function handleRedifinePw() {
    try {
      const response = await Api.forgotPassword(email);
      toggle();
      setEmail("");
      tsuccess(response.data);
    } catch (error) {
      terror(error.message);
    }
  }

  // Expose the handleShow function to parent components
  useImperativeHandle(ref, () => ({
    open: handleShow,
  }));

  return (
    <div>
      <ModalBase isOpen={modal} toggle={toggle} title={t("recover-password")}>
        <p style={{ textAlign: "left" }}>{t("recover-password-subtext")}</p>
        <Form>
          <FormGroup floating>
            <Input onChange={(e) => setEmail(e.target.value)} value={email} name="email" placeholder="Email" type="email" required />
            <Label for="exampleEmail">Email</Label>
          </FormGroup>
        </Form>
        <ModalFooter>
          <Button className="button-style1" onClick={handleRedifinePw}>
            {t("redifine-password")}
          </Button>{" "}
        </ModalFooter>
      </ModalBase>
      {/* <Modal isOpen={modal} toggle={toggle} centered={true}>
        <ModalHeader toggle={toggle} style={{ color: "var(--whitey)", fontWeight: "bold" }} className="modal-style">
          {t("recover-password")}{" "}
        </ModalHeader>
        <ModalBody className="modal-style">
          <p style={{ color: "var(--whitey)", textAlign: "center" }}>{t("recover-password-subtext")}</p>
          <Form>
            <FormGroup floating>
              <Input onChange={(e) => setEmail(e.target.value)} value={email} name="email" placeholder="Email" type="email" required />
              <Label for="exampleEmail">Email</Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter className="modal-style">
          <Button className="button-style1" onClick={handleRedifinePw}>
            {t("redifine-password")}
          </Button>{" "}
        </ModalFooter>
      </Modal> */}
    </div>
  );
});

export default RecoverPassword;
