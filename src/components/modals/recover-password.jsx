//TODO limpar a caxa quando é enviado o e-mail & verificar os erros de consola com este modal
import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from "reactstrap";
import { Api } from "../../api.js";
import "../../assets/css/general-css.css";

//const RecoverPassword = forwardRef((props, ref, args) => {

const RecoverPassword = forwardRef((props, ref) => {
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("");

  const toggle = () => setModal(!modal);

  const handleShow = () => {
    setModal(true);
  };

  const handleRedifinePw = () => {
    try {
      Api.forgotPassword(email);
      toggle();
      setEmail("");
    } catch (error) {
      console.error(error);
    }
  };

  // Expose the handleShow function to parent components
  useImperativeHandle(ref, () => ({
    open: handleShow,
  }));

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} {...props} centered={true}>
        <ModalHeader toggle={toggle} style={{ color: "var(--whitey)", fontWeight: "bold" }} className="modal-style">
          Recover Password{" "}
        </ModalHeader>
        <ModalBody className="modal-style">
          <p style={{ color: "var(--whitey)", textAlign: "center" }}>Enter your email and we will send you a link to reset your password</p>
          <Form>
            <FormGroup floating>
              <Input onChange={(e) => setEmail(e.target.value)} value={email} name="email" placeholder="Email" type="email" required />
              <Label for="exampleEmail">Email</Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter className="modal-style">
          <Button className="button-style1" onClick={handleRedifinePw}>
            Redifine Password
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
});

export default RecoverPassword;
