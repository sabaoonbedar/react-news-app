import axios from "axios";
import Swal from "sweetalert2";
import History from "../../routes/CustomHistory";
var CryptoJS = require("crypto-js");

// -------------------------------------------------------------------------
// Login Action
// -------------------------------------------------------------------------
export const LoginAuth = (credentials) => {
  return (dispatch) => {
    dispatch(loginStarted());

    axios
      .post(`${process.env.REACT_APP_API_ADDRESS}/login`, credentials)
      .then((response) => {
      

        if (response.data.success_message) {
          let tokenFrom = response.data.token;
          var cipherText = CryptoJS.AES.encrypt(
            JSON.stringify(tokenFrom),
            "news@2023"
          ).toString();


          localStorage.setItem("fkey", JSON.stringify(cipherText));

          let userName = response.data.user.username;
          let name = response.data.user.name;

          let axiosConfig = {
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              Accept: "application/json",
              Authorization: `Bearer ${tokenFrom}`,
            },
          };

          axios
            .get(
              `${process.env.REACT_APP_API_ADDRESS}/loginCheck`,
              axiosConfig
            )
            .then((res) => {

              localStorage.setItem(
                "AuthUser",
                JSON.stringify({ name: name, userName: userName })
              );

              dispatch(loginSuccess(res.data));

              History.replace("/home");
            })
            .catch((err) => {
              dispatch(loginFailure(err.message));
            });
        } else if (response.data.error_message) {
          dispatch({ type: "login_error" });

          Swal.fire({
            icon: "info",
            title: "Oops...",
            text: response.data.error_message,
            timer: 2000,
            timerProgressBar: true,
            toast: true,
            confirmButtonColor: "#0a4b85",
            background: "ebeced",
          });
        }
      });
  };
};

const loginStarted = () => ({
  type: "login_started",
});

const loginSuccess = (data) => ({
  type: "login_success",
  payload: {
    ...data,
  },
});

const loginFailure = (error) => ({
  type: "login_failure",
  payload: {
    error,
  },
});

// -------------------------------------------------------------------------
// Logout Action - the authenticated user would be logout here
// -------------------------------------------------------------------------

export const logout = () => {
  return (dispatch) => {
    dispatch(logoutStarted());

    const cipherToken = JSON.parse(localStorage.getItem("fkey"));

    var bytes = CryptoJS.AES.decrypt(cipherToken, "news@2023");
    var decryptedToken = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));


    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
        Authorization: `Bearer ${decryptedToken}`,
      },
    };

    axios
      .get(`${process.env.REACT_APP_API_ADDRESS}/logout`, axiosConfig)
      .then((response) => {
        if (response.data.success_message) {

          localStorage.removeItem("fkey");
          localStorage.removeItem("AuthUser");

          dispatch(logoutSuccess(response.data));

          History.replace("/");
        } else if (response.data.error_message) {
          dispatch({ type: "logout_error" });
        }
      })
      .catch((err) => {
        dispatch(logoutFailure(err.message));
      });
  };
};

const logoutStarted = () => ({
  type: "logout_started",
});

const logoutSuccess = (data) => ({
  type: "logout_success",
  payload: {
    ...data,
  },
});

const logoutFailure = (error) => ({
  type: "logout_failure",
  payload: {
    error,
  },
});

// -------------------------------------------------------------------------
// user registration Action by adminstration
// -------------------------------------------------------------------------

export const registerUser = (
  name,
  username,
  email,
  role,
  contact,
  password,
  confirmPassword
) => {
  return (dispatch) => {
    dispatch(registerUserStarted());

    const cipherToken = JSON.parse(localStorage.getItem("fkey"));

    var bytes = CryptoJS.AES.decrypt(cipherToken, "news@2023");
    var decryptedToken = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));


    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
        Authorization: `Bearer ${decryptedToken}`,
      },
    };

    let userData = {
      name: name,
      username: username,
      email: email,
      role: role,
      password: password,
      confirm_password: confirmPassword,
      contact: contact,
    };

    axios
      .post(
        `${process.env.REACT_APP_API_ADDRESS}/registerUser`,
        userData,
        axiosConfig
      )
      .then((response) => {
        if (response.data.success_message) {
          dispatch(registerUserSuccess(response.data));

          Swal.fire({
            position: "top-end",
            icon: "success",
            text: "The user has been succesfully registered",
            showConfirmButton: false,
            timer: 800,
            toast: true,
          });
        }
      })
      .catch((err) => {
        dispatch(registerUserFailure(err.response.data.errors));
      });
  };
};

const registerUserStarted = () => ({
  type: "registerUser_started",
});

const registerUserSuccess = (data) => ({
  type: "registerUser_success",
  payload: {
    ...data,
  },
});

const registerUserFailure = (error) => ({
  type: "registerUser_failure",
  payload: {
    error,
  },
});

// -------------------------------------------------------------------------
// for opening registration model
// -------------------------------------------------------------------------
export const showRegisterModal = () => {
  return {
    type: "showModalAction",
  };
};
export const hideRegisterModal = () => {
  return {
    type: "hideModalAction",
  };
};

// -------------------------------------------------------------------------
// customer registration
// -------------------------------------------------------------------------

export const registerCustomer = (details) => {
  return (dispatch) => {
    dispatch(registerCustomerStarted());

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
      },
    };

    let userData = {
      name: details.username,
      username: details.username,
      email: details.email,
      //  role:details.role,
      password: details.password,
      confirm_password: details.confirm_password,
      contact: details.contact,
    };

    axios
      .post(
        `${process.env.REACT_APP_API_ADDRESS}/registerCustomer`,
        userData,
        axiosConfig
      )
      .then((response) => {
        if (response.data.success_message) {
          dispatch(registerCustomerSuccess(response.data));
          History.replace("/account/login");

          Swal.fire({
            position: "top-end",
            icon: "success",
            text: "Congrates, you are successfully registered",
            showConfirmButton: false,
            timer: 800,
            toast: true,
          });
        }
      })
      .catch((err) => {
        dispatch(registerCustomerFailure(err.response.data.errors));
      });
  };
};

const registerCustomerStarted = () => ({
  type: "registerCustomer_started",
});

const registerCustomerSuccess = (data) => ({
  type: "registerCustomer_success",
  payload: {
    ...data,
  },
});

const registerCustomerFailure = (error) => ({
  type: "registerCustomer_failure",
  payload: {
    error,
  },
});
