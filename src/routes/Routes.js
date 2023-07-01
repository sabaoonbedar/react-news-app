import Protected from "./ProtectedRoute";
import Login from "../components/pages/auth/Login";

import Guest from "../components/pages/Guest";
import Home from "../components/pages/Home";
import NewsFeed from "../components/pages/news_feed/NewsFeed";
import AuthMainTabs from "../components/pages/auth/MainTabs";
import SignUp from "../components/pages/auth/SignUp";
import Settings from "../components/pages/Settings/Settings";

// import { useNavigate } from 'react-router-dom';
import React, { Fragment } from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";

function AppRoutes(props) {
  // ================================================================
  // permissions functions
  // ================================================================

  const registerOptionalParamRoute = (optionalParams, element) => {
    if (optionalParams.length === 0) return <Fragment />;

    const param = optionalParams[0];
    optionalParams.splice(0, 1);

    return (
      <Route path={param} element={element}>
        {registerOptionalParamRoute(optionalParams, element)}
      </Route>
    );
  };
//for optional params
  const registerOptionalParams = (path, element) => {
    const params = path.split("/");
    let basePath = "";
    let optionalParams = [];

    for (let i = 0; i < params.length; i++) {
      if (params[i] === "") continue;

      if (!params[i].includes("?")) basePath += `${params[i]}/`;
      else optionalParams.push(params[i].substr(0, params[i].length - 1));
    }

    return (
      <Route path={basePath} key={basePath} element={element}>
        {registerOptionalParamRoute(optionalParams, element)}
      </Route>
    );
  };

  return (
    <Routes>
      {/*
                       ---------------------------------------------------------
                        for auth purposes  
                      ---------------------------------------------------------- 
                      */}

      <Route path={"/account"} element={<Navigate to="/account/login" />} />

      <Route
        path={"/"}
        replace
        element={
          props.isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/" />
        }
      />

      <Route
        path="*"
        replace
        element={
          props.isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/" />
        }
      />

      <Route path="/" index element={<Guest />} />

      <Route path="/account" element={<AuthMainTabs />}>
        <Route index path="login" element={<Login />} />

        <Route path="sign-up" element={<SignUp />} />
      </Route>

      <Route element={<Protected />}>
        <Route path="/home" element={<Home />}>
          <Route index element={<NewsFeed />} />
          <Route path="preferences" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  );
}

const mapStateToProps = (state) => {
  const { isAuthenticated } = state.authenticationHandler;
  const { preDataLoadResponse } = state.preDataHandler;

  return {
    preDataLoadResponse: preDataLoadResponse,
    isAuthenticated: isAuthenticated,
  };
};

export default connect(mapStateToProps)(AppRoutes);
