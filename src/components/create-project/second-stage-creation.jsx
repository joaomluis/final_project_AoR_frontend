import React, { useState, useEffect } from "react";
import { Button, CardBody, Col, Form, Row } from "reactstrap";
import useCreateProjectStore from "../../stores/useCreateProjectStore.js";
import { useUserStore } from "../../stores/useUserStore.js";
import { Api } from "../../api.js";

function SecondStageCreation() {
  const token = useUserStore((state) => state.token);
  const { setProjectResources } = useCreateProjectStore();
  const projectResources = useCreateProjectStore(
    (state) => state.projectResources
  );
  const [resources, setResources] = useState([]);
  const [resourceQuantities, setResourceQuantities] =
    useState(projectResources);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchResources = async () => {
      try {
        console.log("Fetching resources...");
        const response = await Api.getProducts(token, {
          dtoType: "ProductDto",
          page_size: 200,
        });
        setResources(response.data.results);
        console.log(response.data.results);
        // Initialize quantities for fetched resources as an array of objects

        const initialQuantities = response.data.results.map((resource) => ({
          id: resource.id,
          name: resource.name,
          quantity: 0,
        }));

        setResourceQuantities(
          projectResources ? projectResources : initialQuantities
        );

        if (!projectResources || projectResources.length === 0) {
          setProjectResources(initialQuantities);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchResources();
  }, [token]);

  useEffect(() => {
    // Update project resources in the store whenever resourceQuantities changes
    setProjectResources(resourceQuantities);
    
  }, [resourceQuantities, setProjectResources]);

  const handleQuantityChange = (resourceId, resourceN, value) => {

    setResourceQuantities((prevQuantities) => {
      // Encontrar o índice do recurso a ser atualizado
      const index = prevQuantities.findIndex(
        (resource) => resource.id === resourceId
      );
      if (index === -1) return prevQuantities; // Se não encontrar, retorna o array original

      // Criar uma cópia do array e atualizar a quantidade do recurso específico
      const updatedQuantities = [...prevQuantities];
      updatedQuantities[index] = {
        ...updatedQuantities[index],
        quantity: Number(value),
      };

      return updatedQuantities;
    });
  };

  useEffect(() => {
    const filteredResourceQuantities = resourceQuantities.filter(resource => resource.quantity > 0);
    setProjectResources(filteredResourceQuantities);
  }, [resourceQuantities, setProjectResources]);

  const filteredResources = resources.filter(
    (resource) => filter === "All" || resource.type === filter
  );

  return (
    <>
      <CardBody>
        <Form>
          <Row>
            <Col md={6} className="offset-md-3">
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
              <div style={{ maxHeight: "240px", overflowY: "auto" }}>
                {filteredResources.map((resource) => {
                  // Encontrar o objeto de quantidade correspondente no array resourceQuantities
                  const quantityObj = resourceQuantities.find(
                    (q) => q.id === resource.id
                  ) || { quantidade: 0 };
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
                      <span>{resource.name}</span>
                      <input
                        type="number"
                        min="0"
                        value={quantityObj.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            resource.id,
                            resource.name,
                            e.target.value
                          )
                        }
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
