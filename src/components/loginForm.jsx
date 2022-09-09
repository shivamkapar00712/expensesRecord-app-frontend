import React, { useState, useEffect } from "react";
import InputGroup from "./common/InputGroup";

import Joi from "joi-browser";
import * as httpServices from "../services/httpServices";
import * as authService from "../services/authService";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const schema = {
  email: Joi.string().required().email(),
  password: Joi.string().required(),
};

const validate = (account) => {
  const { error } = Joi.validate(account, schema, { abortEarly: true });
  if (!error) return null;

  const errors = {};
  for (let item of error.details) {
    errors[item.path[0]] = item.message;
  }
  return errors;
};

const handleSubmit = async (e,account,setErrors, navigator) => {
  e.preventDefault();
  const errors = validate(account);
  setErrors(errors || {});
  if (errors) return;
    authService.login(account.email,account.password).then(
      result=>{
        console.log(result)
        window.location.href = '/dashboard';
      }
    )
};

const handleChange = (e,account,setAccount) => {
  const {currentTarget: input} = e;
  const accounts = { ...account };
  accounts[input.name] = input.value;
  setAccount(accounts);
};
const LoginForm = (props, context) => {
  const navigator = useNavigate();
  const [account, setAccount] = useState({email:'',password:''});
  const [errors, setErrors] = useState({});
  // useEffect(()=>{
  //   const result = httpServices.getAuthHeader().then(
  //     (data)=>{
  //       if (data.Authorization) navigator('/dashboard',true);
  //     }
  //   )
  // },[])
  return (
    <form className="form p-3" onSubmit={(e)=>handleSubmit(e,account,setErrors,navigator)}>
      <div className="container">
        <h3 className="text-center">Login</h3>
      </div>

      <hr />

      <InputGroup
        label="E-mail"
        name="email"
        type="email"
        value={account.email}
        onChange={(e)=>handleChange(e,account,setAccount)}
        errors={errors.email}
        placeholder="Enter your email here"
      />

      <InputGroup
        label="Password"
        name="password"
        type="password"
        value={account.password}
        onChange={(e)=>handleChange(e,account,setAccount)}
        errors={errors.password}
        placeholder="Enter your password here"
      />

      <button className="btn btn-outline-success customBtn">Login</button>
    </form>
  );
};

export default LoginForm;
