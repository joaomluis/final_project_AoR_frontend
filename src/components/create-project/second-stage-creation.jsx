import { Container, Col, Row, Card, CardHeader, CardText, CardBody, CardTitle, Input, CardImg, Label, Form, FormGroup, Button } from "reactstrap";

import "../../assets/css/general-css.css";

import { useState, useEffect } from "react";

import useCreateProjectStore from "../../stores/useCreateProjectStore.js";

import { Api } from "../../api.js";
import { useUserStore } from "../../stores/useUserStore.js";

function SecondStageCreation() {
  const token = useUserStore((state) => state.token);

  const updateProjectResources = useCreateProjectStore((state) => state.setProjectResources);
  const projectResources = useCreateProjectStore((state) => state.projectResources);

  const [resources, setResources] = useState([]);
  const [selectedResources, setSelectedResources] = useState(projectResources);
  const [filter, setFilter] = useState("All");

  const [resourceQuantity, setResourceQuantity] = useState(projectResources);

  function handleQuantityChange(resourceId, value) {
    // Convert the input value to a number
    const numericValue = Number(value);

    // Assuming getResourceName is a function that returns the resource's name given its ID
    const resourceName = getResourceName(resourceId);

    // Update the state with the new object
    setResourceQuantity((prevQuantities) => ({
      ...prevQuantities,
      [resourceId]: {
        id: resourceId,
        name: resourceName,
        quantity: numericValue,
      },
    }));
  }

  function getResourceName(resourceId) {
    return resources.find((resource) => resource.id === resourceId).name;
  }

  const handleResourceChange = (resourceId, quantity) => {
    setSelectedResources((prevResources) =>
      prevResources.map((resource) => (resource.id === resourceId ? { ...resource, quantity: quantity } : resource))
    );
  };

  useEffect(() => {
    console.log(resourceQuantity);
  }, [resourceQuantity]);

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

  //update na array da store sempre que o array de resources selecionados muda
  useEffect(() => {
    updateProjectResources(resourceQuantity);
  }, [resourceQuantity]);

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
                <Button className="button-style1" color="primary" size="sm" onClick={() => setFilter("All")} style={{ flex: 1, margin: "0.5rem" }}>
                  All
                </Button>
                <Button className="button-style1" color="primary" size="sm" onClick={() => setFilter("COMPONENT")} style={{ flex: 1, margin: "0.5rem" }}>
                  Components
                </Button>
                <Button className="button-style1" color="primary" size="sm" onClick={() => setFilter("RESOURCE")} style={{ flex: 1, margin: "0.5rem" }}>
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
                  .filter((resource) => filter === "All" || resource.type === filter)
                  .map((resource, index) => {
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
                        <div style={{ display: "flex", alignItems: "center" }}>{`${resource.name}`}</div>
                        <input
                          type="number"
                          name="resourceQuantity"
                          min="0"
                          value={resourceQuantity[resource.id]?.quantity || 0}
                          onChange={(e) => handleQuantityChange(resource.id, e.target.value)}
                          style={{ width: "60px" }}
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
