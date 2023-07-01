import { combineReducers } from "redux";
import authReducer from "./AuthReducer";
import preDataReducer from "./PreDataReducer";
import NewsFeedReducer from "./NewsFeedReducer";
import SettingsReducer from "./SettingsReducer";

export default combineReducers({
  authenticationHandler: authReducer,

  preDataHandler: preDataReducer,

  NewsFeedHandler: NewsFeedReducer,

  SettingsHandler: SettingsReducer,
});
