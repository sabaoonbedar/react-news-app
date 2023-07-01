import React, { useState, useEffect } from "react";

// import '../../css/cart.css'

import { connect } from "react-redux";
import { logout } from "../../redux/actions";

import _ from "lodash";

function HeaderMenu(props) {
  const [authName, setAuthName] = useState("not defined");
  const [showMenu, setShowMenu] = useState("nothing");

  useEffect(() => {
    const AuthInfo = JSON.parse(localStorage.getItem("AuthUser"));

    if (AuthInfo) {
      setAuthName(AuthInfo.name);
    }
  }, []);

  return (
    <div className={showMenu}>
      {/* <!-- ======= header section ======= --> */}
      <header
        id="header"
        className="header d-flex align-items-center fixed-top"
      ></header>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { logoutResponse, isAuthenticated } = state.authenticationHandler;
  const { preDataLoadResponse } = state.preDataHandler;
  const { currentPage, catagoryValue } = state.AutosHandler;

  return {
    preDataLoadResponse: preDataLoadResponse,
    logoutResponse: logoutResponse,
    isAuthenticated: isAuthenticated,
    currentPage: currentPage,
    catagoryValuesFetched: catagoryValue,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMenu);
