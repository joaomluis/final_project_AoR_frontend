import React, { useEffect, useState } from "react";
import UserList from "./users-list-table-card";
import { terror, tsuccess } from "../../toasts/message-toasts";
import { Api } from "../../../api";
import { useUserStore } from "../../../stores/useUserStore";
import useMessageStore from "../../../stores/useMessageStore";

const UserInvitationsPage = (props) => {
  const token = useUserStore((state) => state.token);
  const activeTab = useMessageStore((state) => state.activeTab);
  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    try {
      const response = await Api.getInvites(token, props.id);
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (activeTab === "6") fetchUsers();
  }, [activeTab]);

  const handleAcceptResume = (userId, boolean) => {
    const dto = {
      accept: boolean,
      userId: userId,
    };
    try {
      const response = Api.acceptResume(token, props.id, dto);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      if (boolean) tsuccess("Invite accepted");
      else tsuccess("Invite declined");
    } catch (error) {
      terror("fail");
    }
  };

  const handleChangeRole = (userId, newRole) => {
    // Função para modificar a função (role) de um usuário
    // Implemente a lógica para enviar a solicitação ao backend
  };

  const handleKickUser = (userId) => {
    // Função para remover um usuário
    // Implemente a lógica para enviar a solicitação ao backend
  };

  return (
    <div>
      {/* <h1>Convites de Usuários</h1> */}
      <UserList users={users} handleAcceptResume={handleAcceptResume} handleChangeRole={handleChangeRole} handleKickUser={handleKickUser} />
    </div>
  );
};

export default UserInvitationsPage;
