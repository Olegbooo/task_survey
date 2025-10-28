import React from 'react';
import { TextField } from '@material-ui/core';

const TextQuestion = ({ value, onChange }) => {
  const handleOnChange = (e) => onChange(e.target.value);

  return (
    <TextField
      variant="outlined"
      label="Your answer"
      value={value}
      onChange={handleOnChange}
      fullWidth
      multiline
      rows={2}
      size="small"
    />
  );
};

export default TextQuestion;
