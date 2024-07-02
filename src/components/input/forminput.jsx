import React from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { useTranslation } from "react-i18next";
function FormInput({ label, placeholder, type, required, value, setValue, data, handleClick, disabled }) {
  const { t } = useTranslation();
  disabled = disabled === undefined ? true : disabled;
  if (type === "select") {
    return (
      <FormGroup floating>
        <Input
          bsSize="md"
          type={type}
          className="form-select"
          onClick={handleClick}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          required={disabled}
        >
          <option value="" disabled={disabled}>
            {placeholder}
          </option>

          {data.map((option) => (
            <option key={option.id} value={option.id}>
              {option.location ? option.location : option.name}
            </option>
          ))}
        </Input>
        <Label style={{ fontSize: "medium" }}>{label}</Label>
      </FormGroup>
    );
  } else {
    return (
      <FormGroup floating>
        <Input name="text" placeholder={placeholder} type={type} required={required} value={value} onChange={(e) => setValue(e.target.value)} />
        <Label style={{}}>{label}</Label>
      </FormGroup>
    );
  }
}

export default FormInput;
