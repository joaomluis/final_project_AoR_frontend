import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardFooter, CardHeader, CardSubtitle, CardTitle, Row, Table, Col } from "reactstrap";
import Select from "react-select";
import { FaUserCheck, FaUserTimes, FaEye } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";

const UsersManagement = () => {
  const [loading, setLoading] = useState(false);

  const users = [
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
  ];

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

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const renderTable = () => (
    <Table responsive bordered>
      <thead>
        <tr>
          <th>Perfil</th>
          <th>Nome</th>
          <th>Laboratório</th>
          <th>Função</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <img alt="profile" src={user.imagePath} className="profile-image" style={{ width: "50px", height: "50px" }} />
            </td>
            <td>
              <div>
                {user.firstname} {user.lastname}
              </div>
              <div>
                <strong>{user.role === "admin" ? "Admin" : "Usuário"}</strong>
              </div>
            </td>
            <td>{user.lablocation}</td>
            <td>
              <Select
                onChange={(e) => handleChangeRole(user.id, e.value)}
                options={[
                  { value: "user", label: "Usuário" },
                  { value: "admin", label: "Administrador" },
                ]}
                className="w-100"
                defaultValue={{ value: user.role, label: user.role === "user" ? "Usuário" : "Administrador" }}
              />
            </td>
            <td>
              <div className="d-flex justify-content-around">
                <Link to={`/fica-lab/user/${user.id}`} className="btn btn-link p-0">
                  <FaEye size={20} color="blue" />
                </Link>
                <Button color="link" onClick={() => handleAcceptResume(user.id)} className="p-0">
                  <FaUserCheck size={20} color="green" />
                </Button>
                <Button color="link" onClick={() => handleKickUser(user.id)} className="p-0">
                  <FaUserTimes size={20} color="red" />
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  const renderCards = () => (
    <Row>
      {users.map((user) => (
        <Col key={user.id} sm="12" md="6" lg="4" className="mb-4">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">
                <div className="d-flex align-items-center">
                  <img alt="profile" src={user.imagePath} className="profile-image" style={{ width: "50px", height: "50px", marginRight: "10px" }} />
                  {user.firstname} {user.lastname}
                </div>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <CardSubtitle className="mb-2">
                <strong>{user.role === "admin" ? "Admin" : "Usuário"}</strong>
              </CardSubtitle>
              <CardSubtitle>
                Lab: <strong>{user.lablocation}</strong>
              </CardSubtitle>
              <Select
                onChange={(e) => handleChangeRole(user.id, e.value)}
                options={[
                  { value: "user", label: "Usuário" },
                  { value: "admin", label: "Administrador" },
                ]}
                className="mt-3"
                defaultValue={{ value: user.role, label: user.role === "user" ? "Usuário" : "Administrador" }}
              />
            </CardBody>
            <CardFooter>
              <div className="d-flex justify-content-around">
                <Link to={`/fica-lab/user/${user.id}`} className="btn btn-link p-0">
                  <FaEye size={20} color="blue" />
                </Link>
                <Button color="link" onClick={() => handleAcceptResume(user.id)} className="p-0">
                  <FaUserCheck size={20} color="green" />
                </Button>
                <Button color="link" onClick={() => handleKickUser(user.id)} className="p-0">
                  <FaUserTimes size={20} color="red" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </Col>
      ))}
    </Row>
  );

  return <div>{isMobile ? renderCards() : renderTable()}</div>;
};

export default UsersManagement;
