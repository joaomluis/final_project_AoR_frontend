import { Col, Row, CardBody, Input, Label, Form, FormGroup } from "reactstrap";

import { useEffect, useState } from "react";

import useCreateProjectStore from "../stores/useCreateProjectStore.js";
import { useUserStore } from "../stores/useUserStore.js";

import { Api } from "../../api";

function FirstStageCreation() {
  const projectName = useCreateProjectStore((state) => state.projectName);
  const description = useCreateProjectStore((state) => state.description);
  const lab = useCreateProjectStore((state) => state.lab);
  const startDate = useCreateProjectStore((state) => state.startDate);
  const endDate = useCreateProjectStore((state) => state.endDate);

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

  const logCurrentState = () => {
    console.log(useCreateProjectStore.getState());
  };

  const handleProjectNameChange = (event) => {
    useCreateProjectStore.getState().setProjectName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    useCreateProjectStore.getState().setDescription(event.target.value);
  };

  const handleLabChange = (event) => {
    useCreateProjectStore.getState().setLab(event.target.value);
  };

  const handleStartDateChange = (event) => {
    useCreateProjectStore.getState().setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    useCreateProjectStore.getState().setEndDate(event.target.value);
    logCurrentState();
  };

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
                  onChange={handleProjectNameChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="description">Project Description</Label>
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  className="form-control-lg"
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </FormGroup>
              <FormGroup floating>
                <Input
                  bsSize="md"
                  type="select"
                  className="form-select-lg"
                  value={lab || "default"}
                  onChange={handleLabChange}
                >
                  <option disabled value="default">
                    Select a Lab*
                  </option>
                  {labs.map((lab) => (
                    <option key={lab.id} value={lab.id}>
                      {lab.location}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="startDate">Start Date</Label>
                <Input
                  type="date"
                  name="startDate"
                  id="startDate"
                  className="form-control-lg"
                  value={startDate}
                  onChange={handleStartDateChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="endDate">End Date</Label>
                <Input
                  type="date"
                  name="endDate"
                  id="endDate"
                  className="form-control-lg"
                  value={endDate}
                  onChange={handleEndDateChange}
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </>
  );
}

export default FirstStageCreation;
