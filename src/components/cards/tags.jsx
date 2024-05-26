import React, { useState } from "react";

import CreatableSelect from "react-select/creatable";
import ModalDD from "../modals/modal-dropdown";
const TagCard = (props) => {
  const [newSkill, setNewSkill] = useState("");
  const options = [
    { value: "jack", label: "Jack" },
    { value: "john", label: "John" },
    { value: "mike", label: "Mike" },
  ];
  const colorStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return { ...styles, color: "black" };
    },
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: data.color,
        color: "blue",
      };
    },
    multiValueLabel: (styles, { data }) => {
      return {
        ...styles,
        color: "black",
      };
    },
    multiValueRemove: (styles, { data }) => {
      return {
        ...styles,
        color: "black", // change color to red
        cursor: "pointer",
        ":hover": {
          color: "red", // change hover color to blue
        },
      };
    },
    dropdownIndicator: (styles) => ({
      ...styles,
      color: "green", // change dropdown indicator color to green
    }),
    clearIndicator: (styles) => ({
      ...styles,
      color: "red", // change clear indicator color to purple
    }),
  };
  const handleChange = (selectedOption) => {
    console.log("handleChange", selectedOption);
    console.log(selectedOption.value);
  };
  const handleInputChange = (inputValue, actionMeta) => {
    console.log("inputValue", inputValue);
  };

  const handleCreate = (inputValue) => {
    props.handleModalToggle();
    props.onCreate(inputValue);

    console.log("handleCreate", inputValue);
  };

  return (
    <CreatableSelect
      options={options}
      onChange={handleChange}
      onInputChange={handleInputChange}
      onCreateOption={handleCreate}
      isMulti
      styles={colorStyles}
      isClearable={false}
    />
  );
};

export default TagCard;
