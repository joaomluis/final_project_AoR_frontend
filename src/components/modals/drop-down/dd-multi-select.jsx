import React from "react";
import { useSearchParams } from "react-router-dom";
import Select from "react-select";
/**
 * Component to render a dropdown with multiple selection
 * @param {*} label
 * @param {*} options
 * @param {*} handleOnChange
 * @param {*} selected
 * @returns
 */

const DDMultiSelect = ({ label, options = [], handleOnChange }) => {
  const [searchParams] = useSearchParams();
  const labels = searchParams.getAll(label);
  console.log(labels);
  const labelNames = labels.flatMap((label) => label.toLowerCase().split(","));
  const labelIds = options.filter((option) => labelNames.includes(option.name.toLowerCase())).map((option) => option.id);
  console.log(labelIds);

  const handleChange = (selectedOptions) => {
    const newSelectedOptions = selectedOptions.map((option) => option.value);
    handleOnChange(newSelectedOptions);
  };

  return (
    <div>
      <label>{label}:</label>
      <Select
        isMulti
        name="colors"
        options={options.map((option) => ({ value: option.id, label: option.name }))}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleChange}
        value={labelIds.map((id) => ({ value: id, label: options.find((opt) => opt.id === id)?.name }))}
      />
    </div>
  );
};

export default DDMultiSelect;
