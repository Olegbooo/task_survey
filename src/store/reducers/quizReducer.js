import { SET_ANSWER, SET_CURRENT_QUESTION, SET_CURRENT_ANSWER, RESET_QUIZ, SHOW_RESULTS, GO_TO_PREVIOUS } from "../actions/quizActions";
import { countries } from "../../data/countries";

const initialState = {
  answers: {},
  currentQuestionIndex: 0,
  currentAnswer: '',
  showResults: false,
  countries: countries,
};

export const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ANSWER:
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.questionId]: action.payload.answer,
        },
      };
    case SET_CURRENT_QUESTION:
      return {
        ...state,
        currentQuestionIndex: action.payload,
        showResults: false,
      };
    case SET_CURRENT_ANSWER:
      return {
        ...state,
        currentAnswer: action.payload,
      };
    case SHOW_RESULTS:
      return {
        ...state,
        showResults: true,
      };
    case GO_TO_PREVIOUS:
      return {
        ...state,
        currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1),
        showResults: false,
      };
    case RESET_QUIZ:
      return initialState;
    default:
      return state;
  }
};
