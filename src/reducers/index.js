import updateAllQuestionsReducer from "./updateAllQuestions";
import initialState from "../reducers/initialState";
import reduceReducers from "reduce-reducers";
// import loginReducer from "./login";
// import removeQuestionReducer from "./removeQuestion";
// import updateAllQuestionsReducer from "./updateAllQuestions";
import updateDisplayedQuestionsReducer from "./updateDisplayedQuestions";
// import updateOrderReducer from "./updateOrder";
import updateDocumentQuestions from "./updateDocumentQuqestions.js";
const reducer = reduceReducers(
  initialState,
  updateAllQuestionsReducer,
  updateDisplayedQuestionsReducer,
  updateDocumentQuestions
  // addQuestionReducer,
  // loginReducer,
  // removeQuestionReducer,
  // updateOrderReducer
);

export default reducer;
