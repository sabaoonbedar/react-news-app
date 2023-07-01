import React, { useState, useEffect } from "react";
import "../../../css/auth.css";
import "../../../css/preDataLoader.css";

import { connect } from "react-redux";
import { LoginAuth } from "../../../redux/actions";
import { useNavigate, Outlet, NavLink } from "react-router-dom";
import _ from "lodash";

var CryptoJS = require("crypto-js");

function MainTabs(props) {
  const eyeIcon = {
    position: "absolute",
    cursor: "pointer",
    left: "102%",
    top: "50px",
    zIndex: "100px",
    color: "#094274",
  };

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState("password");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (props.isAuthenticated) {
      navigate("/home", { replace: true });
    }
  }, [props.isAuthenticated]);

  //i am adding reference
  //s

  const onInputchange = (e) => {
    // props.inputHandler({ key: e.target.name, value: e.target.value });
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const onSignIn = (e) => {
    e.preventDefault();
    if (credentials.username != "" && credentials.password != "") {
      props.login(credentials);
    }
  };

  const ShowPasswordToggle = () => {
    if (showPassword == "password") {
      setShowPassword("text");
    } else {
      setShowPassword("password");
    }
  };

  //this is authenticated after login.

  return (
    <>
      <div className="full-outer-layer">
        <div className="shade-layer">
          <div className="login-wrap">
            <div className="login-html">
              <div className="tabs-outer-layer">
                <NavLink
                  to="login"
                  className={({ isActive }) => (isActive ? "active" : "tab ")}
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="sign-up"
                  className={({ isActive }) => (isActive ? "active" : "tab  ")}
                >
                  Sign Up
                </NavLink>
              </div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  const { loading, loginResponse, isAuthenticated } =
    state.authenticationHandler;

  return {
    loading: loading,
    loginResponse: loginResponse,
    isAuthenticated: isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => dispatch(LoginAuth(credentials)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainTabs);
