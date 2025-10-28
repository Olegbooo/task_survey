import { createStore, combineReducers } from "redux";
import { quizReducer } from "./reducers/quizReducer";

const rootReducer = combineReducers({
  quiz: quizReducer,
});

export const store = createStore(rootReducer);
