import {
  Container,
  Col,
  Row,
  Card,
  CardHeader,
  CardTitle,
  Button,
  CardFooter,
} from "reactstrap";
import { FaArrowLeft, FaArrowRight, FaCheck } from "react-icons/fa";

import { useEffect, useRef, useState } from "react";

import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router-dom";

import "../assets/css/general-css.css";
//TODO correct the label

import { useUserStore } from "../components/stores/useUserStore";
import UserSettings from "../components/modals/user-settings.jsx";
import FormInputLabel from "../components/input/forminputlabel.jsx";

import { Api } from "../api";
import { tsuccess, terror } from "../components/toasts/message-toasts.jsx";
import useCreateProjectStore from "../components/stores/useCreateProjectStore.js";

import FirstStageCreation from "../components/create-project/first-stage-creation.jsx";
import SecondStageCreation from "../components/create-project/second-stage-creation.jsx";
import SecondStageCreationPartII from "../components/create-project/second-stage-creation-part-II.jsx";
import ThirdStageCreation from "../components/create-project/third-stage-creation.jsx";
import FourthStageCreation from "../components/create-project/fourth-stage-creation.jsx";

function CreateProject() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const token = useUserStore((state) => state.token);
  const projectName = useCreateProjectStore((state) => state.projectName);
  const description = useCreateProjectStore((state) => state.description);
  const lab = useCreateProjectStore((state) => state.lab);
  const startDate = useCreateProjectStore((state) => state.startDate);
  const endDate = useCreateProjectStore((state) => state.endDate);
  const projectUsers = useCreateProjectStore((state) => state.projectUsers);
  const projectResources = useCreateProjectStore(
    (state) => state.projectResources
  );
  const projectKeywords = useCreateProjectStore((state) => state.projectKeywords);
  const projectSkills = useCreateProjectStore((state) => state.projectSkills);

  const cleanStore = useCreateProjectStore((state) => state.cleanStore);

  const [stage, setStage] = useState(1);

  async function createProject () {
    try {
      const response = await Api.createProject(token, {
        name: projectName,
        description: description,
        lab_id: lab,
        startDate: startDate,
        endDate: endDate,
        users: projectUsers,
        resources: projectResources,
        keywords: projectKeywords,
        skills: projectSkills,
      });
      tsuccess(response.data);
      cleanStore();//da reset à store
      navigate('/fica-lab/home'); //redireciona para a home
    } catch (error) {
      terror(error.message);
    }
  }


  return (
    <div className="section4">
      <Container>
        <Row>
          <Col md="1"></Col>
          <Col md="10" className=" mt-5">
            <Card className="shadow-lg p-3 mb-5 bg-white rounded" style={{ minHeight: '500px' }}>
              <CardHeader className="bg-secondary-fl text-white">
                <CardTitle tag="h3" className="text-center card-header-title">
                  Create a new project
                </CardTitle>
              </CardHeader>
              {stage === 1 && <FirstStageCreation />}
              {stage === 2 && <SecondStageCreation />}
              {stage === 3 && <SecondStageCreationPartII />}
              {stage === 4 && <ThirdStageCreation />}
              {stage === 5 && <FourthStageCreation />}
              <CardFooter className="d-flex justify-content-between">
                {stage > 1 ? (
                  <Button onClick={() => setStage(stage - 1)}>
                    <FaArrowLeft /> Previous
                  </Button>
                ) : (
                  <div></div>
                )}
                {stage < 5 ? (
                  <Button onClick={() => stage < 5 && setStage(stage + 1)}>
                    Next <FaArrowRight />
                  </Button>
                ) : (
                  <Button onClick={createProject}>
                    Create <FaCheck />
                  </Button>
                )}
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CreateProject;
