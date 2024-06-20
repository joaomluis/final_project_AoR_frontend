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

  const updateProjectResources = useCreateProjectStore(
    (state) => state.setProjectResources
  );
  const projectResources = useCreateProjectStore(
    (state) => state.projectResources
  );

  const [resources, setResources] = useState([]);
  const [selectedResources, setSelectedResources] = useState(projectResources);
  const [filter, setFilter] = useState("All");

  const props = {
    dtoType: "ProductDto",
    page_size: 200,
  };

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
      const resourceExists = prevSelectedResources.some(
        (prevResource) => prevResource.id === resource.id
      );

      if (resourceExists) {
        return prevSelectedResources.filter(
          (prevResource) => prevResource.id !== resource.id
        );
      } else {
        return [...prevSelectedResources, resource];
      }
    });
  }

  //update na array da store sempre que o array de resources selecionados muda
  useEffect(() => {
    updateProjectResources(selectedResources);
  }, [selectedResources]);

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
                  .map((resource, index) => {

                    const isSelected = projectResources.some((projectResources) => projectResources.id === resource.id);
                    return (
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
                          checked={isSelected}
                          onChange={() => handleCheckboxChange(resource)}
                        />
                      </div>
                    );
                  })}
              </div>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </>
  );
}

export default SecondStageCreation;
