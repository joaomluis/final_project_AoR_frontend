import { Container, Col, Row, ButtonGroup, Button, Card, CardBody } from "reactstrap";
import "react-chat-elements/dist/main.css";
import "../components/chat/chat.css";
import { useState, useRef, useEffect } from "react";
import LogsCard from "../components/logs/logs";
import "../assets/css/general-css.css";
import { useUserStore } from "../stores/useUserStore";
import ChatCard from "../components/chat/chat-card";
import "../components/logs/logs.css";
import { Api } from "../api";
import useMessageStore from "../stores/useMessageStore";
import NotificationType from "../components/websockets/NotificationType";
import { webSocketStore as useWebSocketStore } from "../stores/useWebSocketStore";
function Testing() {
  const token = useUserStore((state) => state.token);
  const id = 1;
  const [messageInput, setMessageInput] = useState("");
  const socket = useWebSocketStore((state) => state.socket);
  const messages = useMessageStore((state) => state.messages);
  const setMessages = useMessageStore((state) => state.setMessages);
  const email = useUserStore((state) => state.email);
  const [page, setPage] = useState(1);
  async function getMessages() {
    const props = {
      page_number: page,
    };
    try {
      const response = await Api.getProjectMessages(token, id, props);
      setMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMessages();
  }, []);

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setMessageInput(e.target.value);
  };

  const handleInputSubmit = (e) => {
    console.log("handleInputSubmit");
    e.preventDefault();

    console.log("Socket:", socket);
    console.log("Socket State:", socket ? socket.readyState : "Socket not defined");
    if (socket && socket.readyState === WebSocket.OPEN) {
      console.log("socket open");
      const newMessage = {
        message: messageInput,
        sendUser: email,
        projectId: id,
        type: NotificationType.PROJECT_MESSAGE,
      };
      let messageJSON = JSON.stringify(newMessage);
      socket.send(messageJSON);
      console.log(messageJSON);
    }
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

  // function messageCard() {
  //   return (
  //     <Col lg={12} md={12} sm={12}>
  //       <ChatCard messages={messages} handleInputSubmit={handleInputSubmit} handleInputChange={handleInputChange} messageInput={messageInput} />
  //     </Col>
  //   );
  // }

  return (
    <div className="testing-section1" style={{ height: "100vh", padding: "1rem" }}>
      <Container>
        <ChatCard
          messages={Array.isArray(messages) ? messages : []}
          handleInputSubmit={handleInputSubmit}
          handleInputChange={handleInputChange}
          messageInput={messageInput}
        />
      </Container>
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
