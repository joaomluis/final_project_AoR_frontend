import React, { useState } from "react";
import { Button, Input, FormGroup, Label } from "reactstrap";
import BaseModal from "./modal-base";
import { useTranslation } from "react-i18next";

const CancelProjectModal = ({ isOpen, toggle, title, onConfirm }) => {
  const { t } = useTranslation();
  const [justification, setJustification] = useState("");

  const handleConfirm = () => {
    if (justification.trim()) {
      onConfirm(justification);
      setJustification("");
    } else {
      alert(t("please-provide-justification"));
    }
  };

  const footer = (
    <>
      <div style={{ textAlign: "right" }}>
        <Button color="primary" style={{ marginRight: "10px" }} onClick={handleConfirm}>
          {t("confirm")}
        </Button>
        <Button color="secondary" onClick={toggle}>
          {t("cancel")}
        </Button>
      </div>
    </>
  );

  return (
    <BaseModal isOpen={isOpen} toggle={toggle} title={title} footer={footer}>
      <FormGroup>
        <Label for="justification">{t("please-provide-justification")}</Label>
        <Input type="textarea" name="justification" id="justification" value={justification} onChange={(e) => setJustification(e.target.value)} />
      </FormGroup>
    </BaseModal>
  );
};

export default CancelProjectModal;
