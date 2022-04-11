import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { profileReducer } from "./profileReducer";

// Part4: Combine Reducers and Create a Store
const reducer = combineReducers({
  profile: profileReducer,
});
 
const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

export default store;