export const SET_ANSWER = "SET_ANSWER";
export const SET_CURRENT_QUESTION = "SET_CURRENT_QUESTION";
export const SET_CURRENT_ANSWER = "SET_CURRENT_ANSWER";
export const RESET_QUIZ = "RESET_QUIZ";
export const SHOW_RESULTS = "SHOW_RESULTS";
export const GO_TO_PREVIOUS = "GO_TO_PREVIOUS";

export const setAnswer = (questionId, answer) => ({
    type: SET_ANSWER,
    payload: { questionId, answer },
});

export const setCurrentQuestion = (questionIndex) => ({
    type: SET_CURRENT_QUESTION,
    payload: questionIndex,
});

export const setCurrentAnswer = (answer) => ({
    type: SET_CURRENT_ANSWER,
    payload: answer,
});

export const showResults = () => ({
    type: SHOW_RESULTS,
});

export const goToPrevious = () => ({
    type: GO_TO_PREVIOUS,
});
  
export const resetQuiz = () => ({
    type: RESET_QUIZ,
});