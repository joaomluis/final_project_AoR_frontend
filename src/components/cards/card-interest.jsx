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
  const [newInterestName, setNewInterestName] = useState("");
  // const token = useUserStore((state) => state.token);
  const token = "30e6d24c-ee2d-43a6-987f-78ea6813eeed";
  const interests = useUserStore((state) => state.interests);
  const allInterests = useUserStore((state) => state.allInterests);
  //   const skillTypes = useUserStore((state) => state.skillTypes);
  const updateAllInterests = useUserStore((state) => state.updateAllInterests);
  const updateInterests = useUserStore((state) => state.updateInterests);
  //   const updateSkillTypes = useUserStore((state) => state.updateSkillTypes);
  const email = useUserStore((state) => state.email);
  const addInterest = useUserStore((state) => state.addInterest);
  const addInterestToAll = useUserStore((state) => state.addInterestToAll);
  const removeInterest = useUserStore((state) => state.removeInterest);

  /**
   * Method to get user skills from the API
   */
  async function handleGetInterests() {
    try {
      const response = await Api.getUserInterests(token, email);
      updateInterests(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * Method to get all skills from the API
   */
  async function handleGetAllInterests() {
    try {
      const response = await Api.getAllInterests(token);
      updateAllInterests(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * Method to handle the creation of a new skill, calling the post method from the API
   * @param {*} skillType
   */
  async function handleCreateNewInterest() {
    let skill = {
      name: newInterestName,
    };
    try {
      const response = await Api.addInterest(token, skill);
      skill = response.data;
      console.log("a skill de resposta:" + skill);
      addInterestToAll(skill);
      addInterest(skill);

      setIsModalOpen(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  const onCreateNewInterest = (newSkill) => {
    setNewInterestName(newSkill);
  };

  /**
   * Method to add a skill to the user, calling the post method from the API
   * @param {*} skill
   */
  async function addInterestToUser(skill) {
    try {
      const response = await Api.addSkill(token, skill);
      addInterest(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * Method to remove a skill from the user, calling the delete method from the API
   * @param {*} skill
   */
  async function removeInterestFromUser(skill) {
    const { type, ...skillWithoutType } = skill;
    try {
      const response = await Api.removeInterest(token, skillWithoutType);
      console.log(response.data);
      removeInterest(skill);
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * Method to handle the add of a skill to the user
   * @param {*} skill
   */
  async function handleAddInterestToUser(skill) {
    const skillIdName = convertOptionToSkill(skill);
    addInterestToUser(skillIdName);
  }

  /**
   * Method to handle the removal of a skill from the user
   * @param {*} skill
   */
  async function handleRemoveInterestFromUser(skill) {
    const skillIdName = convertOptionToSkill(skill);
    removeInterestFromUser(skillIdName);
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
    handleGetAllInterests();
    handleGetInterests();
  }, []);

  /**
   * Method to open the modal when a new skill is detected
   * @param {*} skillName
   */
  const handleOpenModal = (interestName) => {
    setNewInterestName(interestName);
    setIsModalOpen(true);
  };

  return (
    <>
      <Col md="12" className="mt-5">
        <Card>
          <CardHeader>
            <CardTitle tag="h4">{t("my-interests")}</CardTitle>
          </CardHeader>
          <CardBody>
            <CardText>
              {t("there-you-can-add-and-remove-your-interests")}
            </CardText>
            <Tag
              handleModalToggle={handleOpenModal}
              onCreate={onCreateNewInterest}
              options={allInterests}
              choices={interests}
              onAdd={handleAddInterestToUser}
              onRemove={handleRemoveInterestFromUser}
            />
          </CardBody>
        </Card>
      </Col>
      <ModalDD
        title={t("do_you_want_to_create_a_new_interest?")}
        handleCreateNew={handleCreateNewInterest}
        isOpen={isModalOpen}
        // onClosed={handleModalToggle}
        // skillTypes={skillTypes}
        newSkillName={newInterestName}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default SkillCard;
