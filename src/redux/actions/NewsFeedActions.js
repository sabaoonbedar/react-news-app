import axios from "axios";
import Swal from "sweetalert2";

export const handleSelectors = (selectorName, value) => ({
  type: "handleSelector",
  payload: {
    selectorName,
    value,
  },
});

export const resetFilter = () => {
  return {
    type: "resetFilter",
  };
};

// -------------------------------------------------------------------------
// Fetch news from the news api
// -------------------------------------------------------------------------

const normalizeGuardianArticle = (article) => ({
  title: article.webTitle || "No title available",
  url: article.webUrl,
  source: "The Guardian",
  publishedAt: article.webPublicationDate,
  description: article.fields?.headline,
  urlToImage: article.fields?.thumbnail,
  author: article.byline,
  category: article.sectionName,
});

const normalizeNewsApiArticle = (article) => ({
  title: article.title || "No title available",
  url: article.url,
  source: article.source.name,
  publishedAt: article.publishedAt,
  description: article.description,
  urlToImage: article.urlToImage,
  author: article.author,
  category: article.category,
});
// =====================================================================
// To give preference on already fetched data without multiple api calls
// =====================================================================
const filterArticlesByPreferences = (preferences, articles) => {
  const filteredArticles = {
    articles: [],
  };

  if (preferences.authors && preferences.authors.length > 0) {
    filteredArticles.articles = filteredArticles.articles.concat(
      articles.filter((article) => preferences.authors.includes(article.author))
    );
  }

  if (preferences.sources && preferences.sources.length > 0) {
    filteredArticles.articles = filteredArticles.articles.concat(
      articles.filter((article) => preferences.sources.includes(article.source))
    );
  }

  if (preferences.categories && preferences.categories.length > 0) {
    filteredArticles.articles = filteredArticles.articles.concat(
      articles.filter((article) =>
        preferences.categories.includes(article.category)
      )
    );
  }


  return filteredArticles;
};

export const fetchFilteredArticles = (preferences = null) => {
  return async (dispatch) => {
    dispatch(fetchStarted());
    try {
      const { authors = [], sources = [], categories = [] } = preferences;
      const authorPromises = authors.map((author) =>
        axios.get("https://content.guardianapis.com/search", {
          params: {
            "api-key": process.env.REACT_APP_GUARDIAN_API_KEY,
            format: "json",
            "show-fields": "all",
            q: author,
          },
        })
      );

      const sourcePromises = sources.map((source) =>
        axios.get("https://newsapi.org/v2/everything", {
          params: {
            apiKey: process.env.REACT_APP_NEWS_API_KEY,
            q: `source:"${source}"`,
          },
        })
      );

      const categoryPromises = categories.map((category) =>
        axios.get("https://newsapi.org/v2/top-headlines", {
          params: {
            apiKey: process.env.REACT_APP_NEWS_API_KEY,
            category: category,
          },
        })
      );

      const authorResponses = await Promise.all(authorPromises);
      const sourceResponses = await Promise.all(sourcePromises);
      const categoryResponses = await Promise.all(categoryPromises);

      const authorArticles = authorResponses.flatMap(
        (response) => response?.data?.response?.results || []
      );
      const sourceArticles = sourceResponses.flatMap(
        (response) => response?.data?.articles || []
      );
      const categoryArticles = categoryResponses.flatMap(
        (response) => response?.data?.articles || []
      );

      const normalizedArticles = [
        ...authorArticles.map(normalizeGuardianArticle),
        ...sourceArticles.map(normalizeNewsApiArticle),
        ...categoryArticles.map(normalizeNewsApiArticle),
      ];

      dispatch(fetchSuccess({ articles: normalizedArticles }));
    } catch (error) {
      console.error("Error fetching filtered articles:", error);
    }
  };
};

const fetchStarted = () => ({
  type: "fetch_preference_started",
});

const fetchSuccess = (data) => ({
  type: "fetched_preferences_success",
  payload: {
    ...data,
  },
});

