import React from 'react';
import { Box, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CSAT_EMOJIS } from '../../../data/constants';

const useStyles = makeStyles((theme) => ({
  emojiContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    '& > *': {
      marginRight: theme.spacing(2),
      '&:last-child': {
        marginRight: 0,
      },
    },
  },
  emojiButton: {
    fontSize: '3rem',
    width: 80,
    height: 80,
    borderRadius: '50%',
    border: '2px solid transparent',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'scale(1.1)',
    },
    '&.selected': {
      border: `3px solid ${theme.palette.primary.main}`,
      backgroundColor: theme.palette.primary.light,
    },
  },
  emojiLabel: {
    fontSize: '0.8rem',
    marginTop: theme.spacing(1),
    textAlign: 'center',
  },
}));

const CSATQuestion = ({ value, onChange }) => {
  const classes = useStyles();

  return (
    <Box>
      <Box className={classes.emojiContainer}>
        {CSAT_EMOJIS.map((emoji) => (
          <Box key={emoji.value} style={{ textAlign: 'center' }}>
            <IconButton
              className={`${classes.emojiButton} ${value === emoji.value ? 'selected' : ''}`}
              onClick={() => onChange(emoji.value)}
            >
              {emoji.emoji}
            </IconButton>
            <Typography className={classes.emojiLabel}>
              {emoji.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CSATQuestion;
