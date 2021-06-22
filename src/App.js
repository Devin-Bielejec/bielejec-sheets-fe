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
import { baseURL } from "./utils/index";

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

  React.useEffect(() => {
    // get default displayed questions
    axios.get(`${baseURL}/questions`).then((res) => {
      console.log("initial res", res);

      dispatch({
        type: "UPDATE_DISPLAYED_QUESTIONS",
        displayedQuestions: [...res.data],
      });
    });

    //for testing
    let data = [
      {
        id: "OneStepEquationWorksheet",
        standard: "A.REI.B.3",
        skill: "Solve linear equations",
        subSkill: null,
        topic: "Expressions And Equations",
        subTopic: null,
        notes: "",
        type: "Worksheet",
        kwargs: {
          firstStep: {
            add: {
              value: "add",
              toolTip: "Operation to solve",
            },
            subtract: {
              value: "subtract",
              toolTip: "Operation to solve",
            },
            multiply: {
              value: "multiply",
              toolTip: "Operation to solve",
            },
            divide: {
              value: "divide",
              toolTip: "Operation to solve",
            },
          },
          difficulty: {
            1: {
              value: "1",
              toolTip: "Positive number result",
            },
            2: {
              value: "2",
              toolTip: "Postive number result with larger numbers",
            },
            3: {
              value: "3",
              toolTip: "Negative number result",
            },
          },
          variable: {
            d: {
              value: "d",
              toolTip: "Variable to use",
            },
            e: {
              value: "e",
              toolTip: "Variable to use",
            },
            g: {
              value: "g",
              toolTip: "Variable to use",
            },
            h: {
              value: "h",
              toolTip: "Variable to use",
            },
            j: {
              value: "j",
              toolTip: "Variable to use",
            },
            k: {
              value: "k",
              toolTip: "Variable to use",
            },
            m: {
              value: "m",
              toolTip: "Variable to use",
            },
            n: {
              value: "n",
              toolTip: "Variable to use",
            },
            p: {
              value: "p",
              toolTip: "Variable to use",
            },
            r: {
              value: "r",
              toolTip: "Variable to use",
            },
            s: {
              value: "s",
              toolTip: "Variable to use",
            },
            w: {
              value: "w",
              toolTip: "Variable to use",
            },
            x: {
              value: "x",
              toolTip: "Variable to use",
            },
            y: {
              value: "y",
              toolTip: "Variable to use",
            },
            z: {
              value: "z",
              toolTip: "Variable to use",
            },
          },
        },
      },
    ];
    dispatch({
      type: "UPDATE_DISPLAYED_QUESTIONS",
      displayedQuestions: [...data],
    });

    //get default sidebar
    axios.post(`${baseURL}/questions`, { subjects: [] }).then((res) => {
      console.log("inside sidebarbysubject", res);
      dispatch({
        type: "UPDATE_SIDEBAR_BY_SUBJECT",
        subjects: [...res.data.subjects],
        topics: [...res.data.topics],
        standards: [...res.data.standards],
        types: [...res.data.types],
      });
    });
  }, []);

  function handleChange(key, itemValue) {
    //update values on sidebar via the state - toggled selected on property

    //item is {value: , selected: }
    let copyState = {
      ...state,
      [key]: state[key].map((item) => {
        console.log(item, itemValue);
        if (item.value === itemValue) {
          item.selected = !item.selected;
        }
        return item;
      }),
    };

    console.log(copyState);

    // update displayed questions
    axios
      .post(`${baseURL}/questions/questionsByFilter`, {
        topic: copyState.topics,
        subject: copyState.subjects,
        standard: copyState.standards,
        type: copyState.types,
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: "UPDATE_DISPLAYED_QUESTIONS",
          displayedQuestions: [...res.data.displayedQuestions],
        });
      });

    if (key === "subject") {
      //update sidebar
      axios
        .post(`${baseURL}/questions/sideBarBySubjects`, { subjects: itemValue })
        .then((res) => {
          console.log("inside sidebarbysubject", res);
          //keep subjects that are checked as selected - everything else resets

          dispatch({
            type: "UPDATE_SIDEBAR_OPTIONS",
            subjects: state.subjects,
            topics: [...res.data.topics],
            standards: [...res.data.standards],
            types: [...res.data.types],
          });
        });
    }
  }

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
              <Search
                handleChange={handleChange}
                state={state}
                dispatch={dispatch}
              />
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
