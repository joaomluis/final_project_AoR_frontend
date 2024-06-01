import React from "react";
import { FormGroup, Input, Label } from "reactstrap";
function FormInput({ label, placeholder, type, required, value, setValue }) {
  return (
    <FormGroup floating>
      <Input
        name="text"
        placeholder={placeholder}
        type={type}
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Label style={{ backgroundColor: "none" }}>{label}</Label>
    </FormGroup>
  );
}

export default FormInput;
