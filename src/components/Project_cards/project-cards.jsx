import { Card, CardBody, CardTitle, CardSubtitle, CardText, CardHeader, CardFooter } from "reactstrap";
import { Link } from "react-router-dom";
import { MdDateRange } from "react-icons/md";

import "../../assets/css/general-css.css";
import PlusIcon from "../../assets/icons/plus-circle-icon.png";
import { useTranslation } from "react-i18next";

const ProjectCards = ({ Project }) => {
  const { t } = useTranslation();

  const formatStatus = (status) => {
    let formattedStatus;
    let backgroundColor;

    switch (status) {
      case "PLANNING":
        formattedStatus = t("planning-phase");
        backgroundColor = "var(--planning)";
        break;
      case "READY":
        formattedStatus = t("ready-phase");
        backgroundColor = "var(--ready)";
        break;
      case "IN_PROGRESS":
        formattedStatus = t("in_progress");
        backgroundColor = "var(--in-progress)";
        break;
      case "FINISHED":
        formattedStatus = t("finished-phase");
        backgroundColor = "var(--finished)";
        break;
      case "CANCELLED":
        formattedStatus = t("cancelled-phase");
        backgroundColor = "var(--cancelled)";
        break;
      default:
        formattedStatus = status;
        backgroundColor = "gray";
    }

    return { formattedStatus, backgroundColor };
  };

  //função para limitar o tamanho da descrição do projeto
  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    } else {
      return description;
    }
  };

  const { formattedStatus, backgroundColor } = formatStatus(Project.status);

  return (
    <>
      <Card id={Project.id} color="light" style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" }}>
        <CardHeader style={{ backgroundColor: "var(--greyish)" }}>
          <CardTitle tag="h4" style={{ fontWeight: "bold", textAlign: "center" }}>
            {Project.title}
          </CardTitle>
        </CardHeader>
        <CardBody>
          <CardSubtitle className="mb-2" tag="h6" style={{ color: backgroundColor }}>
            {formattedStatus}
          </CardSubtitle>
          <CardText>{truncateDescription(Project.description, 95)}</CardText>
          <div>
            <MdDateRange /> {t("project-start-date")}: {Project.startDate}
          </div>
          <div>
            {Project.projectUsers.slice(0, 3).map((user, index) => (
              <img
                key={user.id}
                src={user.imagePath}
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  marginRight: "-5px",
                  marginTop: "10px",
                }}
              />
            ))}
            {Project.projectUsers.length > 3 && (
              <img
                src={PlusIcon}
                alt="plus"
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  marginRight: "-5px",
                  marginTop: "10px",
                }}
              />
            )}
          </div>
        </CardBody>
        <CardFooter>
          <Link color="light" to={`/fica-lab/project/${Project.id}`} className="btn button-style1 w-100">
            {t("open-project")}
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};

export default ProjectCards;
