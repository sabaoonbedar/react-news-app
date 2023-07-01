import axios from "axios";
var CryptoJS = require("crypto-js");

// ---------------------------------------------------------------------------------------------------------
// All data which would be loaded before the application starts
// ---------------------------------------------------------------------------------------------------------

export const preDataLoad = () => {
  return (dispatch) => {
    dispatch(fetchPreDataStarted());

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
      .get(`${process.env.REACT_APP_API_ADDRESS}/preDataLoad`, axiosConfig)
      .then((response) => {
        if (response.data) {
          localStorage.setItem("preferences", JSON.stringify(response.data));

          dispatch(fetchPreDataSuccess(response.data));
        }
      })
      .catch((err) => {
        dispatch(fetchPreDataFailure(err.message));
      });
  };
};

const fetchPreDataStarted = () => ({
  type: "preData_started",
});

const fetchPreDataSuccess = (data) => ({
  type: "preData_success",
  payload: {
    ...data,
  },
});

const fetchPreDataFailure = (error) => ({
  type: "preData_failure",
  payload: {
    error,
  },
});
