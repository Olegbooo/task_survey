import React from 'react';
import { Box, Checkbox, Card, CardMedia, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';

const styles = (theme) => ({
  imageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  imageCard: {
    position: 'relative',
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.8,
    },
  },
  image: {
    height: 120,
    objectFit: 'cover',
  },
  checkbox: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  caption: {
    padding: 8,
  },
});

const ImageSelectQuestion = ({ question, value = [], onChange, classes }) => {

  const handleImageToggle = (imageId) => {
    const newValue = value.includes(imageId)
      ? value.filter(id => id !== imageId)
      : [...value, imageId];
    onChange(newValue);
  };

  return (
    <Box className={classes.imageGrid}>
      {question.images.map((image) => (
        <Card
          key={image.id}
          className={classes.imageCard}
          onClick={() => handleImageToggle(image.id)}
        >
          <CardMedia
            className={classes.image}
            image={image.src}
            title={image.alt}
          />
          <Checkbox
            className={classes.checkbox}
            checked={value.includes(image.id)}
            onChange={() => handleImageToggle(image.id)}
          />
          <Typography variant="caption" display="block" className={classes.caption}>
            {image.alt}
          </Typography>
        </Card>
      ))}
    </Box>
  );
};

export default compose(
  withStyles(styles)
)(ImageSelectQuestion);