export const newsFeedFetcher = (preferences = null) => {
  return async (dispatch) => {
    dispatch(getNewsFeedStarted());

    const [guardianResponse, newsApiResponse] = await Promise.all([
      axios.get("https://content.guardianapis.com/search", {
        params: {
          "api-key": process.env.REACT_APP_GUARDIAN_API_KEY,
          format: "json",
          "show-fields": "all",
        },
      }),
      axios.get("https://newsapi.org/v2/everything", {
        params: {
          apiKey: process.env.REACT_APP_NEWS_API_KEY,
          q: "general  sports",
        },
      }),
    ]);

    if (
      guardianResponse.status === "rejected" ||
      newsApiResponse.status === "rejected"
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred in one or more requests !",
        timer: 2000,
        timerProgressBar: true,
        toast: true,
        confirmButtonColor: "#0a4b85",
      });
    }

    const guardianArticles = guardianResponse.data.response.results.map(
      normalizeGuardianArticle
    );
    const newsApiArticles = newsApiResponse.data.articles.map(
      normalizeNewsApiArticle
    );
    const data = [...guardianArticles, ...newsApiArticles];
    const dataObject = { articles: data };

    dispatch(getNewsFeedSuccess(dataObject));

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
  };
};

const getNewsFeedStarted = () => ({
  type: "newsFeed_started",
});

const getNewsFeedSuccess = (data, pageNumber) => ({
  type: "newsFeed_success",
  payload: {
    ...data,
  },
});

export const searchArticles = (query) => {
  return async (dispatch) => {
    dispatch(searchArticlesStarted());

    const [guardianResponse, newsApiResponse] = await Promise.all([
      axios.get("https://content.guardianapis.com/search", {
        params: {
          "api-key": process.env.REACT_APP_GUARDIAN_API_KEY,
          format: "json",
          "show-fields": "all",
          q: query,
        },
      }),
      axios.get("https://newsapi.org/v2/everything", {
        params: {
          apiKey: process.env.REACT_APP_NEWS_API_KEY,
          q: query,
        },
      }),
    ]);

    if (
      guardianResponse.status === "rejected" ||
      newsApiResponse.status === "rejected"
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred in one or more requests !",
        timer: 2000,
        timerProgressBar: true,
        toast: true,
        confirmButtonColor: "#0a4b85",
      });
    }

    const guardianArticles = guardianResponse.data.response.results.map(
      normalizeGuardianArticle
    );
    const newsApiArticles = newsApiResponse.data.articles.map(
      normalizeNewsApiArticle
    );
    const data = [...guardianArticles, ...newsApiArticles];
    const dataObject = { articles: data };
    dispatch(searchArticlesSuccess(dataObject));
  };
};

const searchArticlesStarted = () => ({
  type: "articleSearch_started",
});

const searchArticlesSuccess = (data) => ({
  type: "articleSearch_success",
  payload: {
    ...data,
  },
});

export const applyFilters = (
  articles,
  sourceFilter = null,
  categoryFilter = null,
  startDateFilter = null,
  endDateFilter = null
) => {
  const filterArticles = (articles, source, category, startDate, endDate) => {
    return articles?.articles?.filter((article) => {
      let matchSource = true;
      let matchCategory = true;
      let matchDate = true;

      if (source) {
        matchSource = article.source === source;
      }

      if (categoryFilter !== null) {
        if (categoryFilter === undefined) {
          matchCategory =
            article.category === undefined || article.category === null;
        } else {
          matchCategory = article.category === category;
        }
      }

      if (startDate && endDate) {
        const articleDate = new Date(article.publishedAt);
        matchDate = articleDate >= startDate && articleDate <= endDate;
      }

      return matchSource && matchCategory && matchDate;
    });
  };

  return (dispatch) => {
    dispatch(filterStarted());

    const startDate = startDateFilter ? new Date(startDateFilter) : null;
    const endDate = endDateFilter ? new Date(endDateFilter) : null;

    const filteredData = filterArticles(
      articles,
      sourceFilter,
      categoryFilter,
      startDate,
      endDate
    );
    dispatch(filterSuccess({ articles: filteredData }));
  };
};

const filterStarted = () => ({
  type: "dataFilter_started",
});
const filterSuccess = (data) => ({
  type: "dataFilter_success",
  payload: {
    ...data,
  },
});
