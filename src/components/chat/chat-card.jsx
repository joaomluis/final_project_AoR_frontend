import React, { useRef, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardBody, Button } from "reactstrap";
import CustomMessageBox from "./custom-messagebox";
import { Input } from "react-chat-elements";
import { FaPaperPlane } from "react-icons/fa";
import "./chat.css";
import { format } from "date-fns";
import { useUserStore } from "../../stores/useUserStore";
function ChatCard({ messages, handleInputSubmit, handleInputChange, messageInput }) {
  const messagesDivRef = useRef(null);
  const email = useUserStore((state) => state.email);
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
          {messages?.map((message, index) => (
            <CustomMessageBox
              key={message.id}
              position={message.userEmail === email ? "right" : "left"}
              type="text"
              text={message.message}
              date={true}
              dateString={formatNotificationTime(message.createdAt)}
              // status={message.read ? "read" : "delivered"}
              senderName={message.userFirstName}
            />
          ))}
        </div>

        <form onSubmit={handleInputSubmit}>
          <Input
            placeholder="Type a message"
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
