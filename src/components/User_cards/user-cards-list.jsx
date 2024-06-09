import { Card, CardBody, CardTitle, CardSubtitle, CardText, CardHeader, CardFooter, Badge } from "reactstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./user-cards-list.css";
import PopoverComponent from "../tags/tag-popover-component";
import { MdDateRange } from "react-icons/md";

const UserCardList = ({ User }) => {
  const { t } = useTranslation();
  if (!User) {
    return null; // or some fallback UI
  }

  function publicPart() {
    return (
      <>
        <div className="project-card-info">
          <MdDateRange /> &nbsp;Since:&nbsp;<strong>{User.created}</strong>
        </div>
        <div className="project-card-view-style">
          <div className="project-card-view">
            <PopoverComponent data={User.interests} title={t("view-interests")} id={User.id} />
            <PopoverComponent data={User.skills} title={t("view-skills")} id={User.id} />
          </div>
        </div>
      </>
    );
  }

  function privatePart() {
    return (
      <>
        <div className="project-card-info private">Private</div>
      </>
    );
  }

  return (
    <>
      <Card id={User.id} color="light" className="card-style">
        <CardHeader className="card-header-style">
          <CardTitle tag="h4" className="card-title-style">
            <div className="flex-center">
              <img alt="profile" src={User.imagePath} className="profile-image" />
              {User.firstname} {User.lastname}&nbsp;<span className="card-header-span-style"> ({User.username ? User.username : ""})</span>{" "}
            </div>
          </CardTitle>
        </CardHeader>

        <CardBody>
          <CardSubtitle className="project-card-info">
            {t("lab")}:&nbsp; <strong>{User.lablocation}</strong>
          </CardSubtitle>
          {User.privateProfile ? privatePart() : publicPart()}
        </CardBody>
        <CardFooter>
          <Link color="light" to={`/fica-lab/user/${User.id}`} className="btn button-style1 w-100">
            {t("see-user")}
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};

export default UserCardList;
