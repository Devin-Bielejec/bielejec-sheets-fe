import updateAllQuestionsReducer from "./updateAllQuestions";
import initialState from "../reducers/initialState";
import reduceReducers from "reduce-reducers";
// import loginReducer from "./login";
// import removeQuestionReducer from "./removeQuestion";
// import updateAllQuestionsReducer from "./updateAllQuestions";
import updateDisplayedQuestionsReducer from "./updateDisplayedQuestions";
import createDocumentReducer from "./createDocument";
import updateDocumentQuestions from "./updateDocumentQuestions";
const reducer = reduceReducers(
  initialState,
  updateAllQuestionsReducer,
  updateDisplayedQuestionsReducer,
  updateDocumentQuestions,
  createDocumentReducer
  // addQuestionReducer,
  // loginReducer,
  // removeQuestionReducer,
  // updateOrderReducer
);

export default reducer;
