import { CardBody, Card, CardHeader, Button, CardFooter } from "reactstrap";

import ProjectPreview from "../Preview/project-preview.jsx";
import { useUserStore } from "../../stores/useUserStore.js";
import { useEffect, useState } from "react";
import { Api } from "../../api.js";
import { useParams } from "react-router-dom";

function ProjectAdditionalInfo({ data, title }) {
  return (
    <>
      <Card
        style={{ backgroundColor: "#dbe2ef", borderRadius: "10px" }}
        className="mt-2"
      >
        <CardBody>
          <ProjectPreview data={data} name={title} />
        </CardBody>
        <CardFooter>
          <Button color="white" size="sm" className="button-style1">
            Add
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default ProjectAdditionalInfo;
