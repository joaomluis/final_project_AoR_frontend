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
  const setProjectKeywords = useEditProjectStore((state) => state.setProjectKeywords);
  const addProjectKeyword = useEditProjectStore((state) => state.addProjectKeyword);
  const removeProjectKeyword = useEditProjectStore((state) => state.removeProjectKeyword);

  
  async function addInterestToProject(token, projectId, interestId) {
    try {
      const response = await Api.addInterestToProject(token, projectId, interestId);
      console.log(response.data);
      tsuccess(response.data);
    } catch (error) {
      terror(error.message);
      console.error('Error adding interest:', error);
    }
  }

  async function removeInterestFromProject(token, projectId, interestId) {
    try {
      const response = await Api.removeInterestFromProject(token, projectId, interestId);
      tsuccess(response.data);
    } catch (error) {
      terror(error.message);
      console.error('Error removing interest:', error);
    }
  }
        

  const addSelectedKeyword = (newKeyword) => {
    addInterestToProject(token, id, newKeyword.id)
    addProjectKeyword(newKeyword);
  };

  const removeSelectedKeyword = (keyword) => {
    removeInterestFromProject(token, id, keyword.id)
    removeProjectKeyword(keyword);
  };

  const email = useUserStore((state) => state.email);
  
  const allInterests = useUserStore((state) => state.allInterests);
  const updateAllInterests = useUserStore((state) => state.updateAllInterests);
  const updateInterests = useUserStore((state) => state.updateInterests);
  const addInterest = useUserStore((state) => state.addInterest);
  const addInterestToAll = useUserStore((state) => state.addInterestToAll);
  const removeInterest = useUserStore((state) => state.removeInterest);


  async function fetchProjectInterests() {
    try {
      const response = await Api.getInterestsFromProject(token, id);
      
      setProjectKeywords(response.data);
      
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


  return (
    <ItemDropdown
      // fetchTypes={fetchSkillTypes}
      fetchItems={fetchProjectInterests}
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
