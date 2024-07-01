import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";

import ProjectBasicInfo from "./project-basic-info.jsx";
import ProjectAdditionalInfo from "./project-additional-info.jsx";

import { useUserStore } from "../../stores/useUserStore.js";
import { Api } from "../../api.js";
import { useParams } from "react-router-dom";



function ProjectSettings({ data }) {

  const token = useUserStore((state) => state.token);
  const { id } = useParams();

  const [projectUsers, setProjectUsers] = useState([]);
  const [projectSkills, setProjectSkills] = useState([]);
  const [projectKeywords, setProjectKeywords] = useState([]);

  useEffect(() => {
    async function fetchProjectUsers() {
      try {
        const response = await Api.getUsersForProject(token, id);
        console.log(response.data);
        setProjectUsers(response.data);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchProjectUsers();
  }, []);


  return (
    <>
      <Row>
        <Col md={12}>
          <ProjectBasicInfo data={data} />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          
        </Col>
        <Col md={6}>
          <ProjectAdditionalInfo data={projectUsers} title="Project Users" />
        </Col>
      </Row>
    </>
  );
}

export default ProjectSettings;
