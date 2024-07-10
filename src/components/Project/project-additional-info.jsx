import { CardBody, Card, Button, CardFooter } from "reactstrap";

import ProjectPreview from "../Preview/project-preview.jsx";
import { useTranslation } from "react-i18next";
import UserType from "../enums/UserType.js";
function ProjectAdditionalInfo({ data, title, editButton, userType }) {
  const { t } = useTranslation();

  return (
    <>
      <Card style={{ backgroundColor: "#dbe2ef", borderRadius: "10px" }} className="mt-2">
        <CardBody style={{ minHeight: "37vh" }}>
          <ProjectPreview data={data} name={title} />
        </CardBody>
        {userType === UserType.MANAGER && (
          <CardFooter style={{ borderTop: "none" }}>
            {editButton && (
              <Button color="white" size="sm" className="button-style1" onClick={editButton}>
                {t("edit-button")}
              </Button>
            )}
          </CardFooter>
        )}
      </Card>
    </>
  );
}

export default ProjectAdditionalInfo;
