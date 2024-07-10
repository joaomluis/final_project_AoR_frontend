import { Col, Row, CardBody, Input, Label, Form, FormGroup, Select } from "reactstrap";

import { useEffect, useState } from "react";

import useCreateProjectStore from "../../stores/useCreateProjectStore.js";
import { useUserStore } from "../../stores/useUserStore.js";

import { Api } from "../../api.js";

import ProjectPreview from "../Preview/project-preview.jsx";

function FourthStageCreation() {
  const projectName = useCreateProjectStore((state) => state.projectName);
  const description = useCreateProjectStore((state) => state.description);
  const lab = useCreateProjectStore((state) => state.lab);
  const startDate = useCreateProjectStore((state) => state.startDate);
  const endDate = useCreateProjectStore((state) => state.endDate);
  const projectUsers = useCreateProjectStore((state) => state.projectUsers);

  const projectResources = useCreateProjectStore((state) => state.projectResources);

  const projectKeywords = useCreateProjectStore((state) => state.projectKeywords);
  const projectSkills = useCreateProjectStore((state) => state.projectSkills);

  const token = useUserStore((state) => state.token);
  // const [labs, setLabs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  console.log(projectResources);
  const products = projectKeywords.filter((p) => p.quantity > 0);
  console.log(products);
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
                <Label for="projectName">Project Name</Label>
                <Input
                  type="text"
                  name="projectName"
                  id="projectName"
                  placeholder="Enter project name"
                  className="form-control-lg"
                  value={projectName}
                  readOnly
                />
              </FormGroup>
              <FormGroup>
                <Label for="description">Project Description</Label>
                <Input type="textarea" name="description" id="description" className="form-control-lg" value={description} readOnly />
              </FormGroup>
              <FormGroup>
                <Label for="labLocation">Lab Location</Label>
                <Input type="text" name="labLocation" id="labLocation" className="form-control-lg" value={lab.location} readOnly />
              </FormGroup>
              <ProjectPreview
                data={Object.entries(projectResources)
                  .filter(([key, value]) => value.quantity > 0)
                  .map(([key, value]) => value)}
                name="Resources Preview"
              />{" "}
              <ProjectPreview data={projectKeywords} name="Keywords Preview" />
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="startDate">Start Date</Label>
                <Input type="date" name="startDate" id="startDate" className="form-control-lg" value={startDate} readOnly />
              </FormGroup>
              <FormGroup>
                <Label for="endDate">End Date</Label>
                <Input type="date" name="endDate" id="endDate" className="form-control-lg" value={endDate} readOnly />
              </FormGroup>

              <ProjectPreview data={projectUsers} name="Users Preview" />
              <ProjectPreview data={projectSkills} name="Skills Preview" />
            </Col>
          </Row>
        </Form>
      </CardBody>
    </>
  );
}

export default FourthStageCreation;
