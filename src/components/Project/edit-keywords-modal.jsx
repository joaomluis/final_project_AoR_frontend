import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup, Row, Col } from "reactstrap";
import { useEffect } from "react";
import { useUserStore } from "../../stores/useUserStore.js";
import { Api } from "../../api.js";
import "../../assets/css/general-css.css";
import { useTranslation } from "react-i18next";
import { tsuccess, terror } from "../toasts/message-toasts.jsx";
const EditKeywords = forwardRef((props, ref) => {
  const token = useUserStore((state) => state.token);
  const [modal, setModal] = useState(false);

  const { t } = useTranslation();
  const toggle = () => setModal(!modal);

  const handleShow = () => {
    setModal(true);
  };

  useImperativeHandle(ref, () => ({
    open: handleShow,
  }));

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} centered={true} size="lg">
        <ModalHeader toggle={toggle} style={{ color: "var(--whitey)", fontWeight: "bold" }} className="modal-style">
          Edit project keywords{" "}
        </ModalHeader>
        <ModalBody className="modal-style">
          <Row>
            <Col md={6} >
              
            </Col>

            <Col md={6} >
              
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter className="modal-style"></ModalFooter>
      </Modal>
    </div>
  );
});

export default EditKeywords;
