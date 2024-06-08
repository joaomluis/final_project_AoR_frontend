import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./modal.css";
const ModalBase = ({ isOpen, toggle, title, children, footer }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>{children}</ModalBody>
      {footer && <ModalFooter className="modal-footer">{footer}</ModalFooter>}
    </Modal>
  );
};

export default ModalBase;
