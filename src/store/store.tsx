import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import serviceListReducer from './serviceListReducer';
import serviceUpdateReducer from "./serviceUpdateReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers(
  {
    items: serviceListReducer,
   itemUpdate: serviceUpdateReducer
  }
)

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__|| compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
export type RootState = ReturnType<typeof rootReducer>;
