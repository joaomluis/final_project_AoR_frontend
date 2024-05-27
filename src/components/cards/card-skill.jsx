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
  Row,
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
  // const token = useUserStore((state) => state.token);
  const token = "ccaa096d-bda5-476e-a036-d65bd822cd6f";
  const skills = useUserStore((state) => state.skills);
  const allSkills = useUserStore((state) => state.allSkills);
  const skillTypes = useUserStore((state) => state.skillTypes);
  const updateAllSkills = useUserStore((state) => state.updateAllSkills);
  const updateSkills = useUserStore((state) => state.updateSkills);
  const updateSkillTypes = useUserStore((state) => state.updateSkillTypes);
  const email = useUserStore((state) => state.email);
  const addSkill = useUserStore((state) => state.addSkill);
  const addSkillToAll = useUserStore((state) => state.addSkillToAll);
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

  /**
   * Method to get user skills from the API
   */
  async function handleGetSkills() {
    try {
      const response = await Api.getUserSkills(token, email);
      updateSkills(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * Method to get all skills from the API
   */
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
  async function handleCreateNewSkill(skillType) {
    console.log("entrou em handleCreateNewSkill");
    let skill = {
      name: newSkillName,
      type: skillType,
    };
    try {
      const response = await Api.addSkill(token, skill);
      skill = response.data;
      console.log("a skill de resposta:" + skill);
      addSkillToAll(skill);
      addSkill(skill);

      setIsModalOpen(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * Method to add a skill to the user, calling the post method from the API
   * @param {*} skill
   */
  async function addSkillToUser(skill) {
    try {
      const response = await Api.addSkill(token, skill);
      addSkill(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * Method to remove a skill from the user, calling the delete method from the API
   * @param {*} skill
   */
  async function removeSkillFromUser(skill) {
    try {
      const response = await Api.removeSkill(token, skill);
      console.log(response.data);
      removeSkill(skill);
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * Method to handle the add of a skill to the user
   * @param {*} skill
   */
  async function handleAddSkillToUser(skill) {
    const skillIdName = convertOptionToSkill(skill);
    addSkillToUser(skillIdName);
  }

  /**
   * Method to handle the removal of a skill from the user
   * @param {*} skill
   */
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
      <Row>
        <Col md="6" className="mt-5">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">{t("my-skills")}</CardTitle>
            </CardHeader>
            <CardBody>
              <CardText>
                {t("there-you-can-add-and-remove-your-skills")}
              </CardText>
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
      </Row>
    </>
  );
}

export default SkillCard;
