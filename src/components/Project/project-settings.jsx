import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "reactstrap";

import ProjectBasicInfo from "./project-basic-info.jsx";
import ProjectAdditionalInfo from "./project-additional-info.jsx";
import EditKeywords from "./edit-keywords-modal.jsx";
import EditSkills from "./edit-skills-modal.jsx";

import { useUserStore } from "../../stores/useUserStore.js";
import { Api } from "../../api.js";
import { useParams } from "react-router-dom";

import useEditProjectStore from "../../stores/useEditProjectStore.js";

function ProjectSettings({ data }) {
  const token = useUserStore((state) => state.token);
  const { id } = useParams();

  const [projectUsers, setProjectUsers] = useState([]);
  const [projectResources, setProjectResources] = useState([]);
  const [projectSkills, setProjectSkills] = useState([]);

  
  const projectKeywords = useEditProjectStore((state) => state.projectKeywords);
  const setProjectKeywords = useEditProjectStore((state) => state.setProjectKeywords);

  

  //GETTERS com a informação sobre o projeto aberto vão buscar a info através do id que está no url
  useEffect(() => {
    async function fetchData() {
      try {
        const usersPromise = Api.getUsersForProject(token, id);
        const keywordsPromise = Api.getInterestsFromProject(token, id);
        const resourcesPromise = Api.getProductsForProject(token, id);
        const skillsPromise = Api.getSkillsForProject(token, id);
  
        const [usersResponse, keywordsResponse, resourcesResponse, skillsResponse] = await Promise.all([usersPromise, keywordsPromise, resourcesPromise, skillsPromise]);
  
        setProjectUsers(usersResponse.data);
        setProjectKeywords(keywordsResponse.data);
        setProjectResources(resourcesResponse.data);
        setProjectSkills(skillsResponse.data);
      } catch (error) {
        console.log(error.message);
      }
    }
  
    fetchData();
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
    <EditKeywords ref={editKeywordsRef}/>
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
            title="Resources"
          />
        </Col>
        <Col md={6}>
          <ProjectAdditionalInfo data={projectUsers} title="Users" />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <ProjectAdditionalInfo
            data={projectKeywords}
            title="Keywords"
            editButton={openEditKeywordsModal}
          />
        </Col>
        <Col md={6}>
          <ProjectAdditionalInfo data={projectSkills} title="Skills" editButton={openEditSkillsModal}/>
        </Col>
      </Row>
    </>
  );
}

export default ProjectSettings;
