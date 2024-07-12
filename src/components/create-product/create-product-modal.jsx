import React, { useEffect, useState } from "react";
import { useUserStore } from "../../stores/useUserStore";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup, Form } from "reactstrap";
import FormInput from "../input/forminput";
import { useTranslation } from "react-i18next";
import { Api } from "../../api";
import { terror, tsuccess } from "../../components/toasts/message-toasts";
const CreateProductModal = ({ isOpen, toggle }) => {
  const { t } = useTranslation();
  const token = useUserStore((state) => state.token);
  const [typeOptions, setTypeOptions] = useState([]);
  const [supplierOptions, setSupplierOptions] = useState([]);
  let [product, setProduct] = useState({
    name: "",
    identifier: "",
    type: "",
    brand: "",
    supplier: "",
    supplierPhone: "",
    quantity: 1,
    description: "",
    notes: "",
  });

  // Adjusted handleChange if only value is passed
  const handleChange = (field, value) => {
    setProduct((prevState) => ({
      ...prevState,
      [field]: value, // Directly setting the 'name' field, adjust as necessary
    }));
  };

  async function getTypeOptions() {
    try {
      const response = await Api.getFilterOptionsProducts(token);
      setTypeOptions(response.data.types);
      console.log(response.data.types);
    } catch (error) {
      console.log(error.message);
    }
  }
  async function getSupplierOptions() {
    try {
      const response = await Api.getSuppliers(token);
      setSupplierOptions(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }
  async function handleCreateProduct() {
    const typeLabel = typeOptions.find((type) => type.id == product.type)?.name;
    const supplierLabel = supplierOptions.find((supplier) => supplier.id == product.supplier)?.name;
    const newProduct = { ...product, type: typeLabel, supplier: supplierLabel };

    console.log(newProduct);
    try {
      const response = await Api.createProduct(token, newProduct);
      tsuccess("Product created successfully");
      toggle();
      setProduct({});
    } catch (error) {
      terror(error.message);
    }
  }

  useEffect(() => {
    getTypeOptions();
    getSupplierOptions();
  }, []);

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{t("create-product")}</ModalHeader>
      <form>
        <ModalBody>
          <FormInput
            name={"name"}
            label={t("name")}
            placeholder={t("name")}
            type="text"
            value={product.name}
            setValue={(value) => handleChange("name", value)}
            required={true}
          />
          <FormInput
            label={t("identifier")}
            placeholder={t("identifier")}
            type="number"
            value={product.identifier}
            setValue={(value) => handleChange("identifier", value)}
            required={true}
          />
          <FormInput
            label={t("type")}
            placeholder={t("select-type")}
            type="select"
            value={product.type}
            data={typeOptions}
            setValue={(value) => handleChange("type", value)}
            required={true}
          />
          <FormInput
            label={t("brand")}
            placeholder={t("brand")}
            type="text"
            value={product.brand}
            setValue={(value) => handleChange("brand", value)}
            required={true}
          />
          <FormInput
            label={t("supplier")}
            placeholder={t("select-supplier")}
            type="select"
            value={product.supplier}
            data={supplierOptions}
            setValue={(value) => handleChange("supplier", value)}
            required={true}
          />
          <FormInput
            label={t("quantity")}
            placeholder={t("quantity")}
            type="number"
            value={product.quantity}
            setValue={(value) => handleChange("quantity", value)}
            required={true}
          />
          <FormInput
            label={t("description")}
            placeholder={t("description")}
            type="textarea"
            value={product.description}
            setValue={(value) => handleChange("description", value)}
          />
          <FormInput
            label={t("notes")}
            placeholder={t("notes")}
            type="textarea"
            value={product.notes}
            setValue={(value) => handleChange("notes", value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="light" className="button-style1 mt-1" onClick={handleCreateProduct}>
            {t("save-product")}
          </Button>{" "}
          <Button color="light" className="button-style1 mt-1" onClick={toggle}>
            {t("cancel")}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default CreateProductModal;
