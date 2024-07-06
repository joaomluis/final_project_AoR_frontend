import React, { useState } from "react";
import UserList from "./users-list-table-card";

const UserInvitationsPage = (props) => {
  const [users, setUsers] = useState([
    {
      id: 1,
      firstname: "João",
      lastname: "Silva",
      email: "joao.silva@example.com",
      profile: "Desenvolvedor",
      role: "user",
      lablocation: "Lab A",
      privateProfile: false,
      username: "joaosilva",
      imagePath: "https://play-lh.googleusercontent.com/LeX880ebGwSM8Ai_zukSE83vLsyUEUePcPVsMJr2p8H3TUYwNg-2J_dVMdaVhfv1cHg",
    },
    {
      id: 2,
      firstname: "Maria",
      lastname: "Santos",
      email: "maria.santos@example.com",
      profile: "Designer",
      role: "admin",
      lablocation: "Lab B",
      privateProfile: false,
      username: "mariasantos",
      imagePath: "https://play-lh.googleusercontent.com/LeX880ebGwSM8Ai_zukSE83vLsyUEUePcPVsMJr2p8H3TUYwNg-2J_dVMdaVhfv1cHg",
    },
    // Adicione mais exemplos conforme necessário
  ]);

  const handleAcceptResume = (userId) => {
    // Função para aceitar o currículo de um usuário
    // Implemente a lógica para enviar a solicitação ao backend
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
