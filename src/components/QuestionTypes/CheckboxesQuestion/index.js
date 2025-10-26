import React from 'react';
import { FormGroup, FormControlLabel, Checkbox, Box } from '@material-ui/core';

const CheckboxesQuestion = ({ question, value = [], onChange }) => {
  const handleOptionToggle = (option) => {
    const newValue = value.includes(option)
      ? value.filter(item => item !== option)
      : [...value, option];
    onChange(newValue);
  };

  return (
    <Box>
      <FormGroup>
        {question.options.map((option, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={value.includes(option)}
                onChange={() => handleOptionToggle(option)}
                color="primary"
              />
            }
            label={option}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default CheckboxesQuestion;
