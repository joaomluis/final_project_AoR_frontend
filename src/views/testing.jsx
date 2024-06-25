import { Container, Col, Row, ButtonGroup, Button, Card, CardBody } from "reactstrap";
import "react-chat-elements/dist/main.css";
import "../components/chat/chat.css";
import { useState, useRef } from "react";
import LogsCard from "../components/logs/logs";
import "../assets/css/general-css.css";
import { useUserStore } from "../stores/useUserStore";
import ChatCard from "../components/chat/chat-card";
import "../components/logs/logs.css";
function Testing() {
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      message: "Olá, como você está?",
      // read: true,
      sender: "me",
      time: new Date().toLocaleString(),
    },
    {
      id: 2,
      message: "Estou bem, obrigado! E você?",
      // read: true,
      sender: "user2",
      time: new Date().toLocaleString(),
    },
    {
      id: 3,
      message: "Também estou bem, obrigado por perguntar!",
      // read: false,
      sender: "Ricardo",
      time: new Date().toLocaleString(),
    },
  ]);

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setMessageInput(e.target.value);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();

    // Adicione a nova mensagem ao array de mensagens
    const newMessage = {
      id: messages.length + 1,
      message: messageInput,
      sender: "me",

      time: new Date().toLocaleString(),
    };

    setMessages([...messages, newMessage]);
    setMessageInput("");
  };

  const logs = [
    {
      id: 1,
      instant: new Date(Date.now()),
      type: "USER_JOIN",
      user: { email: "User1" },
      affectedUser: { email: "AffectedUser1" },
      project: { name: "Project1" },
    },
    {
      id: 2,
      instant: new Date(Date.now() - 86400000),
      type: "TASK_CREATED",
      user: { id: "User2" },
      project: { id: "Project2" },
      task: { id: "Task1" },
    },
    {
      id: 3,
      instant: new Date(Date.now() - 86400000),
      type: "TASK_CREATED",
      user: { id: "User3" },
      project: { id: "Project3" },
      task: { id: "Task2" },
    },
    {
      id: 4,
      instant: new Date(Date.now() - 186400000),
      type: "TASK_CREATED",
      user: { id: "User4" },
      project: { id: "Project4" },
      task: { id: "Task3" },
    },
    // Adicione mais logs conforme necessário
  ];

  function messageCard() {
    return (
      <Col lg={12} md={12} sm={12}>
        <ChatCard messages={messages} handleInputSubmit={handleInputSubmit} handleInputChange={handleInputChange} messageInput={messageInput} />
      </Col>
    );
  }

  return (
    <div className="testing-section1" style={{ height: "100vh", padding: "1rem" }}>
      <Container>
        <h1 className="mb-3">Project Name Logs</h1>

        <div className="logs-header mb-3">
          <ButtonGroup>
            <Button outline>All</Button>
            <Button outline>Logs</Button>
            <Button outline>Notes</Button>
          </ButtonGroup>
          <Button style={{ whiteSpace: "nowrap" }}>Add Note</Button>
        </div>

        <Row>
          <Col lg={12}>
            <Card className="mb-3">
              <CardBody>
                <LogsCard logs={logs} />
              </CardBody>
            </Card>
          </Col>
          {/* <Col lg={6}>{messageCard()}</Col> */}
        </Row>
      </Container>
    </div>
  );
}

export default Testing;
