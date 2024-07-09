import React, { useState, forwardRef, useImperativeHandle } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Input,
  Card,
  CardHeader,
  CardText,
  CardBody,
  CardTitle,
  Label,
  FormGroup,
} from "reactstrap";
import { useEffect } from "react";
import { useUserStore } from "../../stores/useUserStore.js";
import { Api } from "../../api.js";
import "../../assets/css/general-css.css";
import { useTranslation } from "react-i18next";
import { tsuccess, terror } from "../toasts/message-toasts.jsx";
import useEditProjectStore from "../../stores/useEditProjectStore.js";

const EditResources = forwardRef((props, ref) => {
  const token = useUserStore((state) => state.token);
  const [modal, setModal] = useState(false);
  const [resources, setResources] = useState([]);
  const [newResources, setNewResources] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const filteredResources = resources.filter((resource) =>
    resource.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchResources = async () => {
      try {
        console.log("Fetching resources...");
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
  }, []);

  const { t } = useTranslation();
  const toggle = () => setModal(!modal);

  const handleShow = () => {
    setModal(true);
  };

  useImperativeHandle(ref, () => ({
    open: handleShow,
  }));

  const handleQuantityChange = (resourceId, newQuantity) => {
    const resourceName =
      resources.find((resource) => resource.id === resourceId)?.name ||
      "Unknown";

    const existingResourceIndex = newResources.findIndex(
      (resource) => resource.id === resourceId
    );

    if (existingResourceIndex !== -1) {
      setNewResources(
        newResources.map((resource, index) => {
          if (index === existingResourceIndex) {
            return { ...resource, quantity: newQuantity };
          }
          return resource;
        })
      );
    } else {
      setNewResources([
        ...newResources,
        { id: resourceId, name: resourceName, quantity: newQuantity },
      ]);
    }
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} centered={true} size="lg">
        <ModalHeader
          toggle={toggle}
          style={{ color: "var(--whitey)", fontWeight: "bold" }}
          className="modal-style"
        >
          Edit project resources{" "}
          <Input
            className="mt-2"
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </ModalHeader>
        <ModalBody className="modal-style">
          <div style={{ minHeight: "35vh" }}>
            <Row>
              <Col md={12}>
                <div style={{ maxHeight: "240px", overflowY: "auto" }}>
                  {filteredResources.map((resource) => {
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
                          value={
                            newResources.find((r) => r.id === resource.id)
                              ?.quantity || 0
                          }
                          onChange={(e) =>
                            handleQuantityChange(resource.id, e.target.value)
                          }
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
          <Button color="primary" onClick={toggle}>
            Save
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
});

export default EditResources;
