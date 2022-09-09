import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import NavBar from "./components/navbar";
import RegisterForm from "./components/registerForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./app.css";
import LoginForm from "./components/loginForm";
import NewTransaction from "./components/newTransaction";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/home";
import * as authService from "./services/authService";
import * as userService from "./services/userService";
import Logout from "./components/logout";
import Dashboard from "./components/dashboard";
import FundRequest from "./components/fundRequest";
import TransactionHistory from "./components/history";
import * as httpServices from "./services/httpServices";


function App(props) {
  const navigator = useNavigate();
  useEffect(()=>{
    const result = httpServices.getAuthHeader().then(
      (data)=>{
        if (!data.Authorization) navigator('/login',true);
      }
    )
  },[])
  return (
    <React.Fragment>
      <NavBar  />
      <div className="container w-75 p-5 col">
        <ToastContainer />
        <Routes>
          <Route path='/wallethistory' element={<TransactionHistory />} />
          <Route path="/fundrequest" element={<FundRequest />} />
          <Route
            path="/transaction"
            exact
            element={<NewTransaction />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LoginForm {...props} />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" exact element={<Home />} />
          <Route path="*" element={<RegisterForm />} />
        </Routes>
      </div>
    </React.Fragment>
  );
}

export default App;
