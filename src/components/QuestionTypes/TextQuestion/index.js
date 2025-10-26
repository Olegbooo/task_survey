import React from 'react';
import { TextField } from '@material-ui/core';

const TextQuestion = ({ value, onChange }) => {
  return (
    <TextField
      variant="outlined"
      label="Your answer"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      multiline
      rows={2}
      size="small"
    />
  );
};

export default TextQuestion;
