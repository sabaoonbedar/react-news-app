import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { LoginAuth } from "../../../redux/actions";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

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
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (props.isAuthenticated) {
      navigate("/home", { replace: true });
    }
  }, [props.isAuthenticated]);

  const toSignup = () => {
    navigate("/account/sign-up");
  };

  const onInputchange = (e) => {
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

  return (
    <>
      <div className="login-form">
        <div className="sign">
          <form
            onSubmit={(e) => {
              onSignIn(e);
            }}
          >
            <div className="group">
              <label for="user" className="label">
                Username
              </label>
              <input
                id="user"
                type="text"
                className="input"
                name="username"
                value={props.username}
                onChange={(e) => {
                  onInputchange(e);
                }}
                required
              />
            </div>

            <div className="group">
              <label for="pass" className="label">
                Password
              </label>
              <input
                id="pass"
                type="password"
                className="input"
                data-type="password"
                autoComplete="true"
                name="password"
                onChange={(e) => {
                  onInputchange(e);
                }}
                required={true}
              />
            </div>

            <div className="group">
              <input type="submit" className="button" value="Sign In" />
            </div>
            <div className="hr"></div>

            <div className="foot-lnk">
              <label for="tab-2" className="bottom-text" onClick={toSignup}>
                Don't have account?
              </label>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
