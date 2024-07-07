import React, { useEffect, useState } from "react";
import UserList from "./users-list-table-card";
import { Api } from "../../../api.js";
import { useUserStore } from "../../../stores/useUserStore.js";
import { tsuccess, terror } from "../../toasts/message-toasts.jsx";
import useMessageStore from "../../../stores/useMessageStore.js";

const EditUsersPage = (props) => {
  const token = useUserStore((state) => state.token);
  const activeTab = useMessageStore((state) => state.activeTab);
  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    try {
      const response = await Api.getProjectUsers(token, props.id);
      setUsers(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    if (activeTab === "5") {
      fetchUsers();
      console.log("fetching users");
    }
  }, [activeTab]);

  const handleChangeRole = (userId, newRole) => {
    console.log(userId, newRole);

    try {
      const dto = {
        role: newRole,
        projectId: props.id,
        userId: userId,
      };
      const response = Api.updateUserRole(token, userId, dto);
      console.log(response.data);
      setUsers((prevUsers) => prevUsers.map((user) => (user.id === userId ? { ...user, role: newRole } : user)));
    } catch (error) {
      terror(error.message);
    }
  };

  const handleKickUser = (userId) => {
    console.log(userId);
    try {
      const response = Api.kickUser(token, userId, props.id);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      tsuccess("user kicked");
    } catch (error) {
      terror(error.message);
    }
  };

  return (
    <div>
      <UserList users={users} handleChangeRole={handleChangeRole} handleKickUser={handleKickUser} edit={props.edit} />
    </div>
  );
};

export default EditUsersPage;
