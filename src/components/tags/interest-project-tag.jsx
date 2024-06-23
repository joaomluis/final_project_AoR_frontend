import React, { useEffect, useState } from "react";
import ItemDropdown from "./item-drop-down";
import { useUserStore } from "../stores/useUserStore";
import { Api } from "../../api";
import { tsuccess, terror } from "../toasts/message-toasts";
import useCreateProjectStore from "../stores/useCreateProjectStore";

function UserInterests() {
  const token = useUserStore((state) => state.token);

  const projectKeywords = useCreateProjectStore((state) => state.projectKeywords);
  const updateProjectResources = useCreateProjectStore(
    (state) => state.setProjectKeywords
  );
  const addProjectKeyword = useCreateProjectStore((state) => state.addProjectKeyword);
  const removeProjectKeyword = useCreateProjectStore((state) => state.removeProjectKeyword);

  const [selectedProjectKeywords, setSelectedProjectKeywords] = useState(projectKeywords);
  
  const email = useUserStore((state) => state.email);
  const interests = useUserStore((state) => state.interests);
  const allInterests = useUserStore((state) => state.allInterests);
  const updateAllInterests = useUserStore((state) => state.updateAllInterests);
  const updateInterests = useUserStore((state) => state.updateInterests);
  const addInterest = useUserStore((state) => state.addInterest);
  const addInterestToAll = useUserStore((state) => state.addInterestToAll);
  const removeInterest = useUserStore((state) => state.removeInterest);


  const handleSelectedKeyword = (newKeyword) => {
    addProjectKeyword(newKeyword);
  }

  const removeSelectedKeyword = (keyword) => {
    removeProjectKeyword(keyword);
  }
  

  useEffect(() => {
    console.log(projectKeywords);
  }, [projectKeywords]);



  async function fetchAllInterests() {
    try {
      const response = await Api.getAllInterests(token);
      updateAllInterests(response.data);
    } catch (error) {
      terror(error.message);
    }
  }

  async function createInterest(interest) {
    try {
      const response = await Api.addInterest(token, interest);
      interest = response.data;
      addInterestToAll(interest);
      addInterest(interest);
      tsuccess("Interest " + interest.name + " created successfully!");
    } catch (error) {
      terror(error.message);
    }
  }

  async function addUserInterest(interest) {
    try {
      const response = await Api.addInterest(token, interest);
      addInterest(response.data);
    } catch (error) {
      terror(error.message);
    }
  }

  async function removeUserInterest(interest) {
    try {
      const response = await Api.removeInterest(token, interest);
      removeInterest(interest);
      tsuccess("Interest " + interest.name + " removed successfully!");
    } catch (error) {
      terror(error.message);
    }
  }

  return (
    <ItemDropdown
      // fetchTypes={fetchSkillTypes}
      fetchItems={projectKeywords}
      fetchAllItems={fetchAllInterests}
      createItem={createInterest}
      addItem={handleSelectedKeyword}
      removeItem={removeSelectedKeyword}
      items={projectKeywords}
      allItems={allInterests}
      hasTypes={false}
    />
  );
}

export default UserInterests;
