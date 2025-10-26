import React from 'react';
import { Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: 'flex',
    gap: theme.spacing(2),
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
  yesButton: {
    backgroundColor: '#9e9e9e',
    color: 'white',
    fontSize: '1rem',
    padding: '12px 32px',
    minWidth: '120px',
    '&:hover': {
      backgroundColor: '#757575',
    },
    '&.selected': {
      backgroundColor: '#4caf50 !important',
    },
  },
  noButton: {
    backgroundColor: '#9e9e9e',
    color: 'white',
    fontSize: '1rem',
    padding: '12px 32px',
    minWidth: '120px',
    '&:hover': {
      backgroundColor: '#757575',
    },
    '&.selected': {
      backgroundColor: '#f44336 !important',
    },
  },
}));

const YesNoQuestion = ({ value, onChange }) => {
  const classes = useStyles();

  return (
    <Box className={classes.buttonContainer}>
      <Button
        variant="contained"
        size="large"
        startIcon={<ThumbUpIcon />}
        className={`${classes.yesButton} ${value === 'yes' ? 'selected' : ''}`}
        onClick={() => onChange('yes')}
      >
        Yes
      </Button>
      <Button
        variant="contained"
        size="large"
        startIcon={<ThumbDownIcon />}
        className={`${classes.noButton} ${value === 'no' ? 'selected' : ''}`}
        onClick={() => onChange('no')}
      >
        No
      </Button>
    </Box>
  );
};

export default YesNoQuestion;
