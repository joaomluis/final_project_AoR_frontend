import React from "react";
import LogsCard from "../logs/logs";

import { Row, Col } from "reactstrap";
import ChatCard from "../chat/chat-card";

export default function ProjectMainPage({ id }) {
  return (
    <div className="project-main-page">
      <Row>
        <Col>
          <ChatCard id={id} />
        </Col>
      </Row>
    </div>
  );
}
