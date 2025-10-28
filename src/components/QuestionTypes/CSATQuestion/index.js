import React from 'react';
import { Box, IconButton, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { CSAT_EMOJIS } from '../../../data/constants';

const styles = (theme) => ({
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
    [theme.breakpoints.down('sm')]: {
      '& > *': {
        marginRight: theme.spacing(1),
        '&:last-child': {
          marginRight: 0,
        },
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
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
      width: 56,
      height: 56,
      border: '1.5px solid transparent',
      '&.selected': {
        border: `2px solid ${theme.palette.primary.main}`,
      },
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.8rem',
      width: 50,
      height: 50,
    },
  },
  emojiLabel: {
    fontSize: '0.8rem',
    marginTop: theme.spacing(1),
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.75rem !important',
      marginTop: theme.spacing(0.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.7rem !important',
    },
  },
});

const CSATQuestion = ({ value, onChange, classes }) => {

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

export default compose(
  withStyles(styles)
)(CSATQuestion);
