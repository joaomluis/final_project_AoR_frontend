import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from "reactstrap";

const ProjectCards = ({ Project }) => {



  return (
    <>
      <Card
        id={Project.id} 
        color="light"
        style={{
          width: "18rem",
        }}
      >
        <CardBody>
          <CardTitle tag="h5">{Project.title}</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            {Project.status}
          </CardSubtitle>
          <CardText>
            {Project.description}
          </CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
    </>
  );
}

export default ProjectCards;
