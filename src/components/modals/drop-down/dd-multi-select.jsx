import React from "react";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
/**
 * Component to render a dropdown with multiple selection
 * @param {*} label
 * @param {*} options
 * @param {*} handleOnChange
 * @param {*} selected
 * @returns
 */
function DDMultiSelect({ label, options, handleOnChange, selected }) {
  return (
    <div>
      <label>{label}:</label>
      <DropdownMultiselect
        options={(options || []).map((option) => ({
          key: option.id,
          label: option.name,
        }))}
        name={label}
        handleOnChange={handleOnChange}
        selected={selected}
      />
    </div>
  );
}

export default DDMultiSelect;
