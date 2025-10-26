import React from 'react';
import { Container, Box, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { surveyData } from '../../data/questions';


const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    marginTop: '1rem',
    marginBottom: '1rem',
    padding: '0 16px',
  },
  segment: {
    height: '5px',
    borderRadius: '4px',
    margin: '0 2px',
    flex: 1,
    transition: 'background-color 0.3s ease',
  },
  activeSegment: {
    backgroundColor: theme.palette.custom.progressBar.active, 
  },
  inactiveSegment: {
    backgroundColor: theme.palette.custom.progressBar.inactive, 
  },
  box: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const ProgressBar = () => {
  const classes = useStyles();
  const currentQuestionIndex = useSelector(state => state.quiz.currentQuestionIndex);

  return (
    <Container className={classes.container}>
      <Box className={classes.box}>
        {surveyData.questions.map((_, index) => (
          <Box
            key={index}
            className={`${classes.segment} ${index <= currentQuestionIndex ? classes.activeSegment : classes.inactiveSegment}`}
            />
          ))}
      </Box>
    </Container>
  );
};

export default ProgressBar;