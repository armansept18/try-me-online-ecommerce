import { combineReducers } from "redux";
import { userReducer } from "./reducer/auth-reducer";

export const reducers = combineReducers({
  auth: userReducer,
});
