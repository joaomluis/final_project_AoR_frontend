import React, { useState, forwardRef, useImperativeHandle } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  FormGroup,
  Row,
  Col,
} from "reactstrap";

import { Api } from "../../api.js";
import "../../assets/css/general-css.css";

const UserSettings = forwardRef((props, ref) => {
  const [modal, setModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
        <ModalHeader
          toggle={toggle}
          style={{ color: "var(--whitey)", fontWeight: "bold" }}
          className="modal-style"
        >
          User Settings{" "}
        </ModalHeader>
        <ModalBody className="modal-style">
          <Row>
            <Col md={6} className="col-left">
              <Form>
                <FormGroup floating>
                  <Input
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    value={currentPassword}
                    name="password"
                    placeholder="Password"
                    type="password"
                    required
                  />
                  <Label>Current Password</Label>
                </FormGroup>
                <FormGroup floating>
                  <Input
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                    name="password"
                    placeholder="Password"
                    type="password"
                    required
                  />
                  <Label>New Password</Label>
                </FormGroup>
                <FormGroup floating>
                  <Input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    name="password"
                    placeholder="Password"
                    type="password"
                    required
                  />
                  <Label>Confirm Password</Label>
                </FormGroup>
              </Form>
            </Col>
            <div className="vertical-line"></div>
            <Col md={6}>
              <Form>{/* Your second form group goes here */}</Form>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter className="modal-style">
          <Button className="button-style1">Redifine Password</Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
});

export default UserSettings;
