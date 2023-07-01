const InitialStates = {
  functionalLoader: false,

  loading: false,

  currentPage: 1,
  authorModalToggle: false,
  catagoryModalToggle: false,
  sourceModalToggle: false,
  authorsList: null,
  authorAddedFailure: null,
  catagoryAddedFailure: null,

  catagoryList: null,
  sourceList: null,
  catLoading: false,
  srcLoading: false,
};

export default (state = InitialStates, action) => {
  switch (action.type) {
    case "toggleSourceModal":
      return { ...state, sourceModalToggle: !state.sourceModalToggle };

    case "toggleCatagoryModal":
      return { ...state, catagoryModalToggle: !state.catagoryModalToggle };

    case "toggleAuthorsModal":
      return { ...state, authorModalToggle: !state.authorModalToggle };

    case "toggleCatagoriesModal":
      return { ...state, catagoryModalToggle: true };

    case "authorsFetch_started":
      return { ...state, loading: true };
    case "addingAuthor_started":
      return { ...state, loading: true, authorAddedFailure: "" };

    case "authorDeletion_started":
      return { ...state, loading: true };

    case "authorsFetch_success":
      return { ...state, authorsList: action.payload, loading: false };

    case "authorFetchFromApi_success":
      return { ...state, authorsSelectorList: action.payload, loading: false };

    case "addingAuthor_success":
      return {
        ...state,
        authorAdded: action.payload,
        loading: false,
        authorModalToggle: false,
      };

    case "addingAuthor_failure":
      return { ...state, authorAddedFailure: action.payload, loading: false };

    case "authorDeletion_success":
      return { ...state, authorDeleted: action.payload, loading: false };

    case "catagoryFetch_started":
      return { ...state, catLoading: true };

    case "catagoryFetch_success":
      return { ...state, catagoryList: action.payload, catLoading: false };

    case "addingCatagory_success":
      return {
        ...state,
        catagoryAdded: action.payload,
        catLoading: false,
        catagoryModalToggle: false,
      };

    case "addingCatagory_failure":
      return {
        ...state,
        catagoryAddedFailure: action.payload,
        catLoading: false,
      };

    case "catagoryDeletion_success":
      return { ...state, catagoryDeleted: action.payload, catLoading: false };

    case "sourceFetch_started":
      return { ...state, srcLoading: true };

    case "sourceFetch_success":
      return { ...state, sourceList: action.payload, srcLoading: false };

    case "addingSource_success":
      return {
        ...state,
        sourceAdded: action.payload,
        srcLoading: false,
        sourceModalToggle: false,
      };

    case "addingSource_failure":
      return {
        ...state,
        sourceAddedFailure: action.payload,
        srcLoading: false,
      };

    case "sourceDeletion_success":
      return { ...state, sourceDeleted: action.payload, srcLoading: false };

    default:
      return state;
  }
};
