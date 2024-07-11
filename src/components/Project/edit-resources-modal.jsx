import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Input } from "reactstrap";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUserStore } from "../../stores/useUserStore.js";
import { Api } from "../../api.js";
import "../../assets/css/general-css.css";
import { useTranslation } from "react-i18next";
import { tsuccess, terror } from "../toasts/message-toasts.jsx";
import useEditProjectStore from "../../stores/useEditProjectStore.js";
import ModalBase from "../modals/modal-base.jsx";

const EditResources = forwardRef((props, ref) => {
  const { t } = useTranslation();
  const token = useUserStore((state) => state.token);
  const { id } = useParams();
  const [modal, setModal] = useState(false);
  const [resources, setResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const projectResources = useEditProjectStore((state) => state.projectResources);
  const setProjectResources = useEditProjectStore((state) => state.setProjectResources);
  const [newResources, setNewResources] = useState([]);

  const filteredResources = resources.filter((resource) => resource.name.toLowerCase().includes(searchTerm.toLowerCase()));

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await Api.getProducts(token, {
          dtoType: "ProductDto",
          page_size: 200,
        });
        setResources(response.data.results);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchResources();
  }, [token]);

  useEffect(() => {
    setNewResources(projectResources);
  }, [projectResources]);

  async function editProjectProducts(token, projectId, data) {
    console.log(data);
    let productList = {
      products: data,
    };

    try {
      const response = await Api.editProjectProducts(token, projectId, productList);
      tsuccess(response.data);
      toggle();
    } catch (error) {
      terror(error.message);
    }
  }

  const toggle = () => {
    setModal(!modal);
    if (modal) {
      setNewResources(projectResources); // Reset to projectResources when closing
    }
  };

  const handleShow = () => {
    setModal(true);
  };

  useImperativeHandle(ref, () => ({
    open: handleShow,
  }));

  const handleQuantityChange = (resourceId, newQuantity) => {
    const resourceName = resources.find((resource) => resource.id === resourceId)?.name || "Unknown";
    const parsedQuantity = parseInt(newQuantity, 10);

    // Update newResources
    const updatedNewResources = newResources.map((resource) => (resource.id === resourceId ? { ...resource, quantity: parsedQuantity } : resource));

    // If resource is not in newResources, add it
    if (!updatedNewResources.find((resource) => resource.id === resourceId)) {
      updatedNewResources.push({ id: resourceId, name: resourceName, quantity: parsedQuantity });
    }

    setNewResources(updatedNewResources);

    // Update projectResources
    const updatedProjectResources = projectResources.map((resource) =>
      resource.id === resourceId ? { ...resource, quantity: parsedQuantity } : resource
    );

    // If resource is not in projectResources, add it
    if (!updatedProjectResources.find((resource) => resource.id === resourceId)) {
      updatedProjectResources.push({ id: resourceId, name: resourceName, quantity: parsedQuantity });
    }

    setProjectResources(updatedProjectResources);
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} centered={true} size="lg">
        <ModalHeader toggle={toggle} style={{ color: "var(--whitey)", fontWeight: "bold" }} className="modal-style">
          {t("add-more-resources")}
          <Input className="mt-2" type="text" placeholder={t("search-resources")} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </ModalHeader>
        <ModalBody className="modal-style">
          <div style={{ minHeight: "35vh" }}>
            <Row>
              <Col md={12}>
                <div style={{ maxHeight: "240px", overflowY: "auto" }}>
                  {filteredResources.map((resource) => {
                    const quantity = projectResources.find((r) => r.id === resource.id)?.quantity || 0;
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
                          value={quantity}
                          onChange={(e) => handleQuantityChange(resource.id, e.target.value)}
                          style={{ width: "60px" }}
                        />
                      </div>
                    );
                  })}
                </div>
              </Col>
            </Row>
          </div>
        </ModalBody>
        <ModalFooter className="modal-style">
          <Button color="primary" onClick={() => editProjectProducts(token, id, newResources)}>
            {t("edit-button")}
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
});

export default EditResources;
