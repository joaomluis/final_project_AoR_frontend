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
import { useUserStore } from "../stores/useUserStore";
/**
 * Component to render the skill card
 * @returns SkillCard component
 */
function SkillCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillType, setNewSkillType] = useState("");
  const skills = useUserStore((state) => state.skills);
  const allSkills = useUserStore((state) => state.allSkills);
  // const token = useUserStore((state) => state.token);
  const token = "63345579-aa2e-4ac8-a526-97a3cd83715c";
  const skillTypes = useUserStore((state) => state.skillTypes);
  const updateAllSkills = useUserStore((state) => state.updateAllSkills);
  const updateSkills = useUserStore((state) => state.updateSkills);
  const updateSkillTypes = useUserStore((state) => state.updateSkillTypes);
  const email = useUserStore((state) => state.email);
  const addSkill = useUserStore((state) => state.addSkill);
  const removeSkill = useUserStore((state) => state.removeSkill);

  // const handleModalToggle = () => {
  //   setIsModalOpen(!isModalOpen);
  // };

  /**
   * Method to get all skill types from the API
   */
  async function handleGetAllSkillTypes() {
    try {
      const response = await Api.getSkillType(token);
      updateSkillTypes(response.data);
      console.log(response.data);
      // setIsModalOpen(true);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleGetSkills() {
    try {
      const response = await Api.getUserSkills(token, email);
      updateSkills(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleGetAllSkills() {
    try {
      const response = await Api.getAllSkills(token);
      updateAllSkills(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * Const to be called when a new skill is created
   * @param {*} newSkill
   */
  const onCreateNewSkill = (newSkill) => {
    setNewSkillName(newSkill);
  };

  /**
   * Method to handle the creation of a new skill, calling the post method from the API
   * @param {*} skillType
   */
  const handleCreateNewSkill = (skillType) => {
    setNewSkillType(skillType);
    //TODO metodo para criar nova skill no user.
  };

  async function addSkillToUser(skill) {
    try {
      console.log(skill);
      const response = await Api.addSkill(token, skill);
      console.log(response.data);
      addSkill(skill);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function removeSkillFromUser(skill) {
    try {
      const response = await Api.removeSkill(token, skill);
      console.log(response.data);
      removeSkill(skill);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleAddSkillToUser(skill) {
    console.log(skill);
    const skillIdName = convertOptionToSkill(skill);
    console.log(skillIdName);
    addSkillToUser(skillIdName);
  }

  async function handleRemoveSkillFromUser(skill) {
    const skillIdName = convertOptionToSkill(skill);
    removeSkillFromUser(skillIdName);
  }

  /**
   * Function to convert the option to a skill object.
   * value -> id and label -> name
   * @param {*} option
   * @returns
   */
  function convertOptionToSkill(option) {
    return {
      id: option.value,
      name: option.label,
      type: option.type,
    };
  }

  /**
   * useEffect to get all skills from the API just once
   */
  useEffect(() => {
    handleGetAllSkillTypes();
    handleGetAllSkills();
    handleGetSkills();
  }, []);

  /**
   * Method to open the modal when a new skill is detected
   * @param {*} skillName
   */
  const handleOpenModal = (skillName) => {
    setNewSkillName(skillName);
    setIsModalOpen(true);
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
              handleModalToggle={handleOpenModal}
              onCreate={onCreateNewSkill}
              options={allSkills}
              choices={skills}
              onAdd={handleAddSkillToUser}
              onRemove={handleRemoveSkillFromUser}
            />
          </CardBody>
        </Card>
      </Col>
      <ModalDD
        handleCreateNewSkill={handleCreateNewSkill}
        isOpen={isModalOpen}
        // onClosed={handleModalToggle}
        skillTypes={skillTypes}
        newSkillName={newSkillName}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default SkillCard;
