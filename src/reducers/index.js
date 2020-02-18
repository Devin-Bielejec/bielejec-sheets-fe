export const initialState = {
  document: {
    questions: []
    //options etc
  },
  userID: 1,
  displayedQuestions: [
    {
      imgURL:
        "https://res.cloudinary.com/bestplacepics/image/upload/v1574374047/newpics/Albuquerque%20NM/bdy1xww82uyb0oj5ruak.png",
      id: 1
    },
    {
      imgURL:
        "https://res.cloudinary.com/bestplacepics/image/upload/v1574374117/newpics/Miami%20FL/hwq5hfr17vhwrpsgx4dt.jpg",
      id: 2
    },
    {
      imgURL:
        "https://res.cloudinary.com/bestplacepics/image/upload/v1574373981/newpics/Oklahoma%20City%20OK/vssi3ghrkwxbtpysptbn.jpg",
      id: 3
    }
  ],
  //basic sujbects topics stanards, rest will be pulled from db
  subjects: ["Algebra", "Geometry"],
  topics: ["AlgebraT1", "AlgebraT2", "GeoT1", "GeoT2"],
  standards: ["somestandard", "some other standard"],
  questionTypes: ["Short Answer", "Multiple Choice"]
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DEFAULT_QUESTIONS":
      return {
        subjects: action.subjects,
        topics: action.topics,
        standards: action.standards,
        questionTypes: action.questionTypes,
        displayedQuestions: action.displayedQuestions,
        ...state
      };
    case "LOGIN":
      return { userID: action.userID, ...state };
    case "ADD_QUESTION":
      //action.questionID
      return {
        document: {
          questions: [...state.document.questions, action.questionID]
        },
        ...state
      };
    case "REMOVE_QUESTION":
      let currentQuestions = state.document.questions;
      let filteredQuestions = currentQuestions.filter(
        questionID => questionID !== action.questionID
      );
      return {
        document: {
          question: [...filteredQuestions]
        },
        ...state
      };
    case "CHANGE_ORDER":
    //worry about this one later
    default:
      return { ...state };
  }
};
