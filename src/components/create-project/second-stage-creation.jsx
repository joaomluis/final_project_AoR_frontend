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

import { useState, useEffect } from "react";

import useCreateProjectStore from "../stores/useCreateProjectStore.js";

import { Api } from "../../api.js";
import { useUserStore } from "../stores/useUserStore.js";

function SecondStageCreation() {
  const token = useUserStore((state) => state.token);

  const [resources, setResources] = useState([]);
  const [selectedResources, setSelectedResources] = useState([]);
  const [filter, setFilter] = useState("All");

  const updateProjectResources = useCreateProjectStore(
    (state) => state.setProjectResources
  );
  const projectResources = useCreateProjectStore(
    (state) => state.projectResources
  );

  const props = {
    dtoType: "ProductDto",
    page_size: 200,
  };

  useEffect(() => {
    console.log(projectResources);
  }, [selectedResources]);

  useEffect(() => {
    async function fetchResources() {
      try {
        const response = await Api.getProducts(token, props);
        setResources(response.data.results);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchResources();
  }, []);

  function handleCheckboxChange(resource) {
    setSelectedResources((prevSelectedResources) => {
      const resourceExists = prevSelectedResources.some(prevResource => prevResource.id === resource.id);

      if (resourceExists) {
        // If the resource is already selected, remove it from the array
        return prevSelectedResources.filter(prevResource => prevResource.id !== resource.id);
      } else {
        // If the resource is not selected, add it to the array
        return [...prevSelectedResources, resource];
      }
    });

    // Update the store with the new selected resources
    updateProjectResources(selectedResources);
}

  return (
    <>
      <CardBody>
        <Form>
          <Row>
            <Col md={3}></Col>
            <Col md={6}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                }}
              >
                <Button
                  className="button-style1"
                  color="primary"
                  size="sm"
                  onClick={() => setFilter("All")}
                  style={{ flex: 1, margin: "0.5rem" }}
                >
                  All
                </Button>
                <Button
                  className="button-style1"
                  color="primary"
                  size="sm"
                  onClick={() => setFilter("COMPONENT")}
                  style={{ flex: 1, margin: "0.5rem" }}
                >
                  Components
                </Button>
                <Button
                  className="button-style1"
                  color="primary"
                  size="sm"
                  onClick={() => setFilter("RESOURCE")}
                  style={{ flex: 1, margin: "0.5rem" }}
                >
                  Resources
                </Button>
              </div>
              <div
                style={{
                  maxHeight: "240px",
                  overflowY: "auto",
                }}
              >
                {resources
                  .filter(
                    (resource) => filter === "All" || resource.type === filter
                  )
                  .map((resource, index) => (
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
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {`${resource.name}`}
                      </div>
                      <input
                        type="checkbox"
                        name="memberSelect"
                        value={resource}
                        checked={selectedResources.includes(resource)}
                        onChange={() => handleCheckboxChange(resource)}
                      />
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

export default SecondStageCreation;
