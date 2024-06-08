import React from "react";
import { Button } from "reactstrap";
import BaseModal from "./modal-base";
import { useTranslation } from "react-i18next";

const ConfirmModal = ({ isOpen, toggle, title, onConfirm }) => {
  const { t } = useTranslation();
  const footer = (
    <>
      <Button color="primary" onClick={onConfirm}>
        {t("yes")}
      </Button>
      <Button color="secondary" onClick={toggle}>
        {t("no")}
      </Button>
    </>
  );

  return (
    <BaseModal isOpen={isOpen} toggle={toggle} title={title} footer={footer}>
      {t("are-you-sure")}
    </BaseModal>
  );
};

export default ConfirmModal;
