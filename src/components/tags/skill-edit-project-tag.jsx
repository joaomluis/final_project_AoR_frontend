import React, { useEffect } from "react";
import ItemDropdown from "./item-drop-down";
import { useUserStore } from "../../stores/useUserStore";
import { Api } from "../../api";
import { tsuccess, terror } from "../toasts/message-toasts";
import useCreateProjectStore from "../../stores/useCreateProjectStore";
import useEditProjectStore from "../../stores/useEditProjectStore";
import { useParams } from "react-router-dom";
//
function UserSkills() {
  const token = useUserStore((state) => state.token);
  const { id } = useParams();

  const projectSkillsData = useEditProjectStore((state) => state.projectSkills);
  const setProjectSkills = useEditProjectStore((state) => state.setProjectSkills);
  const addProjectSkill = useEditProjectStore((state) => state.addProjectSkill);
  const removeProjectSkill = useEditProjectStore((state) => state.removeProjectSkill);

  const allSkills = useEditProjectStore((state) => state.allSkills);
  const setAllSkills = useEditProjectStore((state) => state.setAllSkills);
  const addSkillToAll = useEditProjectStore((state) => state.addSkillToAll);

  const skillTypes = useUserStore((state) => state.skillTypes);
  const setSkillTypes = useUserStore((state) => state.updateSkillTypes);

  async function addSkillToProject(skillId) {
    try {
      const response = await Api.addSkillToProject(token, id, skillId.id);
      addProjectSkill(skillId);
      tsuccess(response.data);
    } catch (error) {
      terror(error.message);
      console.error("Error adding interest:", error);
    }
  }

  async function removeSkillFromProject(skillId) {
    console.log(skillId);
    console.log(skillId.id);
    try {
      const response = await Api.removeSkillFromProject(token, id, skillId.id);
      removeProjectSkill(skillId);
      tsuccess(response.data);
    } catch (error) {
      terror(error.message);
      console.error("Error removing interest:", error);
    }
  }

  // const addSelectedSkill = (newSkill) => {
  //   addSkillToProject(token, id, newSkill.id);
  //   addProjectSkill(newSkill);
  // };

  // const removeSelectedSkill = (skill) => {
  //   removeInterestFromProject(token, id, skill.id);
  //   removeProjectSkill(skill.id);
  // };

  async function fetchProjectSkills() {
    try {
      const response = await Api.getSkillsForProject(token, id);
      setProjectSkills(response.data);
    } catch (error) {
      terror(error.message);
    }
  }

  async function fetchSkillTypes() {
    try {
      const response = await Api.getSkillType(token);
      setSkillTypes(response.data);
    } catch (error) {
      terror(error.message);
    }
  }

  async function fetchAllSkills() {
    try {
      const response = await Api.getAllSkills(token);
      setAllSkills(response.data);
    } catch (error) {
      terror(error.message);
    }
  }

  async function createSkill(skill) {
    const prop = { id: 0, name: skill.name, type: skill.type };
    console.log(prop);
    try {
      const response = await Api.addSkillToProjectDto(token, id, skill);
      const newSkill = response.data;
      addSkillToAll(newSkill);
      addProjectSkill(newSkill);
      tsuccess("Skill " + skill.name + " created successfully!");
    } catch (error) {
      terror(error.message);
    }
  }

  return (
    <ItemDropdown
      fetchTypes={fetchSkillTypes}
      fetchItems={fetchProjectSkills}
      fetchAllItems={fetchAllSkills}
      createItem={createSkill}
      addItem={addSkillToProject}
      removeItem={removeSkillFromProject}
      items={projectSkillsData}
      allItems={allSkills}
      types={skillTypes}
      hasTypes={true}
    />
  );
}

export default UserSkills;
