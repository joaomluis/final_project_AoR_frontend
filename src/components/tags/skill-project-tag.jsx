import React, {useEffect} from "react";
import ItemDropdown from "./item-drop-down";
import { useUserStore } from "../stores/useUserStore";
import { Api } from "../../api";
import { tsuccess, terror } from "../toasts/message-toasts";
import useCreateProjectStore from "../stores/useCreateProjectStore";
//
function UserSkills() {
  const token = useUserStore((state) => state.token);


  const projectSkills = useCreateProjectStore((state) => state.projectSkills);
  const addProjectSkill = useCreateProjectStore((state) => state.addProjectSkill);
  const removeProjectSkill = useCreateProjectStore((state) => state.removeProjectSkill);


  const email = useUserStore((state) => state.email);
  const skills = useUserStore((state) => state.skills);
  const allSkills = useUserStore((state) => state.allSkills);
  const skillTypes = useUserStore((state) => state.skillTypes);
  const updateAllSkills = useUserStore((state) => state.updateAllSkills);
  const updateSkills = useUserStore((state) => state.updateSkills);
  const updateSkillTypes = useUserStore((state) => state.updateSkillTypes);
  const addSkill = useUserStore((state) => state.addSkill);
  const addSkillToAll = useUserStore((state) => state.addSkillToAll);
  const removeSkill = useUserStore((state) => state.removeSkill);



  const handleSelectedSkill = (newSkill) => {
    addProjectSkill(newSkill);
  }

  const removeSelectedSkill = (skill) => {
    console.log(skill);
    
    removeProjectSkill(skill.id);
  }


  async function fetchSkillTypes() {
    try {
      const response = await Api.getSkillType(token);
      updateSkillTypes(response.data);
    } catch (error) {
      terror(error.message);
    }
  }

  async function fetchSkills() {
    try {
      const response = await Api.getUserSkills(token, email);
      updateSkills(response.data);
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

  async function addUserSkill(skill) {
    try {
      const response = await Api.addSkill(token, skill);
      skill = response.data;
      addSkill(skill);
    } catch (error) {
      terror(error.message);
    }
  }

  async function removeUserSkill(skill) {
    try {
      const response = await Api.removeSkill(token, skill);
      removeSkill(skill);
      tsuccess("Skill " + skill.name + " removed successfully!");
    } catch (error) {
      terror(error.message);
    }
  }

  return (
    <ItemDropdown
      fetchTypes={fetchSkillTypes}
      fetchItems={projectSkills}
      fetchAllItems={fetchAllSkills}
      createItem={createSkill}
      addItem={handleSelectedSkill}
      removeItem={removeSelectedSkill}
      items={projectSkills}
      allItems={allSkills}
      types={skillTypes}
      hasTypes={true}
    />
  );
}

export default UserSkills;
