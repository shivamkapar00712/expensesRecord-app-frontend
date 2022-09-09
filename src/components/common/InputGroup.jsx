import React from "react";

import InputField from "./Input";

const InputGroup = ({
  name,
  value,
  placeholder,
  errors,
  onChange,
  type,
  label,
}) => {
  return (
    <div className="row">
      <label className="col-md-2 lable control-label">{label}</label>
      <div className="col-md-10">
        <InputField
          type={type}
          value={value}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          errors={errors}
        />
        <div className="form-floating">
          {errors ? <div className="alert">{errors}</div> : null}
        </div>
      </div>
    </div>
  );
};

export default InputGroup;
