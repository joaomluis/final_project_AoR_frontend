import { Col, Row, CardBody, Input, Label, Form, FormGroup, Select } from "reactstrap";

import { useEffect, useState } from "react";

import useCreateProjectStore from "../../stores/useCreateProjectStore.js";
import { useUserStore } from "../../stores/useUserStore.js";


import ProjectPreview from "../Preview/project-preview.jsx";

import { useTranslation } from "react-i18next";

function FourthStageCreation() {

  const { t } = useTranslation();

  const projectName = useCreateProjectStore((state) => state.projectName);
  const description = useCreateProjectStore((state) => state.description);
  const lab = useCreateProjectStore((state) => state.lab);
  const startDate = useCreateProjectStore((state) => state.startDate);
  const endDate = useCreateProjectStore((state) => state.endDate);
  const projectUsers = useCreateProjectStore((state) => state.projectUsers);

  const projectResources = useCreateProjectStore((state) => state.projectResources);
  const setProjectResources = useCreateProjectStore((state) => state.setProjectResources);

  

  const projectKeywords = useCreateProjectStore((state) => state.projectKeywords);
  const projectSkills = useCreateProjectStore((state) => state.projectSkills);

  useEffect(() => {
    const filteredResources = projectResources.filter(resource => resource.quantity > 0);
  
    // Check if the filtered list is different from the current list
    if (JSON.stringify(projectResources) !== JSON.stringify(filteredResources)) {
      setProjectResources(filteredResources);
    }
  }, [projectResources, setProjectResources]);


  const token = useUserStore((state) => state.token);
  // const [labs, setLabs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // async function handleLoadLabLocations() {
  //   try {
  //     if (!isLoaded) {
  //       const response = await Api.getAllLocations(token);
  //       setLabs(response.data);
  //       setIsLoaded(true);
  //     }
  //   } catch (error) {
  //     console.log(error.messsage);
  //   }
  // }

  // useEffect(() => {
  //   handleLoadLabLocations();
  // }, []);

  // const [labName, setLabName] = useState("");

  // useEffect(() => {
  //   const labObject = labs.find((labObj) => labObj.id === lab);

  //   console.log(labObject);

  //   const newLabName = labObject ? labObject.location : "";

  //   setLabName(newLabName);
  // }, [lab, labs]);

  return (
    <>
      <CardBody>
        <Form>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="projectName">{t("project-name")}</Label>
                <Input
                  type="text"
                  name="projectName"
                  id="projectName"
                  className="form-control-lg"
                  value={projectName}
                  readOnly
                />
              </FormGroup>
              <FormGroup>
                <Label for="description">{t("project-description")}</Label>
                <Input type="textarea" name="description" id="description" className="form-control-lg" value={description} readOnly />
              </FormGroup>
              <FormGroup>
                <Label for="labLocation">{t("project-lab-location")}</Label>
                <Input type="text" name="labLocation" id="labLocation" className="form-control-lg" value={lab.location} readOnly />
              </FormGroup>
              <ProjectPreview
                data={Object.entries(projectResources)
                  .filter(([key, value]) => value.quantity > 0)
                  .map(([key, value]) => value)}
                name={t("resources-preview")}
              />{" "}
              <ProjectPreview data={projectKeywords} name={t("keywords-preview")} />
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="startDate">{t("project-start-date")}</Label>
                <Input type="date" name="startDate" id="startDate" className="form-control-lg" value={startDate} readOnly />
              </FormGroup>
              <FormGroup>
                <Label for="endDate">{t("project-end-date")}</Label>
                <Input type="date" name="endDate" id="endDate" className="form-control-lg" value={endDate} readOnly />
              </FormGroup>

              <ProjectPreview data={projectUsers} name={t("users-preview")} />
              <ProjectPreview data={projectSkills} name={t("skills-preview")} />
            </Col>
          </Row>
        </Form>
      </CardBody>
    </>
  );
}

export default FourthStageCreation;
