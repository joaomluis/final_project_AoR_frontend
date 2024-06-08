import React, { useState } from "react";
import ModalBase from "./modal-base";
import DDMultiSelect from "./drop-down/dd-multi-select";
import { useTranslation } from "react-i18next";
import { Button } from "reactstrap";
function ModalFilter({ isOpen, toggle, title, filters, onSubmit }) {
  const { t } = useTranslation();
  const footer = (
    <div>
      <Button color="primary" className="button-style1 btn-modal-filter" onClick={onSubmit}>
        {t("apply")}
      </Button>
    </div>
  );

  return (
    <ModalBase isOpen={isOpen} toggle={toggle} title={title} footer={footer}>
      {filters.map((filter, index) => (
        <div key={index}>
          <DDMultiSelect label={filter.label} options={filter.options} handleOnChange={filter.handleOnChange} />
        </div>
      ))}
    </ModalBase>
  );
}

export default ModalFilter;
