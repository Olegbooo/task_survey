import React from 'react';
import { Container, Box } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { surveyData } from '../../data/questions';


const styles = (theme) => ({
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
});

const ProgressBar = ({ currentQuestionIndex, classes }) => {

  return (
    <Container className={classes.container}>
      <Box className={classes.box}>
        {surveyData.questions.map((item, index) => (
          <Box
            key={index}
            className={`${classes.segment} ${index <= currentQuestionIndex ? classes.activeSegment : classes.inactiveSegment}`}
            />
          ))}
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  currentQuestionIndex: state.quiz.currentQuestionIndex,
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(ProgressBar);
