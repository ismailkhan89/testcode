import { combineReducers } from "redux";
import UserAuthReducer from "./AuthReducer";
import LocationReducer from "./LocationReducer";
import TaskReducer from "./TaskReducer";

export default combineReducers({
  user: UserAuthReducer,
  task : TaskReducer,
  location : LocationReducer
});