import { Col, Row, CardBody, Input, Label, Form, FormGroup, Select } from "reactstrap";

import { useEffect, useState } from "react";

import useCreateProjectStore from "../stores/useCreateProjectStore.js";
import { useUserStore } from "../stores/useUserStore.js";

import { Api } from "../../api.js";

function FirstStageCreation() {
  const projectName = useCreateProjectStore((state) => state.projectName);
  const description = useCreateProjectStore((state) => state.description);
  const lab = useCreateProjectStore((state) => state.lab);
  const startDate = useCreateProjectStore((state) => state.startDate);
  const endDate = useCreateProjectStore((state) => state.endDate);
  const projectUsers = useCreateProjectStore((state) => state.projectUsers);
  const projectResources = useCreateProjectStore((state) => state.projectResources);
  const token = useUserStore((state) => state.token);
  const [labs, setLabs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  async function handleLoadLabLocations() {
    try {
      if (!isLoaded) {
        const response = await Api.getAllLocations(token);
        setLabs(response.data);
        setIsLoaded(true);
      }
    } catch (error) {
      console.log(error.messsage);
    }
  }

  useEffect(() => {
    handleLoadLabLocations();
  }, []);

  const [labName, setLabName] = useState("");

  useEffect(() => {
    const labObject = labs.find((labObj) => labObj.id === lab);

    console.log(labObject);

    const newLabName = labObject ? labObject.location : "";

    setLabName(newLabName);
  }, [lab, labs]);

  async function createProject() {
    try {
      const response = await Api.createProject(token, {
        name: projectName,
        description: description,
        lab: lab,
        startDate: startDate,
        endDate: endDate,
        users: projectUsers,
        resources: projectResources,
      });
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  }

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
                <Input type="text" name="labLocation" id="labLocation" className="form-control-lg" value={lab} readOnly />
              </FormGroup>
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
                  Resources Preview
                </Label>
              </FormGroup>
              <div
                style={{
                  maxHeight: "175px",
                  overflowY: "auto",
                  border: "1px solid #ccc",
                  padding: "10px",
                  margin: "10px 0",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "5px",
                }}
              >
                {projectResources.map((resource) => (
                  <div
                    key={resource.id}
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      padding: "10px",
                      marginBottom: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>{`${resource.name}`}</div>
                  </div>
                ))}
              </div>
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
                  Group Preview
                </Label>
              </FormGroup>

              <div
                style={{
                  maxHeight: "175px",
                  overflowY: "auto",
                  border: "1px solid #ccc",
                  padding: "10px",
                  margin: "10px 0",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "5px",
                }}
              >
                {projectUsers.map((member) => (
                  <div
                    key={member.userId}
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      padding: "10px",
                      marginBottom: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={member.imagePath}
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          marginRight: "10px",
                        }}
                      />
                      {`${member.firstName} ${member.lastName}`}
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </>
  );
}

export default FirstStageCreation;
