import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { t } from "i18next";

function ModalDD(props) {
  const [selectedSkillType, setSelectedSkillType] = useState(
    props.types && props.types.length > 0 ? props.types[0] : ""
  );
  const handleSkillTypeChange = (event) => {
    setSelectedSkillType(event.target.value);
  };

  const handleClick = () => {
    props.handleCreateNew(selectedSkillType);
  };

  return (
    <div>
      <Modal isOpen={props.isOpen} toggle={props.onClosed}>
        <ModalHeader toggle={props.onClose}>
          {props.header}: <strong>{props.newProductName}</strong>
          <strong>
            <span>{props.newSkillName}</span>
          </strong>
        </ModalHeader>
        <ModalBody>
          <span>{props.title}</span>
          <br />
          <span>{props.subtitle} </span>
          {props.types ? (
            <select onChange={handleSkillTypeChange}>
              {props.types.map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </select>
          ) : null}
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleClick}>{t("create")}</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalDD;
