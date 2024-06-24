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

import "../../assets/css/general-css.css";

import { useTranslation } from "react-i18next";

import { useState, useEffect } from "react";

import useCreateProjectStore from "../stores/useCreateProjectStore.js";

import SkillTag from "../tags/skill-project-tag.jsx";
import InterestTag from "../tags/interest-project-tag.jsx";

import { Api } from "../../api.js";
import { useUserStore } from "../stores/useUserStore.js";

function SecondStageCreation() {
  const { t } = useTranslation();
  const token = useUserStore((state) => state.token);

  function cardSkillInterest(title, text, tag) {
    return (
      <Card>
        <CardHeader>
          <CardTitle tag="h4">{title}</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>{text}</CardText>
          {tag}
        </CardBody>
      </Card>
    );
  }

  return (
    <>
      <CardBody>
        <Form>
          <Row>
            <Col md="6" className="mt-3">
              <FormGroup
                style={{
                  textAlign: "center",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "5px",
                  padding: "10px",
                  margin: "10px 0",
                }}
              >
                <Label
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "#333",
                  }}
                >
                  Project Skills
                </Label>
              </FormGroup>

              {cardSkillInterest(
                "Select Skills",
                "Add skills that are relevant to your project. You can add and remove them as you wish.",
                <SkillTag />
              )}
            </Col>

            <Col md="6" className="mt-3">
              <FormGroup
                style={{
                  textAlign: "center",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "5px",
                  padding: "10px",
                  margin: "10px 0",
                }}
              >
                <Label
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "#333",
                  }}
                >
                  Project Keywords
                </Label>
              </FormGroup>

              {cardSkillInterest(
                "Select Keywords",
                "Add keywords that are relevant to your project. You can add and remove them as you wish.",
                <InterestTag />
              )}
            </Col>
          </Row>
        </Form>
      </CardBody>
    </>
  );
}

export default SecondStageCreation;
