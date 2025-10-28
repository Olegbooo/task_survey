import React, { useState, useMemo, useEffect } from 'react';
import { TextField, InputAdornment, Box, Typography, Paper, ClickAwayListener, Portal } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { getCountries, getCountryCallingCode } from 'react-phone-number-input/input';
import en from 'react-phone-number-input/locale/en.json';
import { hasFlag } from 'country-flag-icons';
import Flags from 'country-flag-icons/react/3x2';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const styles = (theme) => ({
  container: {
    display: 'flex',
    width: '100%',
    gap: theme.spacing(1),
  },
  countrySelector: {
    width: '120px',
    height: '40px',
    '& .MuiInputBase-root': {
      height: '40px',
    },
    '& .MuiInputBase-input': {
      padding: '8px 6px',
      fontSize: '0.85rem',
      textAlign: 'left',
      color: '#ffffff',
      backgroundColor: 'transparent',
    },
    '& .MuiInputAdornment-root': {
      marginLeft: '2px',
      marginRight: '2px',
    },
    '& .MuiInputAdornment-positionStart': {
      marginRight: '4px',
    },
    '& .MuiInputAdornment-positionEnd': {
      marginLeft: '2px',
      cursor: 'pointer',
    },
  },
  phoneInput: {
    flex: 1,
  },
  dropdown: {
    position: 'fixed',
    zIndex: 9999,
    maxHeight: '300px',
    overflowY: 'auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    minWidth: '300px',
  },
  menuItem: {
    padding: theme.spacing(1, 2),
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  flag: {
    width: 16,
    height: 12,
    marginRight: theme.spacing(0.5),
    borderRadius: 1,
  },
  countryName: {
    flex: 1,
    marginRight: theme.spacing(1),
  },
  countryCode: {
    color: theme.palette.text.secondary,
    fontSize: '0.9rem',
  },
  selectedCountry: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  selectedFlag: {
    width: 16,
    height: 12,
    marginRight: theme.spacing(0.5),
    borderRadius: 1,
  },
  selectedCode: {
    fontSize: '0.9rem',
    color: theme.palette.text.primary,
  },
  arrowIcon: {
    cursor: 'pointer',
    fontSize: '16px',
    width: '16px',
    height: '16px',
  },
  phoneInputField: {
    height: '40px',
  },
});

const CountryFlag = ({ country, className }) => {
  const isHasCountryFlag = hasFlag(country);
  
  if (!isHasCountryFlag) return null;
  
  const FlagComponent = Flags[country];
  
  return <FlagComponent title={country} className={className} />;
};

const PhoneNumberQuestion = ({ value, onChange, classes }) => {
  const [state, setState] = useState({
    selectedCountry: 'US',
    phoneNumber: '',
    isCountryDropdownOpen: false,
    dropdownPosition: { top: 0, left: 0 },
    countrySearchTerm: '',
    filteredCountries: [],
  });

  const options = useMemo(() => 
    getCountries().map((country) => ({
      value: country,
      label: en[country],
      code: getCountryCallingCode(country)
    }))
  , []);

  useEffect(() => {
    if (value) {
      const phoneNumberMatch = value.match(/^\+(\d{1,4})(.*)$/);
      if (phoneNumberMatch) {
        const countryCode = phoneNumberMatch[1];
        const phonePart = phoneNumberMatch[2];
        
        const foundCountry = options.find(option => 
          getCountryCallingCode(option.value) === countryCode
        );
        
        if (foundCountry) {
          setState(prev => ({
            ...prev,
            selectedCountry: foundCountry.value,
            phoneNumber: phonePart,
          }));
        }
      }
    }
  }, [value, options]);

  useEffect(() => {
    setState(prev => ({ ...prev, filteredCountries: options }));
  }, [options]);

  const handlePhoneChange = (event) => {
    const newValue = event.target.value;
    setState(prev => ({ ...prev, phoneNumber: newValue }));
    const fullNumber = `+${getCountryCallingCode(state.selectedCountry)}${newValue}`;
    onChange(fullNumber);
  };

  const handleCountryChange = (countryCode) => {
    setState(prev => ({
      ...prev,
      selectedCountry: countryCode,
      countrySearchTerm: '',
      isCountryDropdownOpen: false,
    }));
    const fullNumber = `+${getCountryCallingCode(countryCode)}${state.phoneNumber}`;
    onChange(fullNumber);
  };

  const handleCountrySearch = (event) => {
    const searchTerm = event.target.value;
    if (searchTerm === '' || searchTerm === '+') {
      setState(prev => ({
        ...prev,
        countrySearchTerm: searchTerm,
        isCountryDropdownOpen: true,
        filteredCountries: options,
      }));
      return;
    }
    
    if (searchTerm.match(/^\+\d{1,3}$/)) {
      setState(prev => ({
        ...prev,
        countrySearchTerm: searchTerm,
        isCountryDropdownOpen: true,
      }));
      const code = searchTerm.substring(1);
      const filtered = options.filter(option => 
        option.code.startsWith(code) || option.code === code
      );
      setState(prev => ({ ...prev, filteredCountries: filtered }));
      const foundCountry = options.find(option => option.code === code);
      if (foundCountry) {
        setState(prev => ({ ...prev, selectedCountry: foundCountry.value }));
        const fullNumber = `+${getCountryCallingCode(foundCountry.value)}${state.phoneNumber}`;
        onChange(fullNumber);
        setState(prev => ({ ...prev, countrySearchTerm: '' }));
      }
      return;
    }

    if (searchTerm === '') {
      setState(prev => ({ ...prev, countrySearchTerm: '' }));
      setState(prev => ({ ...prev, countrySearchTerm: `+${getCountryCallingCode(state.selectedCountry)}` }));
    }
  };

  const handleCountryFocus = (event) => {
    if (event.target) {
      const rect = event.target.getBoundingClientRect();
      setState(prev => ({
        ...prev,
        dropdownPosition: {
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
        },
      }));
    }
    setState(prev => ({ ...prev, isCountryDropdownOpen: true, filteredCountries: options }));
  };

  const handleArrowClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const rect = event.target.closest('.MuiInputBase-root').getBoundingClientRect();
    setState(prev => ({
      ...prev,
      dropdownPosition: {
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      },
      isCountryDropdownOpen: !prev.isCountryDropdownOpen,
      filteredCountries: options,
    }));
  };

  const handleClickAway = () => {
    setState(prev => ({ ...prev, isCountryDropdownOpen: false }));
  };

  const handleCountryBlur = () => {
    setState(prev => ({ ...prev, countrySearchTerm: '' }));
    setTimeout(() => {
      setState(prev => ({ ...prev, countrySearchTerm: `+${getCountryCallingCode(prev.selectedCountry)}` }));
    }, 100);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box className={classes.container}>
        <TextField
          className={classes.countrySelector}
          variant="outlined"
          size="small"
          placeholder="+1"
          value={state.countrySearchTerm || `+${getCountryCallingCode(state.selectedCountry)}`}
          onChange={handleCountrySearch}
          onFocus={handleCountryFocus}
          onBlur={handleCountryBlur}
          
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CountryFlag country={state.selectedCountry} className={classes.selectedFlag} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <ArrowDropDownIcon 
                  className={classes.arrowIcon}
                  onClick={handleArrowClick}
                />
              </InputAdornment>
            ),
          }}
        />
        
        <TextField
          className={`${classes.phoneInput} ${classes.phoneInputField}`}
          variant="outlined"
          size="small"
          placeholder="Enter phone number"
          value={state.phoneNumber}
          onChange={handlePhoneChange}
          inputProps={{
            type: 'tel',
          }}
        />

        {state.isCountryDropdownOpen && state.filteredCountries.length > 0 && (
          <Portal>
            <Paper 
              className={classes.dropdown}
              style={{
                top: state.dropdownPosition.top,
                left: state.dropdownPosition.left,
              }}
            >
              {state.filteredCountries.map((option) => (
                <div
                  key={option.value}
                  className={classes.menuItem}
                  onClick={() => handleCountryChange(option.value)}
                >
                  <CountryFlag country={option.value} className={classes.flag} />
                  <Typography className={classes.countryName}>
                    {option.label}
                  </Typography>
                  <Typography className={classes.countryCode}>
                    +{option.code}
                  </Typography>
                </div>
              ))}
            </Paper>
          </Portal>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default compose(
  withStyles(styles)
)(PhoneNumberQuestion);
