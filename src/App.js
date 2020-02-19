import React, { useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import axios from "axios";
import LandingPage from "./components/LandingPage";
import Search from "./components/Search";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Register from "./components/Register";
import { createGlobalStyle } from "styled-components";
import { reducer, initialState } from "./reducers/index.js";
import CreateDocument from "./components/CreateDocument.js";
import PreviewDocument from "./components/PreviewDocument.js";

const Global = createGlobalStyle` 
/* apply a natural box layout model to all elements, but allowing components to change */
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  
  body {
    margin: 0;
    background-color: #FBF9F7;
    font-family: Arial, sans-serif;
  }
`;

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);
  return (
    <>
      <Router>
        <Global />
        <Layout>
          <Switch>
            <PrivateRoute
              path="/create"
              state={state}
              dispatch={dispatch}
              component={CreateDocument}
            />
            <Route path="/login">
              <Login />
            </Route>

            <Route path="/register">
              <Register />
            </Route>

            <Route exact path="/">
              <Search state={state} dispatch={dispatch} />
            </Route>

            <Route path="/preview">
              <PreviewDocument state={state} dispatch={dispatch} />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </>
  );
}

export default App;
