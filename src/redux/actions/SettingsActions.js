import axios from "axios";
import Swal from "sweetalert2";

var CryptoJS = require("crypto-js");

export const showHideAuthorsModal = () => {
  return {
    type: "toggleAuthorsModal",
  };
};

export const showHideCatagoryModal = () => {
  return {
    type: "toggleCatagoryModal",
  };
};

export const showHideSourceModal = () => {
  return {
    type: "toggleSourceModal",
  };
};

// ---------------------------------------------------------------------------------------------------------
// get authors list from laravel api
// ---------------------------------------------------------------------------------------------------------

export const getAuthors = () => {
  return (dispatch) => {
    dispatch(authorFetchStarted());

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
      .get(
        `${process.env.REACT_APP_API_ADDRESS}/authorsPreferences`,
        axiosConfig
      )
      .then((response) => {
        if (response.data.success_message) {
          dispatch(authorFetchSuccess(response.data));
        }
      })
      .catch((err) => {
        dispatch(authorFetchFailure(err.response.data.errors));
      });
  };
};

const authorFetchStarted = () => ({
  type: "authorsFetch_started",
});

const authorFetchSuccess = (data) => ({
  type: "authorsFetch_success",
  payload: {
    ...data,
  },
});

const authorFetchFailure = (error) => ({
  type: "authorsFetch_failure",
  payload: {
    error,
  },
});

// ---------------------------------------------------------------------------------------------------------
// Add the author to the preferences list.
// ---------------------------------------------------------------------------------------------------------

export const addAuthorToPreferences = (formData) => {
  return (dispatch) => {
    dispatch(authorAdditionStarted());

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

    const authorData = new FormData();
    if (formData.author_name_input) {
      authorData.append("author_name", formData.author_name_input);
    } else {
      authorData.append("author_name", formData.author_name.value);
    }

    axios
      .post(
        `${process.env.REACT_APP_API_ADDRESS}/authorsPreferences`,
        authorData,
        axiosConfig
      )
      .then((response) => {
        if (response.data.success_message) {
          dispatch(authorAdditionSuccess(response.data));
        }
      })
      .catch((err) => {
        dispatch(authorAdditionFailure(err.response.data.errors));
      });
  };
};

const authorAdditionStarted = () => ({
  type: "addingAuthor_started",
});

const authorAdditionSuccess = (data) => ({
  type: "addingAuthor_success",
  payload: {
    ...data,
  },
});

const authorAdditionFailure = (error) => ({
  type: "addingAuthor_failure",
  payload: {
    error,
  },
});

// ---------------------------------------------------------------------------------------------------------
// delete News list
// ---------------------------------------------------------------------------------------------------------

export const deleteAuthor = (id) => {
  return (dispatch) => {
    dispatch(deleteAuthorStarted());

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
      .delete(
        `${process.env.REACT_APP_API_ADDRESS}/authorsPreferences/` + id,
        axiosConfig
      )
      .then((response) => {
        if (response.data.success_message) {
          dispatch(deleteAuthorSuccess(response.data));

          Swal.fire({
            position: "top-end",
            icon: "success",
            text: "The author has been successfully deleted ! ",
            showConfirmButton: false,
            timer: 800,
            toast: true,
          });
        }
      })
      .catch((err) => {
        dispatch(deleteAuthorFailure(err.message));
      });
  };
};

const deleteAuthorStarted = () => ({
  type: "authorDeletion_started",
});

const deleteAuthorSuccess = (data) => ({
  type: "authorDeletion_success",
  payload: {
    ...data,
  },
});

const deleteAuthorFailure = (error) => ({
  type: "authorDeletion_failure",
  payload: {
    error,
  },
});

// ---------------------------------------------------------------------------------------------------------
// get catagories list from laravel api
// ---------------------------------------------------------------------------------------------------------

export const getCatagory = () => {
  return (dispatch) => {
    dispatch(catagoryFetchStarted());

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
      .get(
        `${process.env.REACT_APP_API_ADDRESS}/catagoryPreferences`,
        axiosConfig
      )
      .then((response) => {
        if (response.data.success_message) {
          dispatch(catagoryFetchSuccess(response.data));
        }
      })
      .catch((err) => {
        dispatch(catagoryFetchFailure(err.response.data.errors));
      });
  };
};

const catagoryFetchStarted = () => ({
  type: "catagoryFetch_started",
});

const catagoryFetchSuccess = (data) => ({
  type: "catagoryFetch_success",
  payload: {
    ...data,
  },
});

