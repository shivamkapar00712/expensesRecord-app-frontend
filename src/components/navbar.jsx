import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import * as authService from '../services/authService';
import * as userService from '../services/userService';
import '../css/navbar.css'

class NavBar extends Component {
  state = {
    user:null
  };

  componentDidMount(){

    authService.getCurrentUser().then(result => {
      userService.getUserData(result.id).then(currentUser =>{
        console.log(currentUser);
        console.log(result)
        const {data} = currentUser
        this.setState({user:data});
      })
    } );
  }

  handleLogout = () => {
    console.log("clicked logout");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid row">
          <div className="nav-item col-10">
            <div className="row">
              <div className="col-2">
                <Link className="navbar-brand" to="/">
                  DaliyIncomeReports
                </Link>
              </div>
              {this.state.user && (<div className="col">
                <Link className="nav-link text-white" to='/dashboard'>
                  Dashboard
                </Link>
              </div>)}

            </div>
          </div>

          <div className="collapse col navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {!this.state.user && (
                <React.Fragment>
                  <li className="nav-item ">
                    <NavLink className={`nav-link`} to="/register">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                </React.Fragment>
              )}
              {this.state.user && (
                <React.Fragment>
                  <li className="nav-item ">
                    <NavLink
                      className={`nav-link`}
                      to="/"
                      onClick={this.handleLogout}
                    >
                      {this.state.user.name}
                    </NavLink>
                  </li>
                  <li className="nav-item ">
                    <NavLink
                      className={`nav-link`}
                      to="/logout"
                    >
                      Logout
                    </NavLink>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
