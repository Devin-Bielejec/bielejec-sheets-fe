export const initialState = {
  document: {
    questions: [
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
    ]
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
  subjects: [
    { value: "Algebra", selected: false },
    { value: "Geometry", selected: false }
  ],
  topics: [
    { value: "AlgebraT1", selected: false },
    { value: "AlgebraT2", selected: false },
    { value: "GeoT1", selected: false },
    { value: "GeoT2", selected: false }
  ],
  standards: [
    { value: "someStandard", selected: false },
    { value: "someOtherStandard", selected: false }
  ],
  questionTypes: [
    { value: "Short Answer", selected: false },
    { value: "Multiple Choice", selected: false }
  ]
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_DISPLAYED_QUESTIONS":
      return {
        ...state,
        subjects: action.subjects,
        topics: action.topics,
        standards: action.standards,
        questionTypes: action.questionTypes,
        displayedQuestions: action.displayedQuestions
      };
    case "LOGIN":
      return { userID: action.userID, ...state };
    case "ADD_QUESTION":
      //action.questionID
      return {
        ...state,
        document: {
          ...state.document,
          questions: [...state.document.questions, action.questionID]
        }
      };
    case "REMOVE_QUESTION":
      let currentQuestions = state.document.questions;
      let filteredQuestions = currentQuestions.filter(
        question => question.id !== action.questionID
      );
      return {
        ...state,
        document: {
          ...state.document,
          questions: [...filteredQuestions]
        }
      };
    case "UPDATE_ORDER":
      return {
        ...state,
        document: {
          ...state.document,
          questions: action.updatedQuestions
        }
      };
    default:
      return { ...state };
  }
};
