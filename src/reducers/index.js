import updateAllQuestionsReducer from "./updateAllQuestions";
import initialState from "./initialState";
import reduceReducers from "reduce-reducers";
// import loginReducer from "./login";
// import removeQuestionReducer from "./removeQuestion";
// import updateAllQuestionsReducer from "./updateAllQuestions";
import updateDisplayedQuestionsReducer from "./updateDisplayedQuestions";
// import updateOrderReducer from "./updateOrder";

const reducer = reduceReducers(
  initialState,
  updateAllQuestionsReducer,
  updateDisplayedQuestionsReducer
  // addQuestionReducer,
  // loginReducer,
  // removeQuestionReducer,
  // updateOrderReducer
);

export default reducer;
