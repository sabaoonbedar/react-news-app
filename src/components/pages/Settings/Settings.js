import React, { useEffect, useState } from "react";
import {
  showHideAuthorsModal,
  getAuthors,
  addAuthorToPreferences,
  deleteAuthor,
  showHideCatagoryModal,
  showHideSourceModal,
  getCatagory,
  addCatagoryToPreferences,
  deleteCatagory,
  getSources,
  addSourceToPreferences,
  deleteSource,
  AuthorsToCache,
  logout,
  handleSelectors,
  preDataLoad,
} from "../../../redux/actions";
import { connect } from "react-redux";
import CustomModal from "../../elements/ModalElement";
import Loader from "../../elements/Loader";
import Select from "react-select";
import Swal from "sweetalert2";

function Settings(props) {
  const [switchToInput, setSwitchToInput] = useState(false);
  const [error, setError] = useState({ errorMessage: "" });
  const [formsData, setFormsData] = useState({
    author_name: "",
    author_name_input: "",
    category_name: "",
    source_name: "",
  });

  useEffect(() => {
    props.getAuthors();
  }, [props.authorAdded, props.authorDeleted]);

  useEffect(() => {
    props.getCatagory();
  }, [props.catagoryAdded, props.catagoryDeleted]);

  useEffect(() => {
    props.getSources();
  }, [props.sourceAdded, props.sourceDeleted]);

  const toggleSelectToInput = (e) => {
    setSwitchToInput(!switchToInput);
  };
  const onChangeInput = (e) => {
    setFormsData({ ...formsData, [e.target.name]: e.target.value });
  };

  const menuPortal = {
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  };

  const theme = (theme) => ({
    ...theme,
    spacing: {
      ...theme.spacing,
      controlHeight: 40,
      baseUnit: 4,
    },
  });

  const authorsString = localStorage.getItem("authors");
  const authors = JSON.parse(authorsString);

  const currentUser = localStorage.getItem("AuthUser");
  const user = JSON.parse(currentUser);

  const catagoryArr = localStorage.getItem("categories");
  const catagory = JSON.parse(catagoryArr);

  let authorsOptions;
  if (authors) {
    authorsOptions = authors.map(function (data) {
      return { value: data, label: data };
    });
  }

  let categoryOptions;
  if (catagory) {
    categoryOptions = catagory.map(function (data) {
      return { value: data, label: data };
    });
  }

  const toggleAuthorModal = () => {
    props.showHideAuthorsModal();
  };

  const toggleCatagoryModal = () => {
    props.showHideCatagoryModal();
  };
  const toggleSourceModal = () => {
    props.showHideSourceModal();
  };

  const handleSelectors = (e, selectorName) => {
    // console.log(autoRegistrationData)
    let selectName = selectorName.name.toString();
    setFormsData({ ...formsData, [selectName]: e });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    props.addAuthorToPreferences(formsData);
  };

  const formSubmitCatagory = (e) => {
    e.preventDefault();
    props.addCatagoryToPreferences(formsData);
  };

  const formSubmitSource = (e) => {
    e.preventDefault();
    props.addSourceToPreferences(formsData);
  };

  const deleteAuthorPreference = (e, id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete the author.",
      icon: "warning",
      width: 400,
      showCancelButton: true,
      timer: 4000,
      timerProgressBar: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        props.deleteAuthor(id);
      }
    });
  };

  const deleteCatagoryPreference = (e, id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete the catagory.",
      icon: "warning",
      width: 400,
      showCancelButton: true,
      timer: 4000,
      timerProgressBar: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        props.deleteCatagory(id);
      }
    });
  };

  const deleteSourcePreference = (e, id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete the source.",
      icon: "warning",
      width: 400,
      showCancelButton: true,
      timer: 4000,
      timerProgressBar: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        props.deleteSource(id);
      }
    });
  };

  return (
    <div>
      <section id="hero" className="hero">
        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-12">
              <div className="card mb-5">
                <div className="d-flex justify-content-end ">
                  <button
                    className="btn btn-light"
                    onClick={() => props.logout()}
                  >
                    Logout
                  </button>
                </div>
                <div className="card-body text-center">
                  <div>
                    <img
                      src={require("../../assets/male.jpg")}
                      className="rounded-circle"
                      width="150px"
                      height="150px"
                      alt="users image"
                    />
                  </div>
                  <div className="my-3 badge badge-dark">Name: {user.name}</div>
                  <div>
                    <h5 className=" mb-4 badge badge-dark">
                      Username: {user.userName}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className=" p-0">
                <div className="d-flex justify-content-center align-items-center">
                  <div className="dots"></div>

                  <span className="btn btn-dark">Choose Your Preferences</span>

                  <div className="dots"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-4 mb-3">
              <div className="card p-0">
                <div className="card-title">
                  <div className="d-flex justify-content-center align-items-center">
                    <span className="badge badge-dark m-2">Authors</span>
                    <span
                      className="button-add mt-2"
                      onClick={toggleAuthorModal}
                    >
                      <i className="fa fa-plus mr-1"></i>Add
                    </span>
                  </div>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="tagcloud">
                      {props.loading ? (
                        <Loader />
                      ) : (
                        props.authorsList?.data.map((items, index) => {
                          return (
                            <span key={index}>
                              <a href="#" className="tag-cloud-link pr-4">
                                {items.author_name}{" "}
                                <i
                                  className="fa fa-trash cross-icon"
                                  onClick={(e) =>
                                    deleteAuthorPreference(e, items.id)
                                  }
                                ></i>
                              </a>
                            </span>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card p-0">
                <div className="card-title">
                  <div className="d-flex justify-content-center align-items-center">
                    <span className="badge badge-dark mt-2">Catagories</span>{" "}
                    <span
                      onClick={toggleCatagoryModal}
                      className="button-add mt-2"
                    >
                      <i className="fa fa-plus mr-1"></i> Add
                    </span>
                  </div>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="tagcloud">
                      {props.catLoading ? (
                        <Loader />
                      ) : (
                        props.catagoryList?.data.map((items, index) => {
                          return (
                            <span key={index}>
                              <a href="#" className="tag-cloud-link pr-4">
                                {items.category_name}{" "}
                                <i
                                  className="fa fa-trash cross-icon"
                                  onClick={(e) =>
                                    deleteCatagoryPreference(e, items.id)
                                  }
                                ></i>
                              </a>
                            </span>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card p-0">
                <div className="card-title">
                  <div className="d-flex justify-content-center align-items-center">
                    <span className="badge badge-dark m-2">Sources</span>{" "}
                    <span
                      className="button-add mt-2"
                      onClick={toggleSourceModal}
                    >
                      <i className="fa fa-plus"></i> Add
                    </span>
                  </div>
                </div>

                <div className="card-body">
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="tagcloud">
                      {props.srcLoading ? (
                        <Loader />
                      ) : (
                        props.sourceList?.data.map((items, index) => {
                          return (
                            <span key={index}>
                              <a href="#" className="tag-cloud-link pr-4">
                                {items.source_name}{" "}
                                <i
                                  className="fa fa-trash cross-icon"
                                  onClick={(e) =>
                                    deleteSourcePreference(e, items.id)
                                  }
                                ></i>
                              </a>
                            </span>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CustomModal
          show={props.authorModalToggle}
          hide={() => {
            props.showHideAuthorsModal();
          }}
          title="Choose your favorite authors"
        >
          <div>
            <form onSubmit={formSubmit}>
              <div className="row">
                <div className="col-md-12">
                  {switchToInput ? (
                    <input
                      className="form-control"
                      placeholder="Author name"
                      required
                      name="author_name_input"
                      value={formsData?.author_name_input || ""}
                      onChange={onChangeInput}
                    />
                  ) : (
                    <Select
                      options={authorsOptions}
                      theme={theme}
                      isClearable={true}
                      placeholder="Search author"
                      name="author_name"
                      menuPortalTarget={document.body}
                      styles={menuPortal}
                      // setValue={autoRegistrationData.autoType}
                      onChange={(e, selector) => handleSelectors(e, selector)}
                    />
                  )}
                </div>

                <div className="error-text">
                  {props.authorAddedFailure?.error?.author_name || ""}
                </div>
              </div>

              <div className="d-flex justify-content-between align-content-between">
                <button className="btn btn-dark mt-3">
                  <span>Submit</span>
                </button>
                <span
                  className="btn btn-dark mt-3"
                  onClick={() => toggleSelectToInput()}
                >
                  <span style={{ color: "white" }}>
                    {switchToInput
                      ? "Select from Selection"
                      : "Type Author Name"}
                  </span>
                </span>
              </div>
            </form>
          </div>
        </CustomModal>

        {/* catagory model */}
        <CustomModal
          show={props.catagoryModalToggle}
          hide={() => {
            props.showHideCatagoryModal();
          }}
          title="Choose your favorite catagory"
        >
          <div>
            <form onSubmit={formSubmitCatagory}>
              <div className="row">
                <div className="col-md-12">
                  <Select
                    options={categoryOptions}
                    theme={theme}
                    isClearable={true}
                    placeholder="Search catagory"
                    name="category_name"
                    menuPortalTarget={document.body}
                    styles={menuPortal}
                    // setValue={autoRegistrationData.autoType}
                    onChange={(e, selector) => handleSelectors(e, selector)}
                  />
                </div>

                <div className="error-text">
                  {props.catagoryAddedFailure?.error?.category_name || ""}
                </div>
              </div>

              <div className="d-flex justify-content-between align-content-between">
                <button className="btn btn-dark mt-3">
                  <span>Submit</span>
                </button>
              </div>
            </form>
          </div>
        </CustomModal>

        {/* source model */}
        <CustomModal
          show={props.sourceModalToggle}
          hide={() => {
            props.showHideSourceModal();
          }}
          title="Add your favorite sources"
        >
          <div>
            <form onSubmit={formSubmitSource}>
              <div className="row">
                <div className="col-md-12">
                  <input
                    className="form-control"
                    name="source_name"
                    value={formsData.source_name}
                    onChange={onChangeInput}
                  />
                </div>

                <div className="error-text">
                  {props.sourceAddedFailure?.error?.source_name || ""}
                </div>
              </div>

              <div className="d-flex justify-content-between align-content-between">
                <button className="btn btn-dark mt-3">
                  <span>Submit</span>
                </button>
              </div>
            </form>
          </div>
        </CustomModal>
      </section>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { preLoading } = state.preDataHandler;
  const { isAuthenticated } = state.authenticationHandler;
  const {
    authorModalToggle,
    authorsList,
    loading,
    authorAdded,
    authorAddedFailure,
    authorDeleted,
    catagoryModalToggle,
    sourceModalToggle,
    catagoryList,
    catagoryAdded,
    catagoryAddedFailure,
    catagoryDeleted,
    catLoading,
    srcLoading,
    sourceList,
    sourceAdded,
    sourceAddedFailure,
    sourceDeleted,
  } = state.SettingsHandler;

  return {
    isAuthenticated: isAuthenticated,
    authorModalToggle: authorModalToggle,
    authorsList: authorsList,
    loading: loading,
    authorAdded: authorAdded,
    authorAddedFailure: authorAddedFailure,
    preLoading: preLoading,
    authorDeleted: authorDeleted,
    catagoryModalToggle: catagoryModalToggle,
    sourceModalToggle: sourceModalToggle,
    catagoryList: catagoryList,
    catagoryAdded: catagoryAdded,
    catagoryAddedFailure: catagoryAddedFailure,
    catagoryDeleted: catagoryDeleted,
    catLoading: catLoading,
    srcLoading: srcLoading,
    sourceList: sourceList,
    sourceAdded: sourceAdded,
    sourceAddedFailure: sourceAddedFailure,
    sourceDeleted: sourceDeleted,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showHideAuthorsModal: () => dispatch(showHideAuthorsModal()),
    getAuthors: () => dispatch(getAuthors()),
    addAuthorToPreferences: (formData) =>
      dispatch(addAuthorToPreferences(formData)),
    deleteAuthor: (id) => dispatch(deleteAuthor(id)),
    showHideCatagoryModal: () => dispatch(showHideCatagoryModal()),
    showHideSourceModal: () => dispatch(showHideSourceModal()),
    getCatagory: () => dispatch(getCatagory()),
    addCatagoryToPreferences: (formData) =>
      dispatch(addCatagoryToPreferences(formData)),
    deleteCatagory: (id) => dispatch(deleteCatagory(id)),
    getSources: () => dispatch(getSources()),
    addSourceToPreferences: (formData) =>
      dispatch(addSourceToPreferences(formData)),
    deleteSource: (id) => dispatch(deleteSource(id)),
    AuthorsToCache: () => dispatch(AuthorsToCache),
    logout: () => dispatch(logout()),
    handleSelectors: (selectorName, value) =>
      dispatch(handleSelectors(selectorName, value)),
    preDataLoad: () => dispatch(preDataLoad()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
