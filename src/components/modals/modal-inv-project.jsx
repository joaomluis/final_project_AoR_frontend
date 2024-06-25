import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Select from "react-select";
import { t } from "i18next";

function ModalInviteToProject(props) {
  console.log(props.projects);
  const [selectedProject, setSelectedProject] = useState(props.projects && props.projects.length > 0 ? props.projects[0] : "");

  const handleInviteClick = () => {
    props.handleInviteUser(selectedProject);
  };
  const handleSelectChange = (selectedOption) => {
    setSelectedProject(selectedOption.value);
  };

  useEffect(() => {
    // Passo 2: Usar useEffect
    // Passo 3: Atualizar selectedProject baseado nas props atualizadas
    if (!props.projects.map((p) => p).includes(selectedProject)) {
      setSelectedProject(props.projects && props.projects.length > 0 ? props.projects[0] : "");
    }
  }, [props.projects]); // Observar mudanças em props.projects

  return (
    <div>
      <Modal isOpen={props.isOpen} toggle={props.onClosed}>
        <ModalHeader toggle={props.onClose}>{props.header}</ModalHeader>
        <ModalBody>
          {props.projects && props.projects.length > 0 ? (
            <>
              <span>{props.title}</span>
              <br />
              <span>{props.subtitle} </span>

              <Select
                options={props.projects.map((value) => ({ value: value, label: value }))}
                onChange={handleSelectChange}
                value={{ value: selectedProject, label: selectedProject }}
              />
            </>
          ) : (
            <p style={{ color: "grey", textAlign: "center" }}>{t("no-projects-to-invite")}</p>
          )}
        </ModalBody>
        <ModalFooter style={{ display: "flex", justifyContent: "flex-end" }}>
          <div style={{ width: "50%", display: "flex", justifyContent: "flex-end" }}>
            {selectedProject && selectedProject.length > 0 && (
              <Button onClick={handleInviteClick} className="button-style1" style={{ width: "50%" }}>
                {t("invite")}
              </Button>
            )}
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
