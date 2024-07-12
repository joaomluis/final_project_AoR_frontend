import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "reactstrap";
import { Button } from "reactstrap";
import ProjectBasicInfo from "./project-basic-info.jsx";
import ProjectAdditionalInfo from "./project-additional-info.jsx";
import EditKeywords from "./edit-keywords-modal.jsx";
import EditSkills from "./edit-skills-modal.jsx";
import EditResources from "./edit-resources-modal.jsx";
import Select from "react-select";

import { useUserStore } from "../../stores/useUserStore.js";
import { Api } from "../../api.js";
import { useParams } from "react-router-dom";
import UserType from "../enums/UserType.js";
import useEditProjectStore from "../../stores/useEditProjectStore.js";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { tsuccess, terror } from "../toasts/message-toasts.jsx";
import CancelProjectModal from "../modals/modal-project-cancelled.jsx";
import ConfirmModal from "../modals/modal-confirm.jsx";
import ProjectStatus from "../enums/ProjectStatus.js";
function ProjectSettings({ data, userType }) {
  const { t } = useTranslation();
  console.log(userType);
  const token = useUserStore((state) => state.token);
  const { id } = useParams();
  const ids = parseInt(id, 10);
  const navigate = useNavigate();

  const [projectUsers, setProjectUsers] = useState([]);

  // const [projectSkills, setProjectSkills] = useState([]);
  const projectSkills = useEditProjectStore((state) => state.projectSkills);
  const setProjectSkills = useEditProjectStore((state) => state.setProjectSkills);
  const projectKeywords = useEditProjectStore((state) => state.projectKeywords);
  const setProjectKeywords = useEditProjectStore((state) => state.setProjectKeywords);
  const setLabs = useEditProjectStore((state) => state.setLabs);
  const projectResources = useEditProjectStore((state) => state.projectResources);
  const setProjectResources = useEditProjectStore((state) => state.setProjectResources);
  const [modalSendInvite, setModalSendInvite] = useState(false);
  const [modalLeaveProject, setModalLeaveProject] = useState(false);
  const [modalCancelProject, setModalCancelProject] = useState(false);
  const [modalReady, setModalReady] = useState(false);
  const [modalFinished, setModalFinished] = useState(false);
  const isProjectInactive = data.status === "CANCELLED" || data.status === "FINISHED" || data.status === "READY";
  const isProjectCancelledOrFinished = data.status === "CANCELLED" || data.status === "FINISHED";
  const userLogger = useUserStore((state) => state.userType);
  const isAdmin = userLogger === UserType.ADMIN;
  const toggleModalSendInvite = () => setModalSendInvite(!modalSendInvite);
  const toggleModalFinished = () => setModalFinished(!modalFinished);
  const toggleModalLeaveProject = () => setModalLeaveProject(!modalLeaveProject);
  const toggleModalCancelProject = () => setModalCancelProject(!modalCancelProject);
  const toggleModalSetReady = () => {
    setModalReady(!modalReady);
    console.log(modalReady);
  };
  const isSelectable =
    userType === UserType.MANAGER &&
    (ProjectStatus.fromLabel(data.status) === ProjectStatus.APPROVED || ProjectStatus.fromLabel(data.status) === ProjectStatus.IN_PROGRESS);

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
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchData();
  }, []);

  const handleAcceptResume = async (id, accept) => {
    const props = {
      userId: id,
      accept: accept,
    };
    try {
      const response = await Api.acceptProject(token, id, props);
      if (accept) tsuccess(t("project-accepted"));
      else tsuccess(t("project-rejected"));
      navigate("/fica-lab/admin-page");
    } catch (error) {
      terror(error.message);
    }
  };

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

  async function handleSendInvite() {
    try {
      const response = await Api.sendProposed(token, ids);
      console.log(response);
      tsuccess(t("invite-sent"));
      toggleModalSendInvite();
    } catch (error) {
      terror(error);
    }
  }

  async function handleLeaveProject() {
    try {
      const response = await Api.leaveProject(token, ids);
      console.log(response);
      tsuccess("you-left-project");
      navigate("/fica-lab/home");
      toggleModalLeaveProject();
    } catch (error) {
      terror(error.message);
    }
  }

  async function handleCancelProject(justification) {
    console.log(justification);

    console.log(ids);
    const props = {
      id: ids,
      name: justification,
    };

    try {
      const response = await Api.cancelProject(token, ids, props);
      tsuccess("project-cancelled");
      navigate("/fica-lab/home");
      toggleModalCancelProject();
    } catch (error) {
      terror(error.message);
    }
  }
  const options = [
    { value: ProjectStatus.IN_PROGRESS, label: t("in_progress") },
    { value: ProjectStatus.FINISHED, label: t("finished") },
  ];

  const handleChange = async (id, newStatus) => {
    if (newStatus === ProjectStatus.FINISHED) {
      toggleModalFinished();
    } else {
      handleChangeStatus(id, newStatus);
    }
  };

  const handleChangeStatus = async (id, newStatus) => {
    if (data.status === ProjectStatus.fromValue(newStatus)) return;
    const prop = {
      id: ids,
      value: newStatus,
    };
    try {
      const response = await Api.updateStatus(token, ids, prop);

      tsuccess("status-updated");
    } catch (error) {
      terror(error.message);
    }
  };

  const handleSetReady = async () => {
    const prop = {
      id: ids,
      value: ProjectStatus.READY,
    };

    try {
      const response = await Api.updateStatus(token, ids, prop);
      tsuccess("project-ready");
      toggleModalSetReady();
      navigate("/fica-lab/home");
    } catch (error) {
      terror(error.message);
    }
  };

  const handlesetFinished = async () => {
    const prop = {
      id: ids,
      value: ProjectStatus.FINISHED,
    };
    console.log(prop);
    try {
      const response = await Api.updateStatus(token, ids, prop);
      tsuccess("project-finished");
      toggleModalFinished();
      navigate("/fica-lab/home");
    } catch (error) {
      terror(error.message);
    }
  };

  const renderButtons = () => {
    // Check if the project is inactive and the user is an admin
    if (isProjectCancelledOrFinished && isAdmin) {
      return <></>;
    }
    // Check if the project is inactive and the user is an admin
    if (isProjectInactive && isAdmin) {
      return (
        <>
          <Button color="primary" onClick={() => handleAcceptResume(ids, true)}>
            {t("approve")}
          </Button>
          <Button color="danger" onClick={() => handleAcceptResume(ids, false)}>
            {t("reject")}
          </Button>
        </>
      );
    }

    // Check if the user is a manager or a normal user
    if (userType === UserType.MANAGER || userType === UserType.NORMAL) {
      console.log("entrou");
      if (!isProjectInactive) {
        console.log("entrou2");
        return (
          <div className="button-group mt-3">
            <Button color="secondary" onClick={toggleModalLeaveProject}>
              {t("leave")}
            </Button>
            {userType === UserType.MANAGER && (
              <>
                <Button color="danger" onClick={toggleModalCancelProject}>
                  {t("cancel-project")}
                </Button>
                {ProjectStatus.fromLabel(data.status) === ProjectStatus.PLANNING && (
                  <Button className="ready-button" onClick={toggleModalSetReady}>
                    {t("set-ready")}
                  </Button>
                )}
                {isSelectable && (
                  <Select
                    className="status-select d-flex"
                    options={options}
                    onChange={(e) => handleChange(ids, e.value)}
                    defaultValue={{
                      value: ProjectStatus.fromLabel(data.status),
                      label: t(data.status.toLowerCase()),
                    }}
                  />
                )}
              </>
            )}
          </div>
        );
      }
    }
    // Check if the user is a guest and the project is not inactive
    if (userType === UserType.GUEST && !isProjectInactive) {
      return <Button onClick={toggleModalSendInvite}>{t("send-inv")}</Button>;
    }

    // Default: show send-invite button for users who are not a manager or a normal user
    return (
      <>
        {ProjectStatus.CANCELLED || ProjectStatus.FINISHED || ProjectStatus.READY ? (
          <></>
        ) : (
          <Button onClick={toggleModalSendInvite}>{t("send-inv")}</Button>
        )}
      </>
    );
  };

  return (
    <>
      <EditKeywords ref={editKeywordsRef} />
      <EditSkills ref={editSkillsRef} />
      <EditResources ref={editResourcesRef} />
      <Row>
        <Col md={12}>
          {renderButtons()}
          <ProjectBasicInfo data={data} />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <ProjectAdditionalInfo
            data={projectResources}
            title={t("resources")}
            editButton={openEditResourcesModal}
            userType={userType}
            status={isProjectInactive}
          />
        </Col>
        <Col md={6}>
          <ProjectAdditionalInfo
            data={projectKeywords}
            title={t("keywords")}
            editButton={openEditKeywordsModal}
            userType={userType}
            status={isProjectInactive}
          />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <ProjectAdditionalInfo data={projectUsers} title={t("users")} userType={userType} status={isProjectInactive} />
        </Col>
        <Col md={6}>
          <ProjectAdditionalInfo
            data={projectSkills}
            userType={userType}
            title={t("skills")}
            editButton={openEditSkillsModal}
            status={isProjectInactive}
          />
        </Col>
      </Row>
      <ConfirmModal isOpen={modalSendInvite} toggle={toggleModalSendInvite} title={t("send-inv")} onConfirm={handleSendInvite} />
      <ConfirmModal isOpen={modalLeaveProject} toggle={toggleModalLeaveProject} title={t("leave")} onConfirm={handleLeaveProject} />
      <ConfirmModal isOpen={modalReady} toggle={toggleModalSetReady} title={t("submit-project")} onConfirm={handleSetReady} />
      <ConfirmModal isOpen={modalFinished} toggle={toggleModalFinished} title={t("finish-project")} onConfirm={handlesetFinished} />
      <CancelProjectModal isOpen={modalCancelProject} toggle={toggleModalCancelProject} title={t("cancel-project")} onConfirm={handleCancelProject} />
    </>
  );
}

export default ProjectSettings;
