import React from "react";
import ItemDropdown from "../tags/item-drop-down";
import { useUserStore } from "../stores/useUserStore";
import { Api } from "../../api";
import { tsuccess, terror } from "../toasts/message-toasts";

function UserSkills() {
  const token = "49b51dc4-c4ed-4ee8-8015-4318156d14ee";
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
      console.log(skill);
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
      fetchItems={fetchSkills}
      fetchAllItems={fetchAllSkills}
      createItem={createSkill}
      addItem={addUserSkill}
      removeItem={removeUserSkill}
      items={skills}
      allItems={allSkills}
      types={skillTypes}
      hasTypes={true}
    />
  );
}

export default UserSkills;
