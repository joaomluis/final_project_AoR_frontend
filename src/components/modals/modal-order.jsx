import React, { useState } from "react";
import ModalBase from "./modal-base";
import { useTranslation } from "react-i18next";
import { Button, FormGroup, Label, Input } from "reactstrap";
import { useSearchParams } from "react-router-dom";

function ModalFilter({ isOpen, toggle, title, filters, onSubmit }) {
  const { t } = useTranslation();

  // Altere o estado para armazenar o filtro selecionado e a direção da ordenação
  const [searchParams, setSearchParams] = useSearchParams();
  const orderFieldParam = searchParams.get("field");
  const orderDirectionParam = searchParams.get("direction");

  const [selectedOrder, setSelectedOrder] = useState({ filter: orderFieldParam, direction: orderDirectionParam });

  const handleOrderChange = (filter, direction) => {
    if (filter == null || direction == null) {
      handleClear();
    } else {
      setSelectedOrder({ filter, direction });

      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("field", filter);
      newSearchParams.set("direction", direction);
      setSearchParams(newSearchParams);
    }
  };

  const handleClear = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("field");
    newSearchParams.delete("direction");
    setSearchParams(newSearchParams);
    setSelectedOrder({ filter: null, direction: null });
  };

  const footer = (
    <div>
      <Button color="" className="button-style1 btn-modal-filter" onClick={onSubmit}>
        {t("apply")}
      </Button>
    </div>
  );

  return (
    <ModalBase isOpen={isOpen} toggle={toggle} title={title} footer={footer}>
      <Button color="" className="button-style1 btn-modal-filter mb-2" onClick={handleClear}>
        {t("clear")}
      </Button>
      {filters?.map((filter, index) => (
        <FormGroup
          key={index}
          check
          style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}
        >
          <div style={{ fontWeight: "bold", marginRight: "10px", flex: 1 }}>{filter.label}</div>
          <Label check style={{ marginRight: "10px", flex: 1, textAlign: "" }}>
            <Input
              type="radio"
              name={filter.label}
              value="asc"
              checked={selectedOrder.filter === filter.label && selectedOrder.direction === "asc"}
              onChange={() => handleOrderChange(filter.label, "asc")}
            />
            {t("order-asc")}
          </Label>
          <Label check style={{ flex: 1 }}>
            <Input
              type="radio"
              name={filter.label}
              value="desc"
              checked={selectedOrder.filter === filter.label && selectedOrder.direction === "desc"}
              onChange={() => handleOrderChange(filter.label, "desc")}
            />{" "}
            {t("order-desc")}
          </Label>
        </FormGroup>
      ))}
    </ModalBase>
  );
}

export default ModalFilter;
