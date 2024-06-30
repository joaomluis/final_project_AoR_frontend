import React from "react";

import { Row, Col } from "reactstrap";
import ChatCard from "../chat/chat-card";

export default function ProjectMainPage({ id }) {
  return (
    <div className="project-main-page">
      <Row>
        <Col>
          <div>another cards</div>
          <ChatCard id={id} />
        </Col>
      </Row>
    </div>
  );
}
