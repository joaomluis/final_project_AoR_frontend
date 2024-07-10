import React, { useEffect } from "react";
import ItemDropdown from "./item-drop-down";
import { useUserStore } from "../../stores/useUserStore";
import { Api } from "../../api";
import { tsuccess, terror } from "../toasts/message-toasts";
import useEditProjectStore from "../../stores/useEditProjectStore";
import {useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

function EditProjectKeywords() {
  const { t } = useTranslation();

  const token = useUserStore((state) => state.token);
  const { id } = useParams();

  const projectKeywordsData = useEditProjectStore((state) => state.projectKeywords);
  const setProjectKeywords = useEditProjectStore((state) => state.setProjectKeywords);
  const addProjectKeyword = useEditProjectStore((state) => state.addProjectKeyword);
  const removeProjectKeyword = useEditProjectStore((state) => state.removeProjectKeyword);

  const allKeywords = useEditProjectStore((state) => state.allKeywords);
  const setAllKeywords = useEditProjectStore((state) => state.setAllKeywords);
  const addKeywordToAll = useEditProjectStore((state) => state.addKeywordToAll);

  // const allInterests = useUserStore((state) => state.allInterests);
  // const updateAllInterests = useUserStore((state) => state.updateAllInterests);
  // const addInterest = useUserStore((state) => state.addInterest);
  // const addInterestToAll = useUserStore((state) => state.addInterestToAll);

  async function addInterestToProject(interestId) {
    console.log(interestId);
    try {
      const response = await Api.addInterestToProject(token, id, interestId.id);
      console.log(response.data);
      addProjectKeyword(interestId);
      tsuccess(response.data);
    } catch (error) {
      terror(error.message);
      console.error("Error adding interest:", error);
    }
  }

  async function removeInterestFromProject(interestId) {
    console.log(interestId);
    try {
      const response = await Api.removeInterestFromProject(token, id, interestId.id);
      removeProjectKeyword(interestId);
      tsuccess(response.data);
    } catch (error) {
      terror(error.message);
      console.error("Error removing interest:", error);
    }
  }

  // const addSelectedKeyword = (newKeyword) => {
  //   addInterestToProject(token, id, newKeyword.id);
  // };

  // const removeSelectedKeyword = (keyword) => {
  //   removeInterestFromProject(token, id, keyword.id);
  // };


  async function fetchProjectInterests() {
    try {
      const response = await Api.getInterestsFromProject(token, id);

      setProjectKeywords(response.data);
    } catch (error) {
      terror(error.message);
    }
  }

  async function fetchAllInterests() {
    console.log("fetching all interests");
    try {
      const response = await Api.getAllInterests(token);
      setAllKeywords(response.data);
    } catch (error) {
      terror(error.message);
    }
  }

  async function createInterest(interest) {
    const prop = { id: 0, name: interest.name };
    console.log(prop);
    try {
      const response = await Api.createInterestToProject(token, id, prop);
      interest = response.data;
      addProjectKeyword(interest);
      addKeywordToAll(interest);
      // addInterestToProject(interest);
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
      addItem={addInterestToProject}
      removeItem={removeInterestFromProject}
      items={projectKeywordsData}
      allItems={allKeywords}
      hasTypes={false}
    />
  );
}

export default EditProjectKeywords;
