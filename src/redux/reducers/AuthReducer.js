const InitialStates = {
  name: "",
  username: "",
  email: "",
  role: null,
  password: "",
  confirm_password: "",
  loading: false,
  loginResponse: [],
  isAuthenticated: JSON.parse(localStorage.getItem("fkey")) ? true : false,
  userRegistrationResponse: [],
  userRegistrationErrors: [],
  customerRegistrationErrors: [],
  showModal: false,
};

export default (state = InitialStates, action) => {
  switch (action.type) {
    case "inputHandler":
      return { ...state, [action.payload.key]: action.payload.value };

    // ==================================
    // login and logout states
    // ==================================
    case "showModalAction":
      return { ...state, showModal: true };
    case "hideModalAction":
      return { ...state, showModal: false };

    case "login_started":
      return { ...state, loading: true };

    case "login_error":
      return { ...state, loading: false, isAuthenticated: false };

    case "login_success":
      return {
        ...state,
        loginResponse: action.payload,
        loading: false,
        isAuthenticated: InitialStates.isAuthenticated,
      };

    case "logout_success":
      return {
        ...state,
        logoutResponse: action.payload,
        isAuthenticated: false,
      };

    // ==================================
    // user registration states
    // ==================================
    case "registerUser_started":
      return { ...state };
    case "registerCustomer_started":
      return { ...state, loading: false };

    case "registerUser_success":
      return {
        ...state,
        userRegistrationResponse: action.payload,
        loading: false,
        showModal: false,
        name: "",
        email: "",
        username: "",
        password: "",
        confirm_password: "",
        userRegistrationErrors: [],
      };

    case "registerUser_failure":
      return {
        ...state,
        userRegistrationErrors: action.payload,
        loading: false,
      };

    case "registerCustomer_failure":
      return {
        ...state,
        customerRegistrationErrors: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
