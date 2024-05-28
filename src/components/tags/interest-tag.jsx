import React from "react";
import ItemDropdown from "../tags/item-drop-down";
import { useUserStore } from "../stores/useUserStore";
import { Api } from "../../api";
import { tsuccess, terror } from "../toasts/message-toasts";

function UserInterests() {
  const token = "49b51dc4-c4ed-4ee8-8015-4318156d14ee";
  const email = useUserStore((state) => state.email);
  const interests = useUserStore((state) => state.interests);
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
      addItem={addUserInterest}
      removeItem={removeUserInterest}
      items={interests}
      allItems={allInterests}
      hasTypes={false}
    />
  );
}

export default UserInterests;
