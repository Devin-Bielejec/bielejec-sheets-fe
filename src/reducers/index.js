import axios from "axios";

export const initialState = {
  document: {
    questions: [],
    //options etc
  },
  userID: 1,
  displayedQuestions: [],
  //basic sujbects topics stanards, rest will be pulled from db
  subjects: [],
  topics: [],
  standards: [],
  types: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_DISPLAYED_QUESTIONS":
      return {
        ...state,
        displayedQuestions: action.displayedQuestions,
      };
    case "UPDATE_SIDEBAR_BY_SUBJECT":
      return {
        ...state,
        topics: action.topics,
        subjects: action.subjects,
        standards: action.standards,
        types: action.types,
      };
    case "TOGGLE_SIDEBAR_OPTION":
      //toggling happens here
      return {
        ...state,
        [action.sideBarTitle]: state[action.sideBarTitle].map((stateItem) => {
          if (stateItem.value === action.itemValue) {
            stateItem.selected = !stateItem.selected;
          }
          return stateItem;
        }),
      };
    case "LOGIN":
      return { userID: action.userID, ...state };
    case "ADD_QUESTION":
      return {
        ...state,
        document: {
          ...state.document,
          questions: [...state.document.questions, ...action.questions],
        },
      };
    case "REMOVE_QUESTION":
      let filteredQuestions = [...state.document.questions];
      filteredQuestions.splice(action.index, 1);
      return {
        ...state,
        document: {
          ...state.document,
          questions: [...filteredQuestions],
        },
      };
    case "UPDATE_ORDER":
      return {
        ...state,
        document: {
          ...state.document,
          questions: action.updatedQuestions,
        },
      };
    default:
      return { ...state };
  }
};
