import React, { useEffect, useState } from "react";
import ItemDropdown from "./item-drop-down";
import { useUserStore } from "../../stores/useUserStore";
import { Api } from "../../api";
import { tsuccess, terror } from "../toasts/message-toasts";
import useCreateProjectStore from "../../stores/useCreateProjectStore";

function UserInterests() {
  const token = useUserStore((state) => state.token);

  const projectKeywords = useCreateProjectStore((state) => state.projectKeywords);
  const addProjectKeyword = useCreateProjectStore((state) => state.addProjectKeyword);
  const removeProjectKeyword = useCreateProjectStore((state) => state.removeProjectKeyword);

  const allInterests = useUserStore((state) => state.allInterests);
  const updateAllInterests = useUserStore((state) => state.updateAllInterests);
  const addInterest = useUserStore((state) => state.addInterest);
  const addInterestToAll = useUserStore((state) => state.addInterestToAll);

  const handleSelectedKeyword = (newKeyword) => {
    addProjectKeyword(newKeyword);
  };

  const removeSelectedKeyword = (keyword) => {
    removeProjectKeyword(keyword);
  };

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
      addProjectKeyword(interest);
      tsuccess("Interest " + interest.name + " created successfully!");
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
