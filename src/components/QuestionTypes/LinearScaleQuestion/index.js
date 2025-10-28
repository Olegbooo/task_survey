import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const styles = (theme) => ({
  starsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(0.5),
    marginTop: theme.spacing(2),
    flexWrap: 'wrap',
  },
  star: {
    fontSize: '3rem',
    color: theme.palette.grey[300],
    transition: 'color 0.2s',
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.warning.main,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.5rem',
    },
  },
  active: {
    color: theme.palette.warning.main,
  },
  hovered: {
    color: theme.palette.warning.light,
  },
});

const LinearScaleQuestion = ({ question, value, onChange, classes }) => {
  const maxValue = question.maxValue;

  const [hoverValue, setHoverValue] = useState(null);

  return (
    <Box className={classes.starsContainer}>
      {[...Array(maxValue)].map((_, index) => {
        const starNumber = index + 1;
        const isActive = starNumber <= (hoverValue || value || 0);

        return (
          <Box
            key={index}
            onClick={() => onChange(starNumber)}
            onMouseEnter={() => setHoverValue(starNumber)}
            onMouseLeave={() => setHoverValue(null)}
          >
            {isActive ? (
              <StarIcon className={`${classes.star} ${classes.active}`} />
            ) : (
              <StarBorderIcon className={classes.star} />
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default compose(
  withStyles(styles)
)(LinearScaleQuestion);
