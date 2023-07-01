import React, { useEffect, useState } from "react";
import "./../../css/sidebar.css";
import Logo from "../../components/assets/logo.png";
import { Outlet } from "react-router-dom";
import { connect } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import { NavLink } from "react-router-dom";
import Select from "react-select";

import { logout, applyFilters, resetFilter } from "../../redux/actions";

function Sidebar(props) {
  const [submenuVisible, setSubmenuVisible] = useState([false, false, false]);
  const [authName, setAuthName] = useState("");
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [formsData, setFormsData] = useState({
    author_name: "",
    category_name: "",
    source_name: "",
    from: "",
    to: "",
  });

  const toggleSubmenu = (index) => {
    const updatedSubmenuVisible = [...submenuVisible];
    updatedSubmenuVisible[index] = !updatedSubmenuVisible[index];
    setSubmenuVisible(updatedSubmenuVisible);
  };

  useEffect(() => {
    const AuthInfo = JSON.parse(localStorage.getItem("AuthUser"));

    if (AuthInfo) {
      setAuthName(AuthInfo.name);
    }
  }, []);

  const applyFilter = () => {
    props.applyFilters(
      props.newsFeedList,
      formsData.source_name || null,
      formsData.category_name?.value || null,
      formsData.from || null,
      formsData.to || null
    );
  };

  const currentUser = localStorage.getItem("AuthUser");
  const user = JSON.parse(currentUser);

  const catagoryArr = localStorage.getItem("categories");
  const catagory = JSON.parse(catagoryArr);

  let categoryOptions;
  if (catagory) {
    categoryOptions = catagory.map(function (data) {
      return { value: data, label: data };
    });
  }

  const handleSelectors = (e, selectorName) => {
    let selectName = selectorName.name.toString();
    setFormsData({ ...formsData, [selectName]: e });
  };



  const toggleSideMenu = () => {
    setToggleSidebar(!toggleSidebar);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const theme = (theme) => ({
    ...theme,
    spacing: {
      ...theme.spacing,
      controlHeight: 40,
      baseUnit: 4,
    },
  });

  const menuPortal = {
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  };

  const onChangeInput = (e) => {
    setFormsData({ ...formsData, [e.target.name]: e.target.value });
  };

  const clearFields = () => {
    setFormsData({
      author_name: "",
      category_name: null,
      source_name: "",
      from: "",
      to: "",
    });
  };

  return (
    <div className="full-container-sidbear">
      {/* first vertical menu */}

      <div className="d-md-flex align-items-stretch">
        <div className={`sidebar ${toggleSidebar ? "show" : ""}`}>
          <ul className="list-unstyled sidebar-horizental">
            <li className="d-flex align-items-center justify-content-between">
              <a href="#">
                <img src={Logo} width="50px" height="50px" alt="Logo" />
              </a>
              <a href="#">
                <i className="fa fa-close"></i>
              </a>
            </li>
            <hr></hr>
            <li>
              <NavLink
                to="/home"
                className="d-flex align-items-center justify-content-center p-2"
              >
                <i className="fa fa-home"></i>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="preferences"
                className={({ isActive }) =>
                  isActive
                    ? "d-flex align-items-center justify-content-center p-2 icon-menu"
                    : "d-flex align-items-center justify-content-center p-2"
                }
              >
                <i className="fa fa-user" title="User Information"></i>
              </NavLink>
            </li>

            <Dropdown>
              <Dropdown.Toggle
                variant=""
                style={{ color: "rgb(16, 103, 195)", paddingLeft: "16px" }}
                id="dropdown-basic"
              >
                <i className="fas fa-sign-out-alt" title="Logout"></i>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    props.logout();
                  }}
                >
                  Logout {authName}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </ul>
        </div>

        {/* second vertical menu */}

        <nav
          id="sidebar"
          className={`scrollable sidebar  ${
            toggleSidebar ? "show" : ""
          } sidebarSecondMenu`}
        >
          <div className="p-4 pt-5">
            <ul className="list-unstyled components mb-5">
              <li>
                <a href="#">
                  <span className="fa fa-chevron-right mr-2"></span>{" "}
                </a>
              </li>

              <li>
                <a
                  href="#pageSubmenu1"
                  data-toggle="collapse"
                  aria-expanded={submenuVisible[0] ? "true" : "false"}
                  className="dropdown-toggle"
                  onClick={() => toggleSubmenu(0)}
                >
                  Filter by catagory
                </a>
                <ul
                  className={`collapse list-unstyled ${
                    submenuVisible[0] ? "show" : ""
                  }`}
                  id="pageSubmenu1"
                >
                  <Select
                    options={categoryOptions}
                    theme={theme}
                    isClearable={true}
                    placeholder="filter by catagory"
                    name="category_name"
                    menuPortalTarget={document.body}
                    styles={menuPortal}
                    onChange={(e, selector) => handleSelectors(e, selector)}
                    value={formsData.category_name}
                  />
                </ul>
              </li>
              <li>
                <a
                  href="#pageSubmenu2"
                  data-toggle="collapse"
                  aria-expanded="false"
                  className="dropdown-toggle"
                  onClick={() => toggleSubmenu(1)}
                >
                  Filter by source
                </a>
                <ul
                  className={`collapse list-unstyled ${
                    submenuVisible[1] ? "show" : ""
                  }`}
                  id="pageSubmenu2"
                >
                  <div className=" d-flex">
                    <span>
                      {" "}
                      <input
                        className=""
                        type="text"
                        name="source_name"
                        value={formsData.source_name || ""}
                        placeholder="Enter source name"
                        style={{
                          border: "1px solid black",
                          zIndex: "99",
                          width: "100%",
                        }}
                        onChange={onChangeInput}
                      />{" "}
                    </span>
                    {/* <span> <i className="fas fa-filter ml-3" style={{cursor:'pointer'}} onClick={filterSource} title="Click me to find source"></i></span> */}
                  </div>
                </ul>
              </li>
              <li>
                <a
                  href="#pageSubmenu3"
                  data-toggle="collapse"
                  aria-expanded="false"
                  className="dropdown-toggle"
                  onClick={() => toggleSubmenu(2)}
                >
                  Filter by date
                </a>
                <ul
                  className={`collapse list-unstyled ${
                    submenuVisible[2] ? "show" : ""
                  }`}
                  id="pageSubmenu3"
                >
                  <div className="text-dark">
                    From{" "}
                    <input
                      type="date"
                      value={formsData.from || ""}
                      onChange={onChangeInput}
                      name="from"
                      className="mb-2"
                    />
                  </div>{" "}
                  <div className="text-dark" style={{ marginLeft: "1px" }}>
                    {" "}
                    To{" "}
                    <input
                      className="toDate ml-3"
                      type="date"
                      name="to"
                      value={formsData.to || ""}
                      onChange={onChangeInput}
                    />
                  </div>
                </ul>
              </li>
            </ul>
            <div className="mb-5">
              <h5>Filter Actions</h5>
              <button className="btn btn-dark mb-2" onClick={applyFilter}>
                <i className="fas fa-filter"></i> Apply Filter
              </button>

              <button
                className="btn btn-info mb-2"
                onClick={() => props.resetFilter()}
              >
                <i className="fas fa-filter"></i> Reset Filter
              </button>
              <button className="btn btn-warning mb-2" onClick={clearFields}>
                <i className="fas fa-filter"></i> Clear Fields
              </button>
            </div>
          </div>
        </nav>

        <div id="content" className="main-content">
          {toggleSidebar ? (
            <div className="toggle-button" onClick={toggleSideMenu}>
              <i
                className="bi bi-x"
                style={{ color: "black", fontSize: "27px" }}
              ></i>
            </div>
          ) : (
            <div className="toggle-button" onClick={toggleSideMenu}>
              <i className="fa fa-bars"></i>
            </div>
          )}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  const { logoutResponse, isAuthenticated } = state.authenticationHandler;
  const { preDataLoadResponse } = state.preDataHandler;
  const { newsFeedList } = state.NewsFeedHandler;

  return {
    preDataLoadResponse: preDataLoadResponse,
    logoutResponse: logoutResponse,
    isAuthenticated: isAuthenticated,
    newsFeedList: newsFeedList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    applyFilters: (articles, source, category, startDate, endDate) =>
      dispatch(applyFilters(articles, source, category, startDate, endDate)),
    resetFilter: () => dispatch(resetFilter()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
