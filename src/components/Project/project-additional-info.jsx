import { CardBody, Card, Button, CardFooter } from "reactstrap";

import ProjectPreview from "../Preview/project-preview.jsx";


function ProjectAdditionalInfo({ data, title, editButton }) {


  return (
    <>
      
      <Card
        style={{ backgroundColor: "#dbe2ef", borderRadius: "10px" }}
        className="mt-2"
      >
        <CardBody style={{ minHeight: "37vh" }}>
          <ProjectPreview data={data} name={title} />
        </CardBody>
        <CardFooter style={{borderTop:'none'}}>
          {editButton && (
          <Button color="white" size="sm" className="button-style1" onClick={editButton}>
            Edit
          </Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
}

export default ProjectAdditionalInfo;
