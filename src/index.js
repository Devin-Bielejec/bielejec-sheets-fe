import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers";
import { Provider } from "react-redux";
import { loadState, saveState } from "./sessionStorage";

//Getting the state from user's session storage
const persistedState = loadState();

//Allows us to use react redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//Holds state from either reducer's initial state or user's session storage (persistedState)
//applyMiddlware(thunk) allows for changed dispatch calls with async axios calls
const store = createStore(
  reducer,
  persistedState,
  composeEnhancers(applyMiddleware(thunk))
);

//Change Listener - called on any dispatch to update store state
//saveState saves state to session storage
store.subscribe(() => {
  saveState({
    allQuestions: store.getState().allQuestions,
    document: store.getState().document,
    displayedQesutions: store.getState().displayedQesutions,
    userID: store.getState().userID,
  });
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
