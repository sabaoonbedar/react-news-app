import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import HeroImage from "../assets/News.png";
import PreDataLoader from "../elements/PreDataLoader";
import {
  preDataLoad,
  logout,
  showHideCalcModal,
  registerUser,
} from "../../redux/actions";
import { useNavigate } from "react-router-dom";

import "../../css/home.css";

import { connect } from "react-redux";
function Guest(props) {
  const [showMenu, setShowMenu] = useState("nothing");
  const [crossIcon, setCrossIcon] = useState(
    "mobile-nav-toggle mobile-nav-hide d-none bi bi-x"
  );
  const [barsIcon, SetBarsIcon] = useState(
    "mobile-nav-toggle mobile-nav-show bi bi-list"
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (props.isAuthenticated) {
      navigate("/home", { replace: true });
    }
  }, []);

  const toggleMenu = () => {
    if (showMenu == "nothing") {
      setShowMenu("mobile-nav-active");
      SetBarsIcon("mobile-nav-toggle mobile-nav-show bi bi-list d-none");
      setCrossIcon("mobile-nav-toggle mobile-nav-hide bi bi-x");
    } else {
      setShowMenu("nothing");
      SetBarsIcon("mobile-nav-toggle mobile-nav-show bi bi-list");
      setCrossIcon("mobile-nav-toggle mobile-nav-hide d-none bi bi-x");
    }
  };

  return (
    <>
      {props.preLoading ? (
        <PreDataLoader />
      ) : (
        <div className={showMenu}>
          {/* <!-- ======= header section ======= --> */}

          <header id="header" className="header d-flex fixed-top">
            <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
              <a href="#" className="logo d-flex align-items-center">
                {/* <!-- Uncomment the line below if you also wish to use an image logo --> */}
                {/* <img src={require("../assets/logo-white-01.png")} alt=""/> */}
                {/* <h1>Logis</h1> */}
              </a>

              <i
                className={barsIcon}
                style={{ position: "absolute", right: "-80%", left: "0px" }}
                onClick={toggleMenu}
              ></i>
              <i
                className={crossIcon}
                style={{ position: "absolute", right: "-80%", left: "0px" }}
                onClick={toggleMenu}
              ></i>

              <nav id="navbar" className="navbar">
                <ul>
                  <li>
                    <Link
                      to="/account/login"
                      className="get-a-quote"
                      href="get-a-quote.html"
                    >
                      Join Us
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </header>

          {/* <!-- ======= Hero Section ======= --> */}
          <section id="hero" className="hero" style={{ minHeight: "100vh" }}>
            <div className="container custom-container">
              <div className="row gy-4 d-flex justify-content-between ">
                <div className="col-lg-7 order-2 order-lg-1 d-flex flex-column justify-content-center">
                  <h2>Your Trusty News Aggregator</h2>
                  <p>
                    We are here to keep you updated with the latest news and
                    information. Our mission is to deliver timely and relevant
                    content that matters to you. Whether it's breaking news,
                    in-depth analysis, or trending stories, we strive to provide
                    a comprehensive news experience that meets your needs. With
                    our news aggregator, you can stay informed about a wide
                    range of topics, from politics and business to technology,
                    entertainment, and more. We carefully curate articles from
                    trusted sources, ensuring that you have access to diverse
                    perspectives and reliable information.
                  </p>

                  {/* loader here */}
                  {props.loading ? (
                    <div id="preloader">
                      <div id="loader"></div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="col-lg-4 order-1 order-lg-2 hero-img">
                  <img
                    src={HeroImage}
                    className="img-fluid mb-3 mb-lg-0"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  const { preLoading } = state.preDataHandler;
  const { isAuthenticated } = state.authenticationHandler;

  return {
    isAuthenticated: isAuthenticated,
    preLoading: preLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDataBeforeLoadingPage: () => dispatch(preDataLoad()),
    logout: () => dispatch(logout()),

    registerUser: (registrationDetails) =>
      dispatch(registerUser(registrationDetails)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Guest);
