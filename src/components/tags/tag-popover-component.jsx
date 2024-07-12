import React from "react";
import { Badge, Popover, PopoverHeader, PopoverBody } from "reactstrap";
import { useState } from "react";
import "../../assets/css/general-css.css";

const PopoverComponent = ({ data, title, id, idText }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const togglePopover = () => setPopoverOpen(!popoverOpen);

  const uniqueId = `${idText}-${id}`;

  return (
    <div className="skill-keyword-container tag skill-tag">
      <div
        className="view-skill-keyword"
        id={uniqueId}
        style={{ cursor: "pointer" }}
        onMouseEnter={togglePopover} // Mantém a funcionalidade de hover
        onMouseLeave={togglePopover} // Mantém a funcionalidade de hover
        // onClick={togglePopover} // Adiciona funcionalidade de clique
      >
        {title}
      </div>
      <Popover
        placement="bottom"
        isOpen={popoverOpen}
        target={uniqueId}
        // toggle={togglePopover} // Permite fechar o popover ao clicar fora
      >
        {/* <PopoverHeader
          style={{
            backgroundColor: "var(--greyish)",
            color: "var(--primary-color-darker)",
          }}
        >
          {title}
        </PopoverHeader> */}
        <PopoverBody>
          {data?.map((element, index) => (
            <Badge key={index} className="m-1 badge-style">
              {element}
            </Badge>
          ))}
        </PopoverBody>
      </Popover>
    </div>
  );
};

export default PopoverComponent;
