const InitialStates = {
  functionalLoader: false,

  loading: false,
  openConfirmListModal: false,
  openEditLoadListModal: false,
  openRegConsgineeModal: false,
  addConsigneeErrors: null,
  currentPage: 1,
  getListCommunication: null,
  openContainerNo: false,
  newsFeedList: null,
  authorModalToggle: false,
  filteredArticles: null,
};

export default (state = InitialStates, action) => {
  switch (action.type) {
    case "handleSelector":
      return {
        ...state,
        selectors: {
          ...state.selectors,
          [action.payload.selectorName]: action.payload.value,
        },
      };



    case "newsFeed_started":
      return { ...state, loading: true };
    case "articleSearch_started":
      return { ...state, loading: true };
    case "dataFilter_started":
      return { ...state, loading: true };
    case "fetch_preference_started":
      return { ...state, loading: true };

    case "resetFilter":
      return { ...state, loading: false, filteredArticles: [] };

    case "newsFeed_success":
      return {
        ...state,
        newsFeedList: action.payload,
        loading: false,
        currentPage: action.payload.currentPage,
      };

    case "articleSearch_success":
      return {
        ...state,
        newsFeedList: action.payload,
        loading: false,
        currentPage: action.payload.currentPage,
        filteredArticles: null,
      };

    case "dataFilter_success":
      return {
        ...state,
        filteredArticles: action.payload,
        loading: false,
        currentPage: action.payload.currentPage,
      };

    case "fetched_preferences_success":
      return {
        ...state,
        newsFeedList: action.payload,
        loading: false,
        currentPage: action.payload.currentPage,
      };

    default:
      return state;
  }
};
