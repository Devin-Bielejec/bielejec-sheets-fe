import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import axios from "axios";
import LandingPage from "./components/LandingPage";
import Search from "./components/Search";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Register from "./components/Register";
import { createGlobalStyle } from "styled-components";

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
  return (
    <>
      <Router>
        <Global />
        <Layout>
          <Switch>
            <PrivateRoute path="/" component={Search} />
            <Route path="/login">
              <Login />
            </Route>

            <Route path="/register">
              <Register />
            </Route>

            <Route path="/">
              <LandingPage />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </>
  );
}

export default App;
