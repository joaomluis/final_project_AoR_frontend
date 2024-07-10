import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "reactstrap";

import ProjectBasicInfo from "./project-basic-info.jsx";
import ProjectAdditionalInfo from "./project-additional-info.jsx";
import EditKeywords from "./edit-keywords-modal.jsx";
import EditSkills from "./edit-skills-modal.jsx";
import EditResources from "./edit-resources-modal.jsx";

import { useUserStore } from "../../stores/useUserStore.js";
import { Api } from "../../api.js";
import { useParams } from "react-router-dom";

import useEditProjectStore from "../../stores/useEditProjectStore.js";

import { useTranslation } from "react-i18next";

function ProjectSettings({ data }) {

  const { t } = useTranslation();

  const token = useUserStore((state) => state.token);
  const { id } = useParams();

  const [projectUsers, setProjectUsers] = useState([]);

  // const [projectSkills, setProjectSkills] = useState([]);
  const projectSkills = useEditProjectStore((state) => state.projectSkills);
  const setProjectSkills = useEditProjectStore((state) => state.setProjectSkills);
  const projectKeywords = useEditProjectStore((state) => state.projectKeywords);
  const setProjectKeywords = useEditProjectStore((state) => state.setProjectKeywords);

  const projectResources = useEditProjectStore((state) => state.projectResources);
  const setProjectResources = useEditProjectStore((state) => state.setProjectResources);

  //GETTERS com a informação sobre o projeto aberto vão buscar a info através do id que está no url
  useEffect(() => {
    async function fetchData() {
      try {
        const usersPromise = Api.getUsersForProject(token, id);
        const keywordsPromise = Api.getInterestsFromProject(token, id);
        const resourcesPromise = Api.getProductsForProject(token, id);
        const skillsPromise = Api.getSkillsForProject(token, id);

        const [usersResponse, keywordsResponse, resourcesResponse, skillsResponse] = await Promise.all([
          usersPromise,
          keywordsPromise,
          resourcesPromise,
          skillsPromise,
        ]);

        setProjectUsers(usersResponse.data);
        setProjectKeywords(keywordsResponse.data);
        setProjectResources(resourcesResponse.data);
        setProjectSkills(skillsResponse.data);
        console.log(skillsResponse.data);
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

  const editResourcesRef = useRef();
  const openEditResourcesModal = () => {
    editResourcesRef.current.open();
  };

  return (
    <>
      <EditKeywords ref={editKeywordsRef} />
      <EditSkills ref={editSkillsRef} />
      <EditResources ref={editResourcesRef} />
      <Row>
        <Col md={12}>
          <ProjectBasicInfo data={data} />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <ProjectAdditionalInfo data={projectResources} title={t("resources")} editButton={openEditResourcesModal} />
        </Col>
        <Col md={6}>
          <ProjectAdditionalInfo data={projectKeywords} title={t("keywords")} editButton={openEditKeywordsModal} />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <ProjectAdditionalInfo data={projectUsers} title={t("users")} />
        </Col>
        <Col md={6}>
          <ProjectAdditionalInfo data={projectSkills} title={t("skills")} editButton={openEditSkillsModal} />
        </Col>
      </Row>
    </>
  );
}

export default ProjectSettings;
