import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup, Row, Col } from "reactstrap";
import { useEffect } from "react";
import { useUserStore } from "../../stores/useUserStore.js";
import { Api } from "../../api.js";
import "../../assets/css/general-css.css";
import { useTranslation } from "react-i18next";
import FormInput from "../input/forminput.jsx";
import { tsuccess, terror } from "../toasts/message-toasts.jsx";
const EditSkills = forwardRef((props, ref) => {
  const token = useUserStore((state) => state.token);
  const privateProfile = useUserStore((state) => state.privateProfile);
  const [modal, setModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { t } = useTranslation();
  const toggle = () => setModal(!modal);

  const handleShow = () => {
    setModal(true);
  };

  // Expose the handleShow function to parent components
  useImperativeHandle(ref, () => ({
    open: handleShow,
  }));

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} centered={true} size="lg">
        <ModalHeader toggle={toggle} style={{ color: "var(--whitey)", fontWeight: "bold" }} className="modal-style">
          SKILLS{" "}
        </ModalHeader>
        <ModalBody className="modal-style">
          <Row>
            <Col md={6} className="col-left">
              <Form>
                <FormInput
                  label={t("current-password")}
                  placeholder={t("current-password")}
                  type="password"
                  value={currentPassword}
                  setValue={setCurrentPassword}
                />
                <FormInput label={t("new-password")} placeholder={t("new-password")} type="password" value={newPassword} setValue={setNewPassword} />
                <FormInput
                  label={t("confirm-password")}
                  placeholder={t("confirm-password")}
                  type="password"
                  value={confirmPassword}
                  setValue={setConfirmPassword}
                />

                <Button color="light" className="button-style1 mt-3 w-100">
                  {t("change-password")}
                </Button>
              </Form>
            </Col>

            <Col md={6} className="d-flex flex-column justify-content-center">
              <Form>
                <FormGroup switch className="custom-form-group">
                  <Input
                    type="checkbox"
                    className="custom-switch"
                    checked={privateProfile}
                    
                  />
                  <Label check className="label-color">
                    {t("change-your-profile-visibility")}
                  </Label>
                </FormGroup>
                <hr className="custom-hr" />
                <div className="center-label">
                  <Label className="label-color">
                    {t("your-profile-is-currently")}:{" "}
                    {privateProfile ? <span className="private">{t("private")}</span> : <span className="public">{t("public")}</span>}
                  </Label>
                </div>
              </Form>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter className="modal-style"></ModalFooter>
      </Modal>
    </div>
  );
});

export default EditSkills;