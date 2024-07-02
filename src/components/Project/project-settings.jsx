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
  const [projectResources, setProjectResources] = useState([]);
  const [projectSkills, setProjectSkills] = useState([]);
  const [projectKeywords, setProjectKeywords] = useState([]);

  useEffect(() => {
    async function fetchProjectUsers() {
      try {
        const response = await Api.getUsersForProject(token, id);
        setProjectUsers(response.data);
      } catch (error) {
        console.log(error.message);
      }
    }

    async function fetchProjectKeywords() {
      try {
        const response = await Api.getInterestsForProject(token, id);
        setProjectKeywords(response.data);
      } catch (error) {
        console.log(error.message);
      }
    }

    async function fetchProjectResources() {
      try {
        const response = await Api.getProductsForProject(token, id);
        console.log(response.data);
        setProjectResources(response.data);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchProjectResources();
    fetchProjectUsers();
    fetchProjectKeywords();
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
          <ProjectAdditionalInfo data={projectResources} title="Project Resources" />
        </Col>
        <Col md={6}>
          <ProjectAdditionalInfo data={projectUsers} title="Project Users" />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <ProjectAdditionalInfo data={projectKeywords} title="Project Keywords" />
        </Col>
        <Col md={6}>
          <ProjectAdditionalInfo data={projectUsers} title="Project Users" />
        </Col>
      </Row>
    </>
  );
}

export default ProjectSettings;
