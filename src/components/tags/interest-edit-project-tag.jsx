import React, { useEffect } from "react";
import ItemDropdown from "./item-drop-down";
import { useUserStore } from "../../stores/useUserStore";
import { Api } from "../../api";
import { tsuccess, terror } from "../toasts/message-toasts";
import useEditProjectStore from "../../stores/useEditProjectStore";
import {useParams} from "react-router-dom";

function EditKeywordsInterests() {
  const token = useUserStore((state) => state.token);
  const { id } = useParams();
 
  const projectKeywordsData = useEditProjectStore((state) => state.projectKeywords);
  const addProjectKeyword = useEditProjectStore((state) => state.addProjectKeyword);
  const removeProjectKeyword = useEditProjectStore((state) => state.removeProjectKeyword);

  
  async function addInterestToProject(token, projectId, interestId) {
    try {
      const response = await Api.addInterestToProject(token, projectId, interestId);
      tsuccess(response);
    } catch (error) {
      
      console.error('Error adding interest:', error);
    }
  }
        

  const addSelectedKeyword = (newKeyword) => {
    console.log(token);
    addInterestToProject(token, id, newKeyword.id)
    addProjectKeyword(newKeyword);
  };

  const removeSelectedKeyword = (keyword) => {
    removeProjectKeyword(keyword);
  };

  const email = useUserStore((state) => state.email);
  
  const allInterests = useUserStore((state) => state.allInterests);
  const updateAllInterests = useUserStore((state) => state.updateAllInterests);
  const updateInterests = useUserStore((state) => state.updateInterests);
  const addInterest = useUserStore((state) => state.addInterest);
  const addInterestToAll = useUserStore((state) => state.addInterestToAll);
  const removeInterest = useUserStore((state) => state.removeInterest);


  async function fetchInterests() {
    try {
      const response = await Api.getUserInterests(token, email);
      
      updateInterests(response.data);
      
    } catch (error) {
      terror(error.message);
    }
  }

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
      fetchItems={fetchInterests}
      fetchAllItems={fetchAllInterests}
      createItem={createInterest}
      addItem={addSelectedKeyword}
      removeItem={removeSelectedKeyword}
      items={projectKeywordsData}
      allItems={allInterests}
      hasTypes={false}
    />
  );
}

export default EditKeywordsInterests;
