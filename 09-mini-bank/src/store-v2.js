// ------------------------------------------ //
// ---------- USING CLASSIC REDUX ---------- //
// ------------------------------------------ //

import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import accountReducer from "./features/accounts/accountSlice-v1";
import customerReducer from "./features/customers/customerSlice-v1";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
