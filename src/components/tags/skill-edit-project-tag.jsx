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


  async function addSkillToProject(token, projectId, skillId) {
    try {
      const response = await Api.addSkillToProject(token, projectId, skillId);
      tsuccess(response.data);
    } catch (error) {
      terror(error.message);
      console.error('Error adding interest:', error);
    }
  }

  async function removeInterestFromProject(token, projectId, skillId) {
    try {
      const response = await Api.removeSkillFromProject(token, projectId, skillId);
      tsuccess(response.data);
    } catch (error) {
      terror(error.message);
      console.error('Error removing interest:', error);
    }
  }

  const allSkills = useUserStore((state) => state.allSkills);
  const skillTypes = useUserStore((state) => state.skillTypes);
  const updateAllSkills = useUserStore((state) => state.updateAllSkills);
  const updateSkillTypes = useUserStore((state) => state.updateSkillTypes);
  const addSkill = useUserStore((state) => state.addSkill);
  const addSkillToAll = useUserStore((state) => state.addSkillToAll);

  const addSelectedSkill = (newSkill) => {
    addSkillToProject(token, id, newSkill.id);
    addProjectSkill(newSkill);
  };

  const removeSelectedSkill = (skill) => { 
    removeInterestFromProject(token, id, skill.id);
    removeProjectSkill(skill.id);
  };

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
      updateSkillTypes(response.data);
    } catch (error) {
      terror(error.message);
    }
  }


  async function fetchAllSkills() {
    try {
      const response = await Api.getAllSkills(token);
      updateAllSkills(response.data);
    } catch (error) {
      terror(error.message);
    }
  }

  async function createSkill(skill) {
    try {
      const response = await Api.addSkill(token, skill);
      skill = response.data;
      addSkillToAll(skill);
      addSkill(skill);
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
      addItem={addSelectedSkill}
      removeItem={removeSelectedSkill}
      items={projectSkillsData}
      allItems={allSkills}
      types={skillTypes}
      hasTypes={true}
    />
  );
}

export default UserSkills;
