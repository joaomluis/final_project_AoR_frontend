import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";

// import useCreateProjectStore from "../stores/useCreateProjectStore.js";

import { Api } from "../../api.js";
import { useUserStore } from "../../stores/useUserStore.js";

import ProjectPreview from "../../components/Preview/project-preview.jsx";
import ProjectBasicInfo from "./project-basic-info.jsx";

function ProjectSettings({ data }) {
  const token = useUserStore((state) => state.token);

  return (
    <>
      <Row>
        <Col md={12}>
          <ProjectBasicInfo data={data} />
        </Col>
      </Row>
      <Row>
        <Col md={6}></Col>
        <Col md={6}></Col>
      </Row>
    </>
  );
}

export default ProjectSettings;
