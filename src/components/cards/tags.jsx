import React, { useState } from "react";

import CreatableSelect from "react-select/creatable";
const TagCard = (props) => {
  /**
   * Method to handle the change of the selected option mappping the value to the id and the label to the name
   * @param {*} selectedOption
   */
  const options = props.options.map((option) => ({
    value: option.id,
    label: option.name,
    type: option.type,
  }));

  const choices = props.choices.map((choice) => ({
    value: choice.id,
    label: choice.name,
    type: choice.type,
  }));

  /**
   * Method to handle the change of the selected option
   */
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

  /**
   * Method to handle the change of the selected option mappping the value to the id and the label to the name
   * @param {*} selectedOption
   */
  const handleChange = (selectedOption, action) => {
    if (action.action === "remove-value") {
      props.onRemove(action.removedValue);
    } else if (action.action === "select-option") {
      const lastSelectedOption = selectedOption[selectedOption.length - 1];
      props.onAdd(lastSelectedOption);
      console.log(lastSelectedOption);
    }
  };
  /**
   * Method to handle the change of the input value
   * @param {*} inputValue
   * @param {*} actionMeta
   */
  const handleInputChange = (inputValue, actionMeta) => {
    console.log("handleInputChange", inputValue);
  };

  /**
   * Method to handle the creation of a new option
   * @param {*} inputValue
   */
  const handleCreate = (inputValue) => {
    props.handleModalToggle();
    props.onCreate(inputValue);
  };

  return (
    <CreatableSelect
      options={options}
      defaultValue={choices}
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
