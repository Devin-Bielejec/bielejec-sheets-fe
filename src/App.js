import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Search from "./components/Search";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Register from "./components/Register";
import { createGlobalStyle } from "styled-components";
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
  return (
    <>
      <Router>
        <Global />
        <Layout>
          <Switch>
            <Route path="/create">
              <CreateDocument />
            </Route>
            <Route path="/login">
              <Login />
            </Route>

            <Route path="/register">
              <Register />
            </Route>

            <Route exact path="/">
              <Search />
            </Route>

            <Route path="/preview">
              <PreviewDocument />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </>
  );
}
export default App;
