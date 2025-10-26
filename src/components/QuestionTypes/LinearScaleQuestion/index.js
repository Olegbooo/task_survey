import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyles = makeStyles((theme) => ({
  starsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(0.5),
    marginTop: theme.spacing(2),
    cursor: 'pointer',
  },
  star: {
    fontSize: '3rem',
    color: theme.palette.grey[300],
    transition: 'color 0.2s',
    '&:hover': {
      color: theme.palette.warning.main,
    },
    '&.active': {
      color: theme.palette.warning.main,
    },
  },
  starBorder: {
    fontSize: '3rem',
    color: theme.palette.grey[300],
    transition: 'color 0.2s',
    '&:hover': {
      color: theme.palette.warning.main,
    },
  },
}));

const LinearScaleQuestion = ({ question, value, onChange }) => {
  const classes = useStyles();
  const theme = useTheme();
  const maxValue = question.maxValue || 10;
  const currentValue = value || 0;

  const handleStarClick = (starIndex) => {
    onChange(starIndex);
  };

  const handleMouseEnter = (e, hoverIndex) => {
    const starElements = e.currentTarget.parentElement.children;
    for (let i = 0; i <= hoverIndex; i++) {
      const icon = starElements[i].querySelector('svg');
      if (icon) {
        icon.style.color = theme.palette.warning.main;
      }
    }
  };

  const handleMouseLeave = (e) => {
    const starElements = e.currentTarget.parentElement.children;
    for (let i = 0; i < starElements.length; i++) {
      const icon = starElements[i].querySelector('svg');
      if (icon) {
        icon.style.color = i < currentValue ? theme.palette.warning.main : theme.palette.grey[300];
      }
    }
  };

  return (
    <Box className={classes.starsContainer}>
      {[...Array(maxValue)].map((_, index) => {
        const starNumber = index + 1;
        const isActive = starNumber <= currentValue;
        
        return (
          <Box
            key={index}
            onClick={() => handleStarClick(starNumber)}
            onMouseEnter={(e) => handleMouseEnter(e, index)}
            onMouseLeave={handleMouseLeave}
          >
            {isActive ? (
              <StarIcon className={classes.star} />
            ) : (
              <StarBorderIcon className={classes.starBorder} />
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default LinearScaleQuestion;
