import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { LoginAuth, registerCustomer } from "../../../redux/actions";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import Swal from "sweetalert2";

function Login(props) {
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
  const [details, setDetails] = useState({
    username: "",
    password: "",
    confirm_password: "",
    email: "",
    contact: "",
  });
  const [passwordError, setPasswordError] = useState(false);
  const [signUpErrors, setSignUpErrors] = useState({ username: false });

  useEffect(() => {
    let errorsExists = props.customerRegistrationErrors?.error;
    if (errorsExists?.username) {
      errorsExists?.username
        ? setSignUpErrors({ username: true })
        : setSignUpErrors({ username: true });
    }
  }, [props.customerRegistrationErrors]);

  const onInputchange = (e) => {
    if (e.target.name == "username") {
      setSignUpErrors({ username: false });
    }
    // props.inputHandler({ key: e.target.name, value: e.target.value });
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const ShowPasswordToggle = () => {
    if (showPassword == "password") {
      setShowPassword("text");
    } else {
      setShowPassword("password");
    }
  };

  //this is authenticated after login.

  const registerCustomer = (e) => {
    e.preventDefault();
    if (details.password == details.confirm_password) {
      setPasswordError(false);

      props.registerCustomer(details);
    } else {
      setPasswordError(true);
      Swal.fire({
        position: "center",
        icon: "error",
        text: "The password and confirm password must match with each other.",
        showConfirmButton: false,
        timer: 1000,
        toast: true,
      });
    }
  };

  return (
    <>
      <div className="login-form  pb-0">
        <div className="sign">
          <form onSubmit={registerCustomer}>
            <div className="group">
              <label htmlFor="user" className="label">
                Username
              </label>
              <input
                type="text"
                className={signUpErrors.username ? "input invalid" : "input"}
                name="username"
                value={details.username}
                onChange={(e) => {
                  onInputchange(e);
                }}
                required
                autoComplete="off"
              />
              {signUpErrors.username ? (
                <p className="pb-0 error-text">The username has been taken!</p>
              ) : (
                ""
              )}
            </div>

            <div className="group">
              <label htmlFor="pass" className="label">
                Password
              </label>
              <input
                type="password"
                className={passwordError ? "input invalid" : "input"}
                autoComplete="off"
                name="password"
                value={details.password}
                onChange={(e) => {
                  onInputchange(e);
                }}
                required={true}
              />
            </div>

            <div className="group">
              <label htmlFor="pass" className="label">
                Confirm Password
              </label>
              <input
                type="password"
                className={passwordError ? "input invalid" : "input"}
                autoComplete="off"
                value={details.confirm_password}
                name="confirm_password"
                onChange={(e) => {
                  onInputchange(e);
                }}
                required={true}
              />
            </div>

            <div className="group">
              <label htmlFor="user" className="label">
                Email
              </label>
              <input
                type="email"
                className="input"
                name="email"
                value={details.email}
                onChange={(e) => {
                  onInputchange(e);
                }}
                required
              />
            </div>

            <div className="group">
              <input type="submit" className="button" value="Sign Up" />
            </div>
          </form>

          {props.loading ? (
            <div id="preloader">
              <div id="loader"></div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  const {
    loading,
    loginResponse,
    isAuthenticated,
    customerRegistrationErrors,
  } = state.authenticationHandler;

  return {
    loading: loading,
    loginResponse: loginResponse,
    isAuthenticated: isAuthenticated,
    customerRegistrationErrors: customerRegistrationErrors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => dispatch(LoginAuth(credentials)),
    registerCustomer: (registerationDetails) =>
      dispatch(registerCustomer(registerationDetails)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
