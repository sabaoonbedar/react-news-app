const InitialStates = {
  preDataLoadResponse: null,

  preLoading: false,
};

export default (state = InitialStates, action) => {
  switch (action.type) {
    case "preData_started":
      return { ...state, preLoading: true };

    case "preData_failure":
      return { ...state, preLoading: false };

    case "preData_success":
      return {
        ...state,
        preDataLoadResponse: action.payload,
        preLoading: false,
      };

    default:
      return state;
  }
};
