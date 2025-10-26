import React, { useState, useMemo, useEffect } from 'react';
import { TextField, InputAdornment, Box, Typography, Paper, ClickAwayListener, Portal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getCountries, getCountryCallingCode } from 'react-phone-number-input/input';
import en from 'react-phone-number-input/locale/en.json';
import { hasFlag } from 'country-flag-icons';
import Flags from 'country-flag-icons/react/3x2';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles((theme) => ({
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
}));

const CountryFlag = ({ country, className }) => {
  const isHasCountryFlag = hasFlag(country);
  
  if (!isHasCountryFlag) return null;
  
  const FlagComponent = Flags[country];
  
  return <FlagComponent title={country} className={className} />;
};

const PhoneNumberQuestion = ({ value, onChange }) => {
  const classes = useStyles();
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [countrySearchTerm, setCountrySearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

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
          setSelectedCountry(foundCountry.value);
          setPhoneNumber(phonePart);
        }
      }
    }
  }, [value, options]);

  useEffect(() => {
    setFilteredCountries(options);
  }, [options]);

  const handlePhoneChange = (event) => {
    const newValue = event.target.value;
    setPhoneNumber(newValue);
    
    const fullNumber = `+${getCountryCallingCode(selectedCountry)}${newValue}`;
    onChange(fullNumber);
  };

  const handleCountryChange = (countryCode) => {
    setSelectedCountry(countryCode);
    setCountrySearchTerm('');
    setIsCountryDropdownOpen(false);
    
    const fullNumber = `+${getCountryCallingCode(countryCode)}${phoneNumber}`;
    onChange(fullNumber);
  };

  const handleCountrySearch = (event) => {
    const searchTerm = event.target.value;
    
    if (searchTerm === '' || searchTerm === '+') {
      setCountrySearchTerm(searchTerm);
      setIsCountryDropdownOpen(true);
      setFilteredCountries(options);
      return;
    }
    

    if (searchTerm.match(/^\+\d{1,3}$/)) {
      setCountrySearchTerm(searchTerm);
      setIsCountryDropdownOpen(true);
      
      const code = searchTerm.substring(1);
      const filtered = options.filter(option => 
        option.code.startsWith(code) || option.code === code
      );
      
      setFilteredCountries(filtered);
      
      const foundCountry = options.find(option => option.code === code);
      if (foundCountry) {
        setSelectedCountry(foundCountry.value);
        const fullNumber = `+${getCountryCallingCode(foundCountry.value)}${phoneNumber}`;
        onChange(fullNumber);
        setCountrySearchTerm('');
      }
    } else if (searchTerm === '') {
      setCountrySearchTerm('');
      setCountrySearchTerm(`+${getCountryCallingCode(selectedCountry)}`);
    }
  };

  const handleCountryFocus = (event) => {
    if (event.target) {
      const rect = event.target.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
    setIsCountryDropdownOpen(true);
    setFilteredCountries(options);
  };

  const handleArrowClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const rect = event.target.closest('.MuiInputBase-root').getBoundingClientRect();
    setDropdownPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
    setIsCountryDropdownOpen(!isCountryDropdownOpen);
    setFilteredCountries(options);
  };

  const handleClickAway = () => {
    setIsCountryDropdownOpen(false);
  };

  const handleCountryBlur = () => {
    setCountrySearchTerm('');
    setTimeout(() => {
      setCountrySearchTerm(`+${getCountryCallingCode(selectedCountry)}`);
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
          value={countrySearchTerm || `+${getCountryCallingCode(selectedCountry)}`}
          onChange={handleCountrySearch}
          onFocus={handleCountryFocus}
          onBlur={handleCountryBlur}
          
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CountryFlag country={selectedCountry} className={classes.selectedFlag} />
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
          value={phoneNumber}
          onChange={handlePhoneChange}
          inputProps={{
            type: 'tel',
          }}
        />

        {isCountryDropdownOpen && filteredCountries.length > 0 && (
          <Portal>
            <Paper 
              className={classes.dropdown}
              style={{
                top: dropdownPosition.top,
                left: dropdownPosition.left,
              }}
            >
              {filteredCountries.map((option) => (
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

export default PhoneNumberQuestion;