const catagoryFetchFailure = (error) => ({
  type: "catagoryFetch_failure",
  payload: {
    error,
  },
});

// ---------------------------------------------------------------------------------------------------------
// Add the catagory to the preferences list.
// ---------------------------------------------------------------------------------------------------------

export const addCatagoryToPreferences = (formData) => {
  return (dispatch) => {
    dispatch(catagoryAdditionStarted());

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

    const catagoryData = new FormData();
    catagoryData.append("category_name", formData.category_name.value);

    axios
      .post(
        `${process.env.REACT_APP_API_ADDRESS}/catagoryPreferences`,
        catagoryData,
        axiosConfig
      )
      .then((response) => {
        if (response.data.success_message) {
          dispatch(catagoryAdditionSuccess(response.data));
        }
      })
      .catch((err) => {
        dispatch(catagoryAdditionFailure(err.response.data.errors));
      });
  };
};

const catagoryAdditionStarted = () => ({
  type: "addingCatagory_started",
});

const catagoryAdditionSuccess = (data) => ({
  type: "addingCatagory_success",
  payload: {
    ...data,
  },
});

const catagoryAdditionFailure = (error) => ({
  type: "addingCatagory_failure",
  payload: {
    error,
  },
});

// ---------------------------------------------------------------------------------------------------------
// delete News list
// ---------------------------------------------------------------------------------------------------------

export const deleteCatagory = (id) => {
  return (dispatch) => {
    dispatch(deleteCatagorytarted());

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
      .delete(
        `${process.env.REACT_APP_API_ADDRESS}/catagoryPreferences/` + id,
        axiosConfig
      )
      .then((response) => {
        if (response.data.success_message) {
          dispatch(deleteCatagorySuccess(response.data));

          Swal.fire({
            position: "top-end",
            icon: "success",
            text: "The catagory has been successfully deleted ! ",
            showConfirmButton: false,
            timer: 800,
            toast: true,
          });
        }
      })
      .catch((err) => {
        dispatch(deleteCatagoryFailure(err.message));
      });
  };
};

const deleteCatagorytarted = () => ({
  type: "catagoryDeletion_started",
});

const deleteCatagorySuccess = (data) => ({
  type: "catagoryDeletion_success",
  payload: {
    ...data,
  },
});

const deleteCatagoryFailure = (error) => ({
  type: "catagoryDeletion_failure",
  payload: {
    error,
  },
});

// ---------------------------------------------------------------------------------------------------------
// get source list from laravel api
// ---------------------------------------------------------------------------------------------------------

export const getSources = () => {
  return (dispatch) => {
    dispatch(sourceFetchStarted());

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
      .get(
        `${process.env.REACT_APP_API_ADDRESS}/sourcePreferences`,
        axiosConfig
      )
      .then((response) => {
        if (response.data.success_message) {
          dispatch(sourceFetchSuccess(response.data));
        }
      })
      .catch((err) => {
        dispatch(sourceFetchFailure(err.response.data.errors));
      });
  };
};

const sourceFetchStarted = () => ({
  type: "sourceFetch_started",
});

const sourceFetchSuccess = (data) => ({
  type: "sourceFetch_success",
  payload: {
    ...data,
  },
});

const sourceFetchFailure = (error) => ({
  type: "sourceFetch_failure",
  payload: {
    error,
  },
});

// ---------------------------------------------------------------------------------------------------------
// Add the source to the preferences list.
// ---------------------------------------------------------------------------------------------------------

export const addSourceToPreferences = (formData) => {
  return (dispatch) => {
    dispatch(sourceAdditionStarted());

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

    const catagoryData = new FormData();
    catagoryData.append("source_name", formData.source_name);

    axios
      .post(
        `${process.env.REACT_APP_API_ADDRESS}/sourcePreferences`,
        catagoryData,
        axiosConfig
      )
      .then((response) => {
        if (response.data.success_message) {
          dispatch(sourceAdditionSuccess(response.data));
        }
      })
      .catch((err) => {
        dispatch(sourceAdditionFailure(err.response.data.errors));
      });
  };
};

const sourceAdditionStarted = () => ({
  type: "addingSource_started",
});

const sourceAdditionSuccess = (data) => ({
  type: "addingSource_success",
  payload: {
    ...data,
  },
});

const sourceAdditionFailure = (error) => ({
  type: "addingSource_failure",
  payload: {
    error,
  },
});

// ---------------------------------------------------------------------------------------------------------
// delete source list
// ---------------------------------------------------------------------------------------------------------

