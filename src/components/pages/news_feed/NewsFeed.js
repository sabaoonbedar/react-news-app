import React, { useEffect, useState } from "react";

// import PreDataLoader from "../elements/PreDataLoader";
import "../../../css/home.css";
import "../../../css/search.css";
import { connect } from "react-redux";
import {
  newsFeedFetcher,
  searchArticles,
  applyFilters,
  preDataLoad,
  logout,
  fetchFilteredArticles,
} from "./../../../redux/actions";
import moment from "moment";
import CustomPaginator from "../../elements/CustomPaginator";
import Loader from "./../../elements/Loader";

function NewsFeed(props) {
  const [searchQuery, setSearchQuery] = useState({ query: "" });

  useEffect(() => {
    const preferences = JSON.parse(localStorage.getItem("preferences") || "[]");
    if (
      preferences?.preferences &&
      typeof preferences?.preferences === "object" &&
      ((Array.isArray(preferences?.preferences.authors) &&
        preferences?.preferences.authors.length > 0) ||
        (Array.isArray(preferences?.preferences.categories) &&
          preferences?.preferences.categories.length > 0) ||
        (Array.isArray(preferences?.preferences.sources) &&
          preferences?.preferences.sources.length > 0))
    ) {
      props.fetchFilteredArticles(preferences.preferences);
    } else {
      props.newsFeedFetcher();
    }
  }, []);

  const onChangeInput = (e) => {
    setSearchQuery({ ...searchQuery, [e.target.name]: e.target.value });
  };

  const submitSearch = (e) => {
    e.preventDefault();
    props.searchArticles(searchQuery.query);
  };

  function truncateText(text, maxWords) {
    var words = text?.split(" ");

    if (words?.length > maxWords) {
      return words?.slice(0, maxWords).join(" ") + "...";
    }
    return text;
  }

  return (
    <>
      {/* <!-- ======= Hero Section ======= --> */}

      <section id="hero" className="hero">
        <div className="d-flex row p-2">
          <div className="search-container-main">
            <div className="row height d-flex justify-content-center align-items-center">
              <div className="col-md-6">
                <div className="search-container pt-4">
                  <form onSubmit={submitSearch} className="p-0">
                    <div className="form">
                      <i className="fa fa-search"></i>
                      <input
                        type="text"
                        className="form-control form-input"
                        autoComplete="off"
                        name="query"
                        placeholder="Search articles"
                        onChange={onChangeInput}
                        required
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row d-flex justify-content-between p-4 pt-5">
          <div className="row">
            <CustomPaginator
              data={
                props.filteredArticles?.articles?.length > 0
                  ? props.filteredArticles.articles
                  : props?.newsFeedList?.articles
              }
              pageSize={40}
              render={(currentPageArticles) =>
                props.loading ? (
                  <Loader />
                ) : (
                  currentPageArticles.map((items, index) => {
                    return (
                      <div className="col-md-12" key={index}>
                        <div className="row">
                          <div className="col">
                            {items.author ? (
                              <span className="badge badge-dark">
                                Author: {truncateText(items.author, 5)}
                              </span>
                            ) : (
                              <span className="badge badge-dark">
                                Anonymous
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="card mb-3 card-custom">
                          {/* <span className="bi bi-save save-icon" title="Save this news feed."></span> */}
                          <div className="row g-0">
                            <div className="col-md-4">
                              {items.urlToImage ? (
                                <img
                                  src={items.urlToImage}
                                  className="img-fluid rounded-start"
                                  alt="no image found"
                                />
                              ) : (
                                <img
                                  src={require("./../../assets/no-image.jpg")}
                                  className="img-fluid rounded-start"
                                  alt="no image found"
                                />
                              )}
                            </div>
                            <div className="col-md-8">
                              <div className="card-body">
                                <h5 className="card-title">{items.title}</h5>
                                <span className="badge badge-dark">
                                  {items.source}
                                </span>

                                <p className="card-text">
                                  {truncateText(items.description, 30)}
                                </p>
                                <div className="row">
                                  <div className="col">
                                    <p className="card-text">
                                      <small className="text-muted">
                                        {moment(items.publishedAt).fromNow()}
                                      </small>
                                    </p>
                                  </div>
                                  <div className="col">
                                    <a
                                      href={items.url}
                                      className="read-button"
                                      target="_blank"
                                    >
                                      Read More
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )
              }
            />
          </div>
        </div>
      </section>
    </>
  );
}

const mapStateToProps = (state) => {
  const { logoutResponse, isAuthenticated } = state.authenticationHandler;
  const { preDataLoadResponse } = state.preDataHandler;
  const { newsFeedList, currentPage, loading, filteredArticles } =
    state.NewsFeedHandler;

  return {
    preDataLoadResponse: preDataLoadResponse,
    logoutResponse: logoutResponse,
    isAuthenticated: isAuthenticated,
    newsFeedList: newsFeedList,
    currentPage: currentPage,
    loading: loading,
    filteredArticles: filteredArticles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    newsFeedFetcher: (preferences) => dispatch(newsFeedFetcher(preferences)),
    searchArticles: (query) => dispatch(searchArticles(query)),
    preDataLoad: () => dispatch(preDataLoad()),
    fetchFilteredArticles: (preferences) =>
      dispatch(fetchFilteredArticles(preferences)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);
