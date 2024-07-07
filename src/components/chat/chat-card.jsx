import React, { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { Card, CardHeader, CardTitle, CardBody, Button } from "reactstrap";
import CustomMessageBox from "./custom-messagebox";
import { Input } from "react-chat-elements";
import { FaPaperPlane } from "react-icons/fa";
import "./chat.css";
import NotificationType from "../../components/websockets/NotificationType";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { useUserStore } from "../../stores/useUserStore";
import useMessageStore from "../../stores/useMessageStore";
import { Api } from "../../api";
import { webSocketStore as useWebSocketStore } from "../../stores/useWebSocketStore";

function ChatCard({ id }) {
  const { t } = useTranslation();
  const messagesDivRef = useRef(null);
  const [messageInput, setMessageInput] = useState("");
  const token = useUserStore((state) => state.token);
  const socket = useWebSocketStore((state) => state.socket);
  const [totalPages, setTotalPages] = useState(1);
  const messages = useMessageStore((state) => state.messages);
  const setMessages = useMessageStore((state) => state.setMessages);
  const addMessagePage = useMessageStore((state) => state.addMessagePage);
  const email = useUserStore((state) => state.email);
  const [page, setPage] = useState(1);
  const location = useLocation(); // Obtendo o objeto de localização

  async function getMessages() {
    const props = {
      page_number: page,
      page_size: 10,
    };
    try {
      const response = await Api.getProjectMessages(token, id, props);
      console.log("response", response);
      if (page === 1) {
        console.log("page 1");
        setMessages(response.data.results);
      } else if (page > 1) {
        console.log(page);
        addMessagePage(response.data.results);
        // setMessages((prevMessages) => [...prevMessages, ...response.data.results]);
      }
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  }

  const loadMoreMessages = () => {
    setPage((prevPage) => {
      if (prevPage < totalPages) {
        return prevPage + 1;
      } else {
        console.log("Todas as páginas foram carregadas.");
        return prevPage;
      }
    });
  };

  useEffect(() => {
    getMessages();
  }, [page, location]);

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setMessageInput(e.target.value);
  };

  const handleInputSubmit = (e) => {
    console.log("handleInputSubmit");
    e.preventDefault();

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
    }
    setMessageInput("");
  };

  function formatNotificationTime(time) {
    return format(new Date(time), "d MMM yyyy, HH:mm");
  }
  useEffect(() => {
    if (messagesDivRef.current) {
      messagesDivRef.current.scrollTop = messagesDivRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h3">{t("chat")}</CardTitle>
      </CardHeader>
      <CardBody
        style={{
          backgroundColor: "var(--greyish)",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          maxWidth: "100%",
        }}
      >
        <div
          ref={messagesDivRef}
          style={{
            overflowY: "scroll",
            maxHeight: "20rem",
            minHeight: "20rem",
            borderRadius: "0.5rem",
            flexGrow: 1,
            overflowX: "hidden",
          }}
        >
          {page < totalPages ? (
            <Button outline className="button-style1" style={{ backgroundColor: "var(--whitey)", color: "var(--greyish)" }} onClick={loadMoreMessages}>
              {t("load-more")}
            </Button>
          ) : null}
          {messages.map((message, index) => {
            // Verifica se a mensagem anterior foi enviada pelo mesmo usuário
            const showSenderName = index === 0 || messages[index - 1].userEmail !== message.userEmail;
            return (
              <CustomMessageBox
                key={message.id}
                position={message.userEmail === email ? "right" : "left"}
                type="text"
                text={message.message}
                date={true}
                dateString={formatNotificationTime(message.createdAt)}
                senderName={showSenderName ? message.userFirstName : undefined} // Mostra o nome do usuário apenas se showSenderName for true
              />
            );
          })}
        </div>

        <form onSubmit={handleInputSubmit}>
          <Input
            placeholder={t("type-message")}
            value={messageInput}
            onChange={handleInputChange}
            rightButtons={
              <Button text="Send" className="btn-sent" onClick={handleInputSubmit}>
                <FaPaperPlane />
              </Button>
            }
          />
        </form>
      </CardBody>
    </Card>
  );
}

export default ChatCard;
