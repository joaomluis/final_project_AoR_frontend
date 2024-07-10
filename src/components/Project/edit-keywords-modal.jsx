import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col,
    Card, CardHeader, CardText, CardBody, CardTitle, Label, FormGroup
 } from "reactstrap";
import { useEffect } from "react";
import { useUserStore } from "../../stores/useUserStore.js";
import { Api } from "../../api.js";
import "../../assets/css/general-css.css";
import { useTranslation } from "react-i18next";

import InterestTag from "../tags/interest-edit-project-tag.jsx";

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

  function cardSkillInterest(title, text, tag) {
    return (
      <Card>
        
        <CardBody>
          <CardText>{text}</CardText>
          {tag}
        </CardBody>
      </Card>
    );
  }

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} centered={true} size="lg">
        <ModalHeader toggle={toggle} style={{ color: "var(--whitey)", fontWeight: "bold" }} className="modal-style">
        {t("keywords-preview")}{" "}
        </ModalHeader>
        <ModalBody className="modal-style">
          <Row>
            <Col md={12} >
            

              {cardSkillInterest(
                "Select Keywords",
                t("select-keywords-subtext"),
                <InterestTag />
              )}
            </Col>

            
          </Row>
        </ModalBody>
        <ModalFooter className="modal-style"></ModalFooter>
      </Modal>
    </div>
  );
});

export default EditKeywords;
