import React from "react";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";

const DDMultiSelect = ({ label, options, handleOnChange }) => (
  <div>
    <label>{label}:</label>
    <DropdownMultiselect
      options={(options || []).map((option) => ({
        key: option.id,
        label: option.name,
      }))}
      name={label}
      handleOnChange={handleOnChange}
    />
  </div>
);

export default DDMultiSelect;