export const deleteSource = (id) => {
  return (dispatch) => {
    dispatch(deleteSourcetarted());

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
      .delete(
        `${process.env.REACT_APP_API_ADDRESS}/sourcePreferences/` + id,
        axiosConfig
      )
      .then((response) => {
        if (response.data.success_message) {
          dispatch(deleteSourceSuccess(response.data));

          Swal.fire({
            position: "top-end",
            icon: "success",
            text: "The catagory has been successfully deleted ! ",
            showConfirmButton: false,
            timer: 800,
            toast: true,
          });
        }
      })
      .catch((err) => {
        dispatch(deleteSourceFailure(err.message));
      });
  };
};

const deleteSourcetarted = () => ({
  type: "sourceDeletion_started",
});

const deleteSourceSuccess = (data) => ({
  type: "sourceDeletion_success",
  payload: {
    ...data,
  },
});

const deleteSourceFailure = (error) => ({
  type: "sourceDeletion_failure",
  payload: {
    error,
  },
});

const normalizeGuardianArticle = (article) => ({
  title: article.webTitle || "No title available",
  url: article.webUrl,
  source: "The Guardian",
  publishedAt: article.webPublicationDate,
  description: article.fields?.headline,
  urlToImage: article.fields?.thumbnail,
  author: article.byline,
});

const normalizeNewsApiArticle = (article) => ({
  title: article.title || "No title available",
  url: article.url,
  source: article.source.name,
  publishedAt: article.publishedAt,
  description: article.description,
  urlToImage: article.urlToImage,
  author: article.author,
});

export const AuthorsToCache = () => {
  return async (dispatch) => {
    try {
      const [guardianResponse, newsApiResponse] = await Promise.all([
        axios.get("https://content.guardianapis.com/search", {
          params: {
            "api-key": process.env.REACT_APP_GUARDIAN_API_KEY,
            format: "json",
            "show-fields": "all",
          },
        }),
        axios.get("https://newsapi.org/v2/top-headlines", {
          params: {
            apiKey: process.env.REACT_APP_NEWS_API_KEY,
            q: "general sports culture health business",
          },
        }),
      ]);

      if (guardianResponse.status === 200 && newsApiResponse.status === 200) {
        const guardianArticles = guardianResponse.data.response.results.map(
          normalizeGuardianArticle
        );
        const newsApiArticles = newsApiResponse.data.articles.map(
          normalizeNewsApiArticle
        );

        const authors = [];
        const categories = [];

        const splitAuthors = (authorName) => {
          let splitNames = [];
          if (authorName.includes(",")) {
            splitNames = authorName.split(",");
          } else if (authorName.includes("and")) {
            splitNames = authorName.split("and");
          } else {
            splitNames.push(authorName);
          }
          return splitNames.map((name) => name.trim());
        };

        guardianArticles.forEach((article) => {
          const { author, category } = article;
          if (author) {
            const splitNames = splitAuthors(author);
            splitNames.forEach((name) => {
              if (!authors.includes(name)) {
                authors.push(name);
              }
            });
          }
          if (category && !categories.includes(category)) {
            categories.push(category);
          }
        });

        newsApiArticles.forEach((article) => {
          const { author, category } = article;
          if (author) {
            const splitNames = splitAuthors(author);
            splitNames.forEach((name) => {
              if (!authors.includes(name)) {
                authors.push(name);
              }
            });
          }
          if (category && !categories.includes(category)) {
            categories.push(category);
          }
        });

        const storedAuthorsString = localStorage.getItem("authors");
        const storedAuthors = storedAuthorsString
          ? JSON.parse(storedAuthorsString)
          : [];
        const updatedAuthors = [...new Set([...storedAuthors, ...authors])];
        const updatedAuthorsString = JSON.stringify(updatedAuthors);
        localStorage.setItem("authors", updatedAuthorsString);

        const storedCategoriesString = localStorage.getItem("categories");
        const storedCategories = storedCategoriesString
          ? JSON.parse(storedCategoriesString)
          : [];
        const updatedCategories = [
          ...new Set([...storedCategories, ...categories]),
        ];
        const updatedCategoriesString = JSON.stringify(updatedCategories);
        localStorage.setItem("categories", updatedCategoriesString);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred in one or more requests!",
          timer: 2000,
          timerProgressBar: true,
          toast: true,
          confirmButtonColor: "#0a4b85",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred while fetching articles!",
        timer: 2000,
        timerProgressBar: true,
        toast: true,
        confirmButtonColor: "#0a4b85",
      });
    }
  };
};
