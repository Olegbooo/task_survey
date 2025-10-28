import React from 'react';
import { Container, Card, CardContent, Typography, Box, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
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

const styles = (theme) => ({
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
});

const QuestionCard = ({ 
  currentQuestionIndex, 
  currentAnswer, 
  answers, 
  showResults,
  setAnswer,
  setCurrentQuestion,
  setCurrentAnswer,
  showResultsAction,
  goToPrevious,
  classes,
  theme,
}) => {

  const currentQuestion = surveyData.questions[currentQuestionIndex || 0];
  const isLastQuestion = (currentQuestionIndex || 0) === surveyData.questions.length - 1;
  const isFirstQuestion = (currentQuestionIndex || 0) === 0;

  const handleAnswerChange = (value) => {
    setCurrentAnswer(value);
  };

  const handleNext = () => {
    setAnswer(currentQuestion.id, currentAnswer);

    if (isLastQuestion) {
      showResultsAction();
      return;
    }

    setCurrentQuestion(currentQuestionIndex + 1);
    const nextQuestionId = currentQuestion.id + 1;
    const nextAnswer = answers[nextQuestionId] || '';
    setCurrentAnswer(nextAnswer);
  };

  const handlePrevious = () => {
    goToPrevious();
    const prevQuestionId = currentQuestion.id - 1;
    const prevAnswer = answers[prevQuestionId] || '';
    setCurrentAnswer(prevAnswer);
  };

  const QUESTION_COMPONENTS = {
    [QUESTION_TYPES.TEXT]: TextQuestion,
    [QUESTION_TYPES.IMAGE_SELECT]: ImageSelectQuestion,
    [QUESTION_TYPES.CHECKBOXES]: CheckboxesQuestion,
    [QUESTION_TYPES.LINEAR_SCALE]: LinearScaleQuestion,
    [QUESTION_TYPES.YES_NO]: YesNoQuestion,
    [QUESTION_TYPES.COUNTRY_LIST]: CountryListQuestion,
    [QUESTION_TYPES.PHONE_NUMBER]: PhoneNumberQuestion,
    [QUESTION_TYPES.DATE]: DateQuestion,
    [QUESTION_TYPES.CSAT]: CSATQuestion,
  };
  const renderQuestionComponent = () => {
    const Component = QUESTION_COMPONENTS[currentQuestion.type];
    
    return <Component question={currentQuestion} value={currentAnswer} onChange={handleAnswerChange} />;
  };

  if (!!showResults) {
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
};

const mapStateToProps = (state) => ({
  currentQuestionIndex: state.quiz.currentQuestionIndex,
  currentAnswer: state.quiz.currentAnswer,
  answers: state.quiz.answers,
  showResults: state.quiz.showResults,
});

const mapDispatchToProps = {
  setAnswer,
  setCurrentQuestion,
  setCurrentAnswer,
  showResultsAction,
  goToPrevious,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, { withTheme: true })
)(QuestionCard);
