import React from 'react';
import { Container, Card, CardContent, Typography, Box, Button, useTheme, makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { surveyData, QUESTION_TYPES } from '../../data/questions';
import { setAnswer, setCurrentQuestion, setCurrentAnswer, showResults as showResultsAction, goToPrevious } from '../../store/actions/quizActions';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

import TextQuestion from '../QuestionTypes/TextQuestion';
import ImageSelectQuestion from '../QuestionTypes/ImageSelectQuestion';
import CheckboxesQuestion from '../QuestionTypes/CheckboxesQuestion';
import LinearScaleQuestion from '../QuestionTypes/LinearScaleQuestion';
import YesNoQuestion from '../QuestionTypes/YesNoQuestion';
import CountryListQuestion from '../QuestionTypes/CountryListQuestion';
import PhoneNumberQuestion from '../QuestionTypes/PhoneNumberQuestion';
import DateQuestion from '../QuestionTypes/DateQuestion';
import CSATQuestion from '../QuestionTypes/CSATQuestion';
import ResultsView from '../ResultsView';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    padding: '16px',
    boxSizing: 'border-box',
  },
  card: {
    width: '100%',
    maxWidth: '750px',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    padding: '24px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
  },
  title: {
    fontSize: '1.1rem',
    marginBottom: '12px',
  },
  description: {
    fontSize: '0.9rem',
    marginBottom: '20px',
  },
  textFieldContainer: {
    marginTop: 'auto',
  },
  buttonContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    marginRight: '16px',
  },
}));

export default function QuestionCard() {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { currentQuestionIndex, currentAnswer, answers, showResults } = useSelector(state => state.quiz || {});

  const currentQuestion = surveyData.questions[currentQuestionIndex || 0];
  const isLastQuestion = (currentQuestionIndex || 0) === surveyData.questions.length - 1;
  const isFirstQuestion = (currentQuestionIndex || 0) === 0;

  const handleAnswerChange = (value) => {
    dispatch(setCurrentAnswer(value));
  };

  const handleNext = () => {
    dispatch(setAnswer(currentQuestion.id, currentAnswer));

    if (!isLastQuestion) {
      dispatch(setCurrentQuestion(currentQuestionIndex + 1));
      const nextQuestionId = currentQuestion.id + 1;
      const nextAnswer = answers[nextQuestionId] || '';
      dispatch(setCurrentAnswer(nextAnswer));
    } else {
      dispatch(showResultsAction());
    }
  };

  const handlePrevious = () => {
    dispatch(goToPrevious());
    const prevQuestionId = currentQuestion.id - 1;
    const prevAnswer = answers[prevQuestionId] || '';
    dispatch(setCurrentAnswer(prevAnswer));
  };

  const renderQuestionComponent = () => {
    switch (currentQuestion.type) {
      case QUESTION_TYPES.TEXT:
        return <TextQuestion question={currentQuestion} value={currentAnswer} onChange={handleAnswerChange} />;
      case QUESTION_TYPES.IMAGE_SELECT:
        return <ImageSelectQuestion question={currentQuestion} value={currentAnswer} onChange={handleAnswerChange} />;
      case QUESTION_TYPES.CHECKBOXES:
        return <CheckboxesQuestion question={currentQuestion} value={currentAnswer} onChange={handleAnswerChange} />;
      case QUESTION_TYPES.LINEAR_SCALE:
        return <LinearScaleQuestion question={currentQuestion} value={currentAnswer} onChange={handleAnswerChange} />;
      case QUESTION_TYPES.YES_NO:
        return <YesNoQuestion question={currentQuestion} value={currentAnswer} onChange={handleAnswerChange} />;
      case QUESTION_TYPES.COUNTRY_LIST:
        return <CountryListQuestion question={currentQuestion} value={currentAnswer} onChange={handleAnswerChange} />;
      case QUESTION_TYPES.PHONE_NUMBER:
        return <PhoneNumberQuestion question={currentQuestion} value={currentAnswer} onChange={handleAnswerChange} />;
      case QUESTION_TYPES.DATE:
        return <DateQuestion question={currentQuestion} value={currentAnswer} onChange={handleAnswerChange} />;
      case QUESTION_TYPES.CSAT:
        return <CSATQuestion question={currentQuestion} value={currentAnswer} onChange={handleAnswerChange} />;
      default:
        return <TextQuestion question={currentQuestion} value={currentAnswer} onChange={handleAnswerChange} />;
    }
  };

  if (showResults === true) {
    return <ResultsView />;
  }

  return (
    <Container 
      maxWidth="sm" 
      className={classes.container}
      style={{ backgroundColor: theme.palette.background.default }}
    >
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography 
            variant="h6" 
            component="h2" 
            gutterBottom 
            className={classes.title}
          >
            {currentQuestion.title}
          </Typography>
          <Typography 
            variant="body1" 
            color="textSecondary" 
            gutterBottom 
            className={classes.description}
          >
            {currentQuestion.description}
          </Typography>
          
          <Box className={classes.textFieldContainer}>
            {renderQuestionComponent()}
          </Box>
          
          <Box className={classes.buttonContainer}>
            {!isFirstQuestion && (
              <Button
                variant="outlined"
                color="primary"
                onClick={handlePrevious}
                size="medium"
                startIcon={<KeyboardArrowLeftIcon />}
                className={classes.button}
              >
                Previous
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              size="medium"
              endIcon={<KeyboardArrowRightIcon />}
            >
              {isLastQuestion ? 'Result' : 'Next'}
            </Button>
          </Box>
          
        </CardContent>
      </Card>
    </Container>
  );
}