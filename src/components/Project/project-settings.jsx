import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "reactstrap";

import ProjectBasicInfo from "./project-basic-info.jsx";
import ProjectAdditionalInfo from "./project-additional-info.jsx";
import EditKeywords from "./edit-keywords-modal.jsx";
import EditSkills from "./edit-skills-modal.jsx";

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

  //GETTERS com a informação sobre o projeto aberto vão buscar a info através do id que está no url
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
        setProjectResources(response.data);
      } catch (error) {
        console.log(error.message);
      }
    }

    async function fetchProjectSkills() {
      try {
        const response = await Api.getSkillsForProject(token, id);
        setProjectSkills(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchProjectSkills();
    fetchProjectResources();
    fetchProjectUsers();
    fetchProjectKeywords();
  }, []);

  //Renderização dos modals para edição 
  const editKeywordsRef = useRef();
  const openEditKeywordsModal = () => {
    editKeywordsRef.current.open();
  };

  const editSkillsRef = useRef();
  const openEditSkillsModal = () => {
    editSkillsRef.current.open();
  };

  return (
    <>
    <EditKeywords ref={editKeywordsRef} />
    <EditSkills ref={editSkillsRef} />
      <Row>
        <Col md={12}>
          <ProjectBasicInfo data={data} />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <ProjectAdditionalInfo
            data={projectResources}
            title="Project Resources"
          />
        </Col>
        <Col md={6}>
          <ProjectAdditionalInfo data={projectUsers} title="Project Users" />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <ProjectAdditionalInfo
            data={projectKeywords}
            title="Project Keywords"
            editButton={openEditKeywordsModal}
          />
        </Col>
        <Col md={6}>
          <ProjectAdditionalInfo data={projectSkills} title="Project Skills" editButton={openEditSkillsModal}/>
        </Col>
      </Row>
    </>
  );
}

export default ProjectSettings;
