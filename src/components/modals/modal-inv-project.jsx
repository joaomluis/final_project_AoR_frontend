import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Select from "react-select";
import { t } from "i18next";

function ModalInviteToProject(props) {
  const [selectedProject, setSelectedProject] = useState(props.projects && props.projects.length > 0 ? props.projects[0] : "");

  const handleInviteClick = () => {
    props.handleInviteUser(selectedProject);
  };

  const handleSelectChange = (selectedOption) => {
    setSelectedProject(selectedOption.value);
  };

  return (
    <div>
      <Modal isOpen={props.isOpen} toggle={props.onClosed}>
        <ModalHeader toggle={props.onClose}>{props.header}</ModalHeader>
        <ModalBody>
          <span>{props.title}</span>
          <br />
          <span>{props.subtitle} </span>
          {props.projects ? <Select options={props.projects.map((value) => ({ value: value, label: value }))} onChange={handleSelectChange} /> : null}
        </ModalBody>
        <ModalFooter style={{ display: "flex", justifyContent: "flex-end" }}>
          <div style={{ width: "50%", display: "flex" }}>
            <Button onClick={handleInviteClick} className="button-style1" style={{ width: "50%" }}>
              {t("invite")}
            </Button>
            <Button onClick={props.onClose} className="button-style1" style={{ width: "50%", marginLeft: "1rem" }}>
              {t("cancel")}
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalInviteToProject;
