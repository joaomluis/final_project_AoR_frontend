import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardHeader,
  CardFooter,
} from "reactstrap";
import { Link } from "react-router-dom";
import { MdDateRange } from "react-icons/md";

import "../../assets/css/general-css.css";
import PlusIcon from "../../assets/icons/plus-circle-icon.png";

const ProjectCards = ({ Project }) => {
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

  return (
    <>
      <Card
        id={Project.id}
        color="light"
        style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" }}
      >
        <CardHeader style={{ backgroundColor: "var(--greyish)" }}>
          <CardTitle tag="h4" style={{ fontWeight: "bold" }}>
            {Project.title}
          </CardTitle>
        </CardHeader>
        <CardBody>
          <CardSubtitle
            className="mb-2"
            tag="h6"
            style={{ color: backgroundColor }}
          >
            {formattedStatus}
          </CardSubtitle>
          <CardText>{truncateDescription(Project.description, 100)}</CardText>
          <div>
            <MdDateRange /> Start date: {Project.startDate}
          </div>
          <div>
            {Project.projectUsers.slice(0, 4).map((user, index) => (
              <img
                key={index}
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
          </div>
        </CardBody>
        <CardFooter>
          <Link
            color="light"
            to={`/fica-lab/project/${Project.id}`}
            className="btn button-style1 w-100"
          >
            Open Project
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};

export default ProjectCards;
