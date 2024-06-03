import React from "react";
import { Label, Input } from "reactstrap"; // assuming you're using reactstrap

function FormInput({
  label,
  placeholder,
  type,
  required,
  value,
  setValue,
  data,
}) {
  return (
    <div>
      <Label style={{ fontWeight: "bold", marginTop: "1rem" }}>{label}</Label>
      {type === "select" ? (
        <Input
          type={type}
          required={required}
          onChange={(event) => setValue(event.target.value)}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {data &&
            data.map((item, index) => (
              <option key={index} value={item.id}>
                {item.location}
              </option>
            ))}
        </Input>
      ) : (
        <Input
          type={type}
          placeholder={placeholder}
          value={value}
          required={required}
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />
      )}
    </div>
  );
}

export default FormInput;
