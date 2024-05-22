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
} from "reactstrap";

import "../../assets/css/general-css.css";

const RecoverPassword = forwardRef((props, ref, args) => {
  const [modal, setModal] = useState(false);

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
      <Modal isOpen={modal} toggle={toggle} {...args} centered="true">
        <ModalHeader
          toggle={toggle}
          style={{ color: "var(--whitey)", fontWeight: "bold" }}
          className="modal-style"
        >
          Recover Password{" "}
        </ModalHeader>
        <ModalBody className="modal-style">
          <p style={{ color: "var(--whitey)", textAlign:"center"}}>
            Enter your email and we will send you a link to reset your password
          </p>
          <Form>
            <FormGroup floating>
              <Input name="email" placeholder="Email" type="email" required />
              <Label for="exampleEmail">Email</Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter className="modal-style">
          <Button className="button-style1">Redifine Password</Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
});

export default RecoverPassword;
