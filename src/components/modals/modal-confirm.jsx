import React from "react";
import { Button } from "reactstrap";
import BaseModal from "./modal-base";
import { useTranslation } from "react-i18next";

const ConfirmModal = ({ isOpen, toggle, title, onConfirm }) => {
  const { t } = useTranslation();
  const footer = (
    <>
      <div className="confirm-modal-buttons">
        <Button className="confirm-button" onClick={onConfirm}>
          {t("yes")}
        </Button>
        <Button className="cancel-button" onClick={toggle}>
          {t("no")}
        </Button>
      </div>
    </>
  );

  return (
    <BaseModal isOpen={isOpen} toggle={toggle} title={title} footer={footer}>
      {t("are-you-sure")}
    </BaseModal>
  );
};

export default ConfirmModal;
