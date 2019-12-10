import { combineReducers } from "redux";
import postReducer from "./postReducer";
import usersReducer from "../reducers/usersReducer";

export default combineReducers({ posts: postReducer, users: usersReducer });
