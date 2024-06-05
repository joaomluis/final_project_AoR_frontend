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
} from "reactstrap";
import { FaUserCog } from "react-icons/fa";
import { FaRegSave } from "react-icons/fa";

import { useEffect, useRef, useState } from "react";

import { useTranslation } from "react-i18next";

import "../assets/css/general-css.css";
//TODO correct the label

import { useUserStore } from "../components/stores/useUserStore";
import UserSettings from "../components/modals/user-settings.jsx";
import FormInputLabel from "../components/input/forminputlabel.jsx";

import { Api } from "../api";
import { tsuccess, terror } from "../components/toasts/message-toasts.jsx";

function CreateProject() {
  const { t } = useTranslation();

  return (
    <div className="section4">
      <Container>
        <Row>
          <Col md="10" className=" mt-5">
            <Card>
              <CardHeader>
                <CardTitle tag="h3" className="text-center">
                  New Project
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="projectName">Project Name</Label>
                    <Input
                      type="text"
                      name="projectName"
                      id="projectName"
                      placeholder="Enter project name"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="description">Project Description</Label>
                    <Input
                      type="textarea"
                      name="description"
                      id="description"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="startDate">Start Date</Label>
                    <Input type="date" name="startDate" id="startDate" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="endDate">End Date</Label>
                    <Input type="date" name="endDate" id="endDate" />
                  </FormGroup>
                  <Button type="submit">Create Project</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CreateProject;
