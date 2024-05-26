import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  CardHeader,
  CardFooter,
  CardBody,
  CardTitle,
  CardText,
  Col,
} from "reactstrap";
import ModalDD from "../modals/modal-dropdown";
import { Api } from "../../api";
import Tag from "./tags";
import { t } from "i18next";

function SkillCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [skillTypes, setSkillTypes] = useState([]);
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillType, setNewSkillType] = useState("");
  const [skills, setSkills] = useState([]); //skills do user
  const token = "d6691169-384b-45e6-a438-a706b2c47ecb";

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  async function handleGetAllSkillTypes() {
    try {
      const response = await Api.getSkillType(token);
      setSkillTypes(response.data);
      setIsModalOpen(true);
      return response;
    } catch (error) {
      console.log(error.message);
    }
  }

  const onCreateNewSkill = (newSkill) => {
    setNewSkillName(newSkill);
  };

  const handleCreateNewSkill = (skillType) => {
    setNewSkillType(skillType);
  };

  useEffect(() => {
    handleGetAllSkillTypes();
  }, []);

  const handleOpenModal = (skillName) => {
    setNewSkillName(skillName);
    setIsModalOpen(false);
  };

  return (
    <>
      <Col md="6" className="mt-5">
        <Card>
          <CardHeader>
            <CardTitle tag="h4">{t("my-skills")}</CardTitle>
          </CardHeader>
          <CardBody>
            <CardText>{t("there-you-can-add-and-remove-your-skills")}</CardText>
            <Tag
              handleModalToggle={() => handleOpenModal}
              onCreate={onCreateNewSkill}
            />
          </CardBody>
        </Card>
      </Col>
      <ModalDD
        handleCreateNewSkill={handleCreateNewSkill}
        isOpen={isModalOpen}
        onClosed={handleModalToggle}
        skillTypes={skillTypes}
        newSkillName={newSkillName}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default SkillCard;
