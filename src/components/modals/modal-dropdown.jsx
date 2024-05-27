import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { t } from "i18next";

function ModalDD(props) {
  const [selectedSkillType, setSelectedSkillType] = useState(
    props.skillTypes && props.skillTypes.length > 0 ? props.skillTypes[0] : ""
  );
  const handleSkillTypeChange = (event) => {
    setSelectedSkillType(event.target.value);
  };

  const handleClick = () => {
    props.handleCreateNewSkill(selectedSkillType);
  };

  return (
    <div>
      <Modal isOpen={props.isOpen} toggle={props.onClosed}>
        <ModalHeader toggle={props.onClose}>
          {t("new_skill_detected")}:{" "}
          <strong>
            <span>{props.newSkillName}</span>
          </strong>
        </ModalHeader>
        <ModalBody>
          <div>{t("do_you_want_to_create_a_new_skill?")}</div>
          <div>{t("choose_skill_type")}</div>
          {props.skillTypes ? (
            <select onChange={handleSkillTypeChange}>
              {props.skillTypes.map((value, index) => (
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
