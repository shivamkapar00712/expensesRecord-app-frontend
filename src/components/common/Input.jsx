import React from "react";
import '../../app.css'
const InputField = ({ name, value, placeholder, errors, onChange, type }) => {
  return (
    <input
      className="formcontrol"
      type={type}
      value={value}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      errors={errors}
    />
  );
};

export default InputField;
