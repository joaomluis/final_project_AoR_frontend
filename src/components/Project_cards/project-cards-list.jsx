import { Card, CardBody, CardTitle, CardSubtitle, CardText, CardHeader, CardFooter, Badge } from "reactstrap";
import { Link } from "react-router-dom";
import { MdDateRange } from "react-icons/md";
import { useTranslation } from "react-i18next";
import "./project-cards-list.css";
import "../../assets/css/general-css.css";
import PlusIcon from "../../assets/icons/plus-circle-icon.png";
import PopoverComponent from "../tags/tag-popover-component";
const ProjectCardsList = ({ Project }) => {
  const { t } = useTranslation();
  const formatStatus = (status) => {
    let formattedStatus;
    let backgroundColor;

    switch (status) {
      case "PLANNING":
        formattedStatus = "Planning";
        backgroundColor = "blue";
        break;
      case "READY":
        formattedStatus = "Ready";
        backgroundColor = "green";
        break;
      case "IN_PROGRESS":
        formattedStatus = "In Progress";
        backgroundColor = "yellow";
        break;
      case "FINISHED":
        formattedStatus = "Finished";
        backgroundColor = "green";
        break;
      case "CANCELLED":
        formattedStatus = "Cancelled";
        backgroundColor = "red";
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
  const projectUsers = Project.projectUsers;
  const maxParticipants = Project.maxParticipants;
  return (
    <>
      <Card id={Project.id} color="light" style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" }}>
        <CardHeader style={{ backgroundColor: "var(--greyish)" }}>
          <CardTitle tag="h4" style={{ fontWeight: "bold" }}>
            {Project.title}
          </CardTitle>
        </CardHeader>
        <CardBody>
          <CardSubtitle
            className="mb-2"
            tag="h6"
            style={{
              color: backgroundColor,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {formattedStatus}
            <div className="user-info">
              {t("participants")} {projectUsers.length} / {maxParticipants}
            </div>
          </CardSubtitle>
          <CardText>{truncateDescription(Project.description, 95)}</CardText>
          <div>
            <MdDateRange /> Start date: {Project.startDate}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="project-card-view">
              <PopoverComponent data={Project.keywords} title={t("view-keywords")} id={Project.id} idText="view-keywords" />
              <PopoverComponent data={Project.skills} title={t("view-skills")} id={Project.id} idText="view-skills" />
            </div>
          </div>
        </CardBody>
        <CardFooter>
          <Link color="light" to={`/fica-lab/project/${Project.id}`} className="btn button-style1 w-100">
            {t("see-project")}
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};

export default ProjectCardsList;
