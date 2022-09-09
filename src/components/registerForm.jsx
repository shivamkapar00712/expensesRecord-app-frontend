import React, { Component } from "react";

import InputGroup from "./common/InputGroup";
import pic from "../img/edit.png";
import Joi from "joi-browser";
import http from "../services/httpServices";
import config from "../config.json";
import { toast } from "react-toastify";
import { loginWithJWT } from "../services/authService";


class RegisterForm extends Component {
  state = {
    account: { name: "", email: "", password: "" },
    errors: {},
  };

  schema = {
    name: Joi.string().required().min(3).max(255),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  validate = () => {
    const account = { ...this.state.account };
    const { error } = Joi.validate(account, this.schema, { abortEarly: true });
    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const errors = this.validate();

    this.setState({ errors: errors || {} });
    if (errors) return;

    const user = { ...this.state.account };
    const { data } = await http.post(`${config.apiEndPoint}/register`, user);

    loginWithJWT(data.token);
    window.location.href = '/dashboard';
  };

  render() {
    const { account, errors } = this.state;

    return (
      <form className="form p-3" onSubmit={this.handleSubmit}>
        <div className="container">
          <h3 className="text-center">Register</h3>
        </div>

        <hr />

        <InputGroup
          label="User Name"
          name="name"
          type="text"
          value={account.name}
          onChange={this.handleChange}
          errors={errors.name}
          placeholder="Enter your name here"
        />

        <InputGroup
          label="E-mail"
          name="email"
          type="email"
          value={account.email}
          onChange={this.handleChange}
          errors={errors.email}
          placeholder="Enter your email here"
        />

        <InputGroup
          label="Password"
          name="password"
          type="password"
          value={account.password}
          onChange={this.handleChange}
          errors={errors.password}
          placeholder="Enter your password here"
        />

        <button className="btn btn-outline-success customBtn">Register</button>
      </form>
    );
  }
}

export default RegisterForm;
