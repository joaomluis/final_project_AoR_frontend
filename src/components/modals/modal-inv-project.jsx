import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { t } from "i18next";

function ModalInviteToProject(props) {
  const [selectedProject, setSelectedProject] = useState(props.projects && props.projects.length > 0 ? props.projects[0] : "");

  const handleProjectChange = (event) => {
    setSelectedProject(event.target.value);
  };

  const handleInviteClick = () => {
    props.handleInviteUser(selectedProject);
  };

  return (
    <div>
      <Modal isOpen={props.isOpen} toggle={props.onClosed}>
        <ModalHeader toggle={props.onClose}>{props.header}</ModalHeader>
        <ModalBody>
          <span>{props.title}</span>
          <br />
          <span>{props.subtitle} </span>
          {props.projects ? (
            <select onChange={handleProjectChange}>
              {props.projects.map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </select>
          ) : null}
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleInviteClick}>{t("invite")}</Button>
          <Button onClick={props.onClose}>{t("cancel")}</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalInviteToProject;
