import {
  Container,
  Col,
  Row,
  Card,
  CardHeader,
  CardText,
  CardBody,
  CardTitle,
  Input,
  CardImg,
  Label,
  Form,
  FormGroup,
  Button,
  CardFooter,
} from "reactstrap";
import { FaArrowLeft, FaArrowRight, FaCheck } from "react-icons/fa";

import { useEffect, useRef, useState } from "react";

import { useTranslation } from "react-i18next";

import "../assets/css/general-css.css";
//TODO correct the label

import { useUserStore } from "../components/stores/useUserStore";
import UserSettings from "../components/modals/user-settings.jsx";
import FormInputLabel from "../components/input/forminputlabel.jsx";

import { Api } from "../api";
import { tsuccess, terror } from "../components/toasts/message-toasts.jsx";

import FirstStageCreation from "../components/create-project/first-stage-creation.jsx";
import SecondStageCreation from "../components/create-project/second-stage-creation.jsx";

function CreateProject() {
  const { t } = useTranslation();

  const [stage, setStage] = useState(1);

  return (
    <div className="section4">
      <Container>
        <Row>
          <Col md="1"></Col>
          <Col md="10" className=" mt-5">
            <Card className="shadow-lg p-3 mb-5 bg-white rounded">
              <CardHeader className="bg-secondary-fl text-white">
                <CardTitle tag="h3" className="text-center card-header-title">
                  Create a new project
                </CardTitle>
              </CardHeader>
              {stage === 1 && <FirstStageCreation />}
              {stage === 2 && <SecondStageCreation />}
              <CardFooter className="d-flex justify-content-between">
                {stage > 1 ? (
                  <Button onClick={() => setStage(stage - 1)}>
                    <FaArrowLeft /> Previous
                  </Button>
                ) : (
                  <div></div>
                )}
                {stage < 4 ? (
                  <Button onClick={() => stage < 4 && setStage(stage + 1)}>
                    Next <FaArrowRight />
                  </Button>
                ) : (
                  <Button>
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
