import React, { useRef, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardBody, Button } from "reactstrap";
import CustomMessageBox from "./custom-messagebox";
import { Input } from "react-chat-elements";
import { FaPaperPlane } from "react-icons/fa";
import "./chat.css";
function ChatCard({
  messages,
  handleInputSubmit,
  handleInputChange,
  messageInput,
}) {
  const messagesDivRef = useRef(null);

  useEffect(() => {
    if (messagesDivRef.current) {
      messagesDivRef.current.scrollTop = messagesDivRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h3">Chat</CardTitle>
      </CardHeader>
      <CardBody
        style={{
          backgroundColor: "var(--greyish)",
          padding: "10px",
        }}
      >
        <div
          ref={messagesDivRef}
          style={{
            overflowY: "scroll",
            maxHeight: "20rem",
            minHeight: "20rem",
            borderRadius: "0.5rem",
          }}
        >
          {messages.map((message, index) => (
            <CustomMessageBox
              key={index}
              position={message.sender === "me" ? "right" : "left"}
              type="text"
              text={message.message}
              date={true}
              dateString={message.time}
              status={message.read ? "read" : "delivered"}
              senderName={message.sender}
            />
          ))}
        </div>

        <form onSubmit={handleInputSubmit}>
          <Input
            placeholder="Type a message"
            value={messageInput}
            onChange={handleInputChange}
            rightButtons={
              <Button
                text="Send"
                className="btn-sent"
                onClick={handleInputSubmit}
              >
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
