import { Container, Button, Col, Row, Card, CardHeader, CardText, CardBody, CardTitle, Input, CardImg, Label, Form, FormGroup, Badge } from "reactstrap";
import Select from "react-select";
import React, { useCallback } from "react";
import ListLayout from "../layout/list-layout/list.jsx";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaRegSave } from "react-icons/fa";
import { FaRegWindowClose } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

import { useEffect, useRef, useState } from "react";
import ConfirmModal from "../components/modals/modal-confirm.jsx";
import { useTranslation } from "react-i18next";
import { Api } from "../api";
import LabelDD from "../components/tags/label-dd";
import "../assets/css/general-css.css";
import { terror, tsuccess } from "../components/toasts/message-toasts.jsx";
import { useUserStore } from "../stores/useUserStore.js";

function ProductPage() {
  const { t } = useTranslation();
  const token = useUserStore((state) => state.token);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [saveModal, setSaveModal] = useState(false);
  const toggleSaveModal = () => {
    setSaveModal(!setSaveModal);
  };
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const [suppliers, setSuppliers] = useState([]);
  const { id } = useParams();
  const [product, setProduct] = useState({
    brand: "",
    description: "",
    id: "",
    identifier: "",
    name: "",
    quantity: "",
    status: "",
    supplier: "",
    supplierPhone: "",
    type: "",
    notes: "",
  });

  function handleChange(e, fieldName) {
    const newValue = e.target.value;
    setProduct((prev) => ({
      ...prev,
      [fieldName]: newValue, // Atualiza dinamicamente o campo com base em fieldName
    }));
  }
  const handleInputChange = (e) => {
    const { name, value, label } = e.target;

    if (name === "supplier") {
      const selectedSupplier = suppliers.find((supplier) => supplier.id === value);
      console.log(selectedSupplier);

      if (selectedSupplier) {
        setProduct((prev) => ({
          ...prev,
          supplier: label,
          supplierPhone: selectedSupplier.phone,
        }));
      }
    } else {
      setProduct((prev) => ({
        ...prev,
        [name]: label,
      }));
    }
  };

  async function handleGetProduct() {
    const props = {
      id: id,
    };
    try {
      const response = await Api.getProducts(token, props);
      setProduct(response.data.results[0]);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleClickSaveProduct = () => {
    setSaveModal(true);
  };

  const handleRestoreProduct = () => {
    handleGetProduct();
    setEditMode(false);
  };

  async function handleSaveProduct() {
    setLoading(true);

    try {
      const response = await Api.updateProductSupplier(token, product);
      console.log(response.data);
      setEditMode(false);
      setLoading(false);
      tsuccess(t("product-updated"));
    } catch (error) {
      terror(error.message);
    } finally {
      setSaveModal(false);
      setLoading(false);
    }
  }

  const LabelChildren = ({ label, children }) => (
    <Row className="p-4">
      <p>
        <strong className="profile-label">{label}:</strong>
      </p>
      <Badge className="badge-style1" pill>
        {children}
      </Badge>
    </Row>
  );
  const LabelDisable = ({ label, text, name }) => (
    <Row className="p-4">
      <p>
        <strong className="profile-label">{label}:</strong>
      </p>
      <Input type="text" name={name} value={text} disabled />
    </Row>
  );

  async function handleGetSuppliers() {
    const props = { typeDto: "SupplierDto" };
    try {
      const response = await Api.getSuppliers(token, props);
      setSuppliers(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    handleGetProduct();
    handleGetSuppliers();
  }, []);

  return (
    <ListLayout title={t("products")} loading={loading}>
      <Card style={{ boxShadow: "0 0 10px rgba(0,0,0,0.1)", borderRadius: "10px" }}>
        <CardHeader className="">
          <CardTitle tag="h4" className="profile-icons-container" style={{ color: "#333", fontWeight: "bold" }}>
            <strong>{product.name}</strong>
            <div>
              {/* {editMode ? <FaRegTrashAlt className="btn-title" /> : ""} */}
              {editMode ? <FaRegWindowClose className="btn-title" onClick={handleRestoreProduct} /> : ""}
              {editMode ? <FaRegSave className="btn-title" onClick={handleClickSaveProduct} /> : ""}

              <Button className={"my-custom-btn"} outline onClick={toggleEditMode}>
                {t("edit-product")}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>

        <CardBody>
          <Row className="row-no-margin ">
            <Col xl="4" md="6" sm="12" xs="12">
              <LabelDisable label={t("p-identifier")} text={product.identifier} name="identifier" />{" "}
            </Col>
            <Col xl="4" md="6" sm="12" xs="12">
              <LabelChildren label={t("p-type")} text={product.type} editMode={editMode} name="type" handleInputChange={handleInputChange}>
                {product.type === "COMPONENT" ? t("component") : t("resource")}
              </LabelChildren>
            </Col>

            <Col xl="4" lg="6" md="6" sm="12" xs="12">
              <Row className="mt-0 mb-0 p-4">
                <p>
                  <strong className="profile-label">{t("p-brand")}:</strong>
                </p>
                {editMode ? <Input type="text" name="brand" value={product.brand} onChange={(e) => handleChange(e, "brand")} /> : <p>{product.brand}</p>}
              </Row>
            </Col>
            <Col xl="4" lg="6" md="6" sm="12" xs="12">
              <LabelDD
                label={t("p-supplier")}
                text={product.supplier}
                editMode={editMode}
                name="supplier"
                handleInputChange={handleInputChange}
                data={suppliers}
                product={product.supplier}
              />{" "}
            </Col>
            <Col xl="4" lg="6" md="6" sm="12" xs="12">
              <LabelDisable label={t("p-supplier-phone")} text={product.supplierPhone} editMode={editMode} disabled={true} name="supplier" />
            </Col>

            <Col xl="4" lg="6" md="6" sm="12" xs="12">
              <Row className="mt-0 mb-0 p-4">
                <p>
                  <strong className="profile-label">{t("p-quantity")}:</strong>
                </p>
                {editMode ? (
                  <Input type="number" name="quantity" value={product.quantity} onChange={(e) => handleChange(e, "quantity")} />
                ) : (
                  <p>{product.quantity}</p>
                )}
              </Row>
            </Col>
            <Col lg="6" md="12" sm="12" xs="12">
              <Row className="mt-0 mb-0 p-4">
                <p>
                  <strong className="profile-label">{t("p-description")}:</strong>
                </p>
                {editMode ? (
                  <Input type="textarea" name="description" value={product.description} onChange={(e) => handleChange(e, "description")} rows="4" />
                ) : (
                  <p>{product.description}</p>
                )}
              </Row>
            </Col>
            <Col lg="6" md="12" sm="12" xs="12">
              <Row className="mt-0 mb-0 p-4">
                <p>
                  <strong className="profile-label">{t("p-notes")}:</strong>
                </p>
                {editMode ? (
                  <Input type="textarea" name="notes" value={product.notes} onChange={(e) => handleChange(e, "notes")} rows="4" />
                ) : (
                  <p>{product.notes}</p>
                )}
              </Row>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <ConfirmModal isOpen={saveModal} toggle={toggleSaveModal} title={t("confirm")} onConfirm={handleSaveProduct} />
    </ListLayout>
  );
}

export default ProductPage;
