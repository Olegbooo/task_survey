import React from 'react';
import { Container, Card, CardContent, Typography, Box, Button, Divider } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { surveyData, QUESTION_TYPES } from '../../data/questions';
import { CSAT_EMOJI_MAP } from '../../data/constants';
import { resetQuiz } from '../../store/actions/quizActions';
import RefreshIcon from '@material-ui/icons/Refresh';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '16px',
    boxSizing: 'border-box',
  },
  card: {
    width: '100%',
    maxWidth: '800px',
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
    fontSize: '1.5rem',
    marginBottom: '20px',
    textAlign: 'center',
  },
  questionItem: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
  },
  questionTitle: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },
  questionDescription: {
    fontSize: '0.9rem',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
  },
  answerText: {
    fontSize: '1rem',
    marginTop: theme.spacing(1),
  },
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  buttonContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
  divider: {
    marginBottom: '20px',
  },
}));

const ResultsView = () => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { answers } = useSelector(state => state.quiz);

  const handleRestart = () => {
    dispatch(resetQuiz());
  };

  const formatAnswer = (question, answer) => {
    if (!answer) return 'No answer provided';

    switch (question.type) {
      case QUESTION_TYPES.TEXT:
        return answer;
      case QUESTION_TYPES.IMAGE_SELECT:
        if (Array.isArray(answer)) {
          if (answer.length === 0) return 'No images selected';
          const selectedImages = question.images.filter(img => answer.includes(img.id));
          const imageNames = selectedImages.map(img => img.alt).join(', ');
          return imageNames;
        }
        return 'No images selected';
      case QUESTION_TYPES.CHECKBOXES:
        if (Array.isArray(answer)) {
          return answer.length > 0 ? answer.join(', ') : 'No options selected';
        }
        return 'No options selected';
      case QUESTION_TYPES.LINEAR_SCALE:
        return `${answer} / ${question.maxValue || 10}`;
      case QUESTION_TYPES.YES_NO:
        return answer === 'yes' ? 'Yes' : answer === 'no' ? 'No' : 'No answer';
      case QUESTION_TYPES.COUNTRY_LIST:
        return answer || 'No country selected';
      case QUESTION_TYPES.PHONE_NUMBER:
        if (typeof answer === 'object' && answer.countryCode && answer.number) {
          return `${answer.countryCode} ${answer.number}`;
        }
        return 'No phone number provided';
      case QUESTION_TYPES.DATE:
        return answer || 'No date selected';
      case QUESTION_TYPES.CSAT:
        return `${CSAT_EMOJI_MAP[answer] || '😐'} (${answer}/5)`;
      default:
        return answer;
    }
  };

  return (
    <Container 
      maxWidth="md" 
      className={classes.container}
      style={{ backgroundColor: theme.palette.background.default }}
    >
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            className={classes.title}
          >
            Survey Results
          </Typography>
          
          <Divider className={classes.divider} />
          
          {surveyData.questions.map((question, index) => (
            <Box key={question.id} className={classes.questionItem}>
              <Typography className={classes.questionTitle}>
                {index + 1}. {question.title}
              </Typography>
              <Typography className={classes.questionDescription}>
                {question.description}
              </Typography>
              <Typography className={classes.answerText}>
                <strong>Answer:</strong> {formatAnswer(question, answers[question.id])}
              </Typography>
            </Box>
          ))}
          
          <Box className={classes.buttonContainer}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleRestart}
              size="large"
              startIcon={<RefreshIcon />}
            >
              Start New Survey
            </Button>
          </Box>
          
        </CardContent>
      </Card>
    </Container>
  );
};

export default ResultsView;
