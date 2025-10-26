import React from 'react';
import { TextField } from '@material-ui/core';

const DateQuestion = ({ value, onChange }) => {
  return (
    <TextField
      variant="outlined"
      type="date"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      InputLabelProps={{
        shrink: true,
      }}
      fullWidth
    />
  );
};

export default DateQuestion;
